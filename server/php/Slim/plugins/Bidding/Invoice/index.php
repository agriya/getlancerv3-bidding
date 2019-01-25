<?php
/**
 * Plugin
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Core
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
/**
 * GET projectBidInvoicesGet
 * Summary: Fetch all project bid invoices
 * Notes: Returns all project bid invoices from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_bid_invoices', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $enabledIncludes = array(
            'user',
            'project',
            'projectbidinvoiceitems'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        $projectBidInvoices = Models\ProjectBidInvoice::with($enabledIncludes);
        if ($authUser['role_id'] != \Constants\ConstUserTypes::Admin && !empty($queryParams['bid_id'])) {
            $projectBidInvoices = $projectBidInvoices->orWhereHas('bid', function ($q) use ($authUser) {
                $q->where('bids.user_id', $authUser->id);
                $q->where('bids.bid_status_id', \Constants\BidStatus::Won);
            });
            $projectBidInvoices = $projectBidInvoices->orWhereHas('project', function ($q) use ($authUser) {
                if (isset($authUser) && ($authUser['role_id'] != \Constants\ConstUserTypes::Admin)) {
                    $q->where('projects.user_id', $authUser->id);
                }
            });
        } elseif ($authUser['role_id'] != \Constants\ConstUserTypes::Admin) {
            return renderWithJson($results, $message = 'bid id mandatory', $fields = '', $isError = 1);
        }
        $projectBidInvoices = $projectBidInvoices->Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $projectBidInvoices['data'];
        unset($projectBidInvoices['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $projectBidInvoices
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListProjectBidInvoice'));
/**
 * POST projectBidInvoicesPost
 * Summary: Creates a new project bid invoice
 * Notes: Creates a new project bid invoice
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/project_bid_invoices', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $projectBidInvoice = new Models\ProjectBidInvoice($args);
    $result = array();
    $amount = 0;
    try {
        $validationErrorFields = $projectBidInvoice->validate($args);
        if (empty($validationErrorFields)) {
            $bids = Models\Bid::where('id', $args['bid_id'])->with('project')->first();
            $project_status_id = [\Constants\ProjectStatus::UnderDevelopment];
            $projects = Models\Project::whereIn('project_status_id', $project_status_id)->where('id', $bids->project_id)->get()->toArray();
            if ($projects && ($bids->user_id == $authUser->id || $authUser['role_id'] == \Constants\ConstUserTypes::Admin)) {
                $projectBidInvoice->project_id = $bids->project_id;
                $projectBidInvoice->amount = $amount;
                $projectBidInvoice->user_id = $authUser->id;
                $projectBidInvoice->save();
                $description = '';
                if (!empty($args['project_bid_invoice_items'])) {
                    foreach ($args['project_bid_invoice_items'] as $projectbidinvoiceitem) {
                        $projectBidInvoiceitems = new Models\ProjectBidInvoiceItems;
                        $projectBidInvoiceitems->project_bid_invoice_id = $projectBidInvoice->id;
                        $projectBidInvoiceitems->amount = $projectbidinvoiceitem['amount'];
                        $projectBidInvoiceitems->description = $description = $projectbidinvoiceitem['description'];
                        $projectBidInvoiceitems->save();
                        $amount+= $projectbidinvoiceitem['amount'];
                    }
                }
                $commision_employer = 0;
                $commision_freelancer = 0;
                if (PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE) {
                    $commision_employer = ($amount / 100) * PROJECT_COMMISSION_FROM_EMPLOYER_FOR_INVOICE;
                }
                $projectBidInvoice->site_commission_from_employer = $commision_employer;
                if (PROJECT_COMMISSION_FROM_FREELANCER_FOR_INVOICE) {
                    $commision_freelancer = ($amount / 100) * PROJECT_COMMISSION_FROM_FREELANCER_FOR_INVOICE;
                }
                $projectBidInvoice->site_commission_from_freelancer = $commision_freelancer;
                $projectBidInvoice->amount = $amount;
                $projectBidInvoice->update();
                $otherUserId = $bids->project->user_id;
                $userId = $bids->user_id;
                if ($authUser->id == $bids->project->user_id) {
                    $otherUserId = $bids->user_id;
                    $userId = $bids->project->user_id;
                }
                insertActivities($userId, $otherUserId, 'ProjectBidInvoice', $projectBidInvoice->id, 0, 0, \Constants\ActivityType::ProjectBidInvoicePosted, $bids->project_id);
                $userDetails = getUserHiddenFields($bids->user_id);
                $employerDetails = getUserHiddenFields($bids->project->user_id);
                $emailFindReplace = array(
                    '##FREELANCER##' => ucfirst($userDetails->username) ,
                    '##EMPLOYER##' => ucfirst($employerDetails->username) ,
                    '##PROJECT_NAME##' => $bids->project->name,
                    '##DESCRIPTION##' => $description,
                    '##INVOICE_ID##' => $projectBidInvoice->id,
                    '##CURRENCY##' => CURRENCY_SYMBOL,
                    '##AMOUNT##' => $projectBidInvoice->amount,
                    '##PROJECT_URL##' => $_server_domain_url . '/projects/view/' . $bids->project_id . '/' . $bids->project->slug . '?action=invoices'
                );
                sendMail('New Invoice Received Notification', $emailFindReplace, $employerDetails->email);
                $result = $projectBidInvoice->toArray();
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Project bid invoice could not be added. Access Denied.', '', 1);
            }
        } else {
            return renderWithJson($result, 'Project bid invoice could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project bid invoice could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateProjectBidInvoice'));
/**
 * DELETE projectBidInvoicesProjectBidInvoiceIdDelete
 * Summary: Delete project bid invoice
 * Notes: Deletes a single project bid invoice based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/project_bid_invoices/{projectBidInvoiceId}', function ($request, $response, $args) {
    global $authUser;
    $projectBidInvoice = Models\ProjectBidInvoice::find($request->getAttribute('projectBidInvoiceId'));
    $result = array();
    try {
        if (!empty($projectBidInvoice) && ($projectBidInvoice->bid->user_id == $authUser->id || $authUser['role_id'] == \Constants\ConstUserTypes::Admin)) {
            $projectBidInvoice->delete();
            $result = array(
                'status' => 'success',
            );
            deleteActivity($projectBidInvoice->id, 'ProjectBidInvoice');
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Project bid invoice could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Project bid invoice could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteProjectBidInvoice'));
/**
 * GET projectBidInvoicesProjectBidInvoiceIdGet
 * Summary: Fetch project bid invoice
 * Notes: Returns a project bid invoice based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/project_bid_invoices/{projectBidInvoiceId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'user',
        'project',
        'projectbidinvoiceitems'
    );
    (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
    $projectBidInvoice = Models\ProjectBidInvoice::with($enabledIncludes)->find($request->getAttribute('projectBidInvoiceId'));
    if (!empty($projectBidInvoice)) {
        $result['data'] = $projectBidInvoice;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewProjectBidInvoice'));
/**
 * PUT projectBidInvoicesProjectBidInvoiceIdPut
 * Summary: Update project bid invoice by its id
 * Notes: Update project bid invoice by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/project_bid_invoices/{projectBidInvoiceId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    global $authUser;
    $result = array();
    $projectBidInvoice = Models\ProjectBidInvoice::find($request->getAttribute('projectBidInvoiceId'));
    if (!empty($projectBidInvoice->is_paid) && $authUser['role_id'] != \Constants\ConstUserTypes::Admin) {
        return renderWithJson($result, 'Project bid invoice could not be updated. Access denied.', '', 1);
    } elseif ($projectBidInvoice->user_id == $authUser->id) {
        $projectBidInvoice->fill($args);
        try {
            $validationErrorFields = $projectBidInvoice->validate($args);
            if (empty($validationErrorFields)) {
                $bids = Models\Bid::where('id', $args['bid_id'])->select('project_id')->first();
                $projectBidInvoice->project_id = $bids->project_id;
                $projectBidInvoice->save();
                if (!empty($args['project_bid_invoice_items'])) {
                    $amount = 0;
                    Models\ProjectBidInvoiceItems::where('project_bid_invoice_id', $request->getAttribute('projectBidInvoiceId'))->delete();
                    foreach ($args['project_bid_invoice_items'] as $projectbidinvoiceitem) {
                        $projectBidInvoiceitems = new Models\ProjectBidInvoiceItems;
                        $projectBidInvoiceitems->project_bid_invoice_id = $projectBidInvoice->id;
                        $projectBidInvoiceitems->amount = $projectbidinvoiceitem['amount'];
                        $projectBidInvoiceitems->description = $projectbidinvoiceitem['description'];
                        $projectBidInvoiceitems->save();
                        $amount+= $projectbidinvoiceitem['amount'];
                    }
                    $projectBidInvoice->amount = $amount;
                }
                $projectBidInvoice->update();
                $result = $projectBidInvoice->toArray();
                return renderWithJson($result);
            } else {
                return renderWithJson($result, 'Project bid invoice could not be updated. Please, try again.', $validationErrorFields, 1);
            }
        } catch (Exception $e) {
            return renderWithJson($result, 'Project bid invoice could not be updated. Please, try again.', '', 1);
        }
    } elseif (($authUser->role_id == \Constants\ConstUserTypes::Admin) && isset($args['is_paid'])) {
        $projectBidInvoice->is_paid = $args['is_paid'];
        $projectBidInvoice->update();
        $result = $projectBidInvoice->toArray();
        return renderWithJson($result);
        /*if (empty($projectBidInvoice->is_paid) && !empty($args['is_paid'])) {
            $employer = Models\User::find($projectBidInvoice->project->user_id);
            $employer->makeVisible(['available_wallet_amount']);
            if ($employer->available_wallet_amount >= $projectBidInvoice->amount) {
                $user = Models\User::find($projectBidInvoice->user_id);
                $user->makeVisible(['available_wallet_amount']);
                $user->available_wallet_amount = $user->available_wallet_amount + $projectBidInvoice->amount - $projectBidInvoice->site_commission_from_freelancer;
                $user->update();
                $employer->available_wallet_amount = $employer->available_wallet_amount - $projectBidInvoice->amount;
                $employer->update();
                $projectBidInvoice->is_paid = $args['is_paid'];
                $projectBidInvoice->update();
                $result = $projectBidInvoice->toArray();
                return renderWithJson($result);
            } else {
                $response = array(
                    'data' => '',
                    'error' => array(
                        'code' => 2,
                        'message' => 'Insufficient balance. Please add amount to wallet.',
                        'fields' => ''
                    )
                );
                return $response;
            }
        } else {
            $projectBidInvoice->is_paid = $args['is_paid'];
            $projectBidInvoice->update();
            $result = $projectBidInvoice->toArray();
            return renderWithJson($result);
        }*/
    } else {
        return renderWithJson($result, 'Invalid request.', '', 1);
    }
})->add(new ACL('canUpdateProjectBidInvoice'));
/**
 * GET projectBidInvoicesGet
 * Summary: Fetch all project bid invoices
 * Notes: Returns all project bid invoices from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/me/project_bid_invoices', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'projectbidinvoiceitems'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        $projectBidInvoices = Models\ProjectBidInvoice::with($enabledIncludes)->where('user_id', $authUser->id);
        $projectBidInvoices = $projectBidInvoices->Filter($queryParams)->paginate($count)->toArray();
        $data = $projectBidInvoices['data'];
        unset($projectBidInvoices['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $projectBidInvoices
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListMeProjectBidInvoice'));
/**
 * GET projectBidInvoicesGet
 * Summary: Fetch all project bid invoices
 * Notes: Returns all project bid invoices from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/employer/{employerId}/project_bid_invoices', function ($request, $response, $args) {
    global $authUser;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'projectbidinvoiceitems'
        );
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'bid' : '';
        (isPluginEnabled('Bidding/Bidding')) ? $enabledIncludes[] = 'project' : '';
        $projectBidInvoices = Models\ProjectBidInvoice::with($enabledIncludes);
        $projectBidInvoices = $projectBidInvoices->orWhereHas('project', function ($q) use ($authUser) {
            $q->where('user_id', $authUser->id);
        });
        $projectBidInvoices = $projectBidInvoices->Filter($queryParams)->paginate($count)->toArray();
        $data = $projectBidInvoices['data'];
        unset($projectBidInvoices['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $projectBidInvoices
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListEmployerProjectBidInvoice'));
