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
 * GET user cash withdrawals GET.
 * Summary: Filter  user cash withdrawals.
 * Notes: Filter user cash withdrawals.
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/user_cash_withdrawals', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'user',
            'money_transfer_account'
        );
        $userCashWithdrawals = Models\UserCashWithdrawal::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
        $data = $userCashWithdrawals['data'];
        unset($userCashWithdrawals['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $userCashWithdrawals
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canUserListUserCashWithdrawals'));
/**
 * GET useruserIdUserCashWithdrawalsGet
 * Summary: Get user cash withdrawals
 * Notes: Get ruser cash withdrawals
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/users/{userId}/user_cash_withdrawals', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'user',
            'money_transfer_account'
        );
        $userCashWithdrawals = Models\UserCashWithdrawal::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
        $data = $userCashWithdrawals['data'];
        unset($userCashWithdrawals['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $userCashWithdrawals
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canUserListUserCashWithdrawals'));
$app->GET('/api/v1/user_cash_withdrawals/{userCashWithdrawalsId}', function ($request, $response, $args) {
    $userCashWithdrawal = Models\UserCashWithdrawal::with('user', 'money_transfer_account')->find($request->getAttribute('userCashWithdrawalsId'));
    $result = array();
    if (!empty($userCashWithdrawal)) {
        $result['data'] = $userCashWithdrawal->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUserViewUserCashWithdrawals'));
/**
 * POST userUserIdUserCashWithdrawals.
 * Summary: Create user cash withdrawals.
 * Notes: Create user cash withdrawals.
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/users/{userId}/user_cash_withdrawals', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $userCashWithdrawal = new Models\UserCashWithdrawal;
    $validationErrorFields = $userCashWithdrawal->validate($args);
    if (empty($validationErrorFields)) {
        foreach ($args as $key => $arg) {
            $userCashWithdrawal->{$key} = $arg;
        }
        $userCashWithdrawal->user_id = $request->getAttribute('userId');
        try {
            $userCashWithdrawal->save();
            $userDetails = Models\User::find($userCashWithdrawal->user_id);
            $userDetails->makeVisible(array(
                'available_wallet_amount'
            ));
            $userDetails->available_wallet_amount = $userDetails->available_wallet_amount - $userCashWithdrawal->amount;
            $userDetails->blocked_amount = $userDetails->blocked_amount + $userCashWithdrawal->amount;
            $userDetails->update();
            $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($adminId['id'], $userCashWithdrawal->user_id, $userCashWithdrawal->id, 'UserCashWithdrawal', \Constants\TransactionType::WithdrawRequested, 1, $userCashWithdrawal->amount, 0, 0, 0,0, $userCashWithdrawal->id, 0);
            if (!empty(WITHDRAW_REQUEST_FEE)) {
                if (WITHDRAW_REQUEST_FEE_TYPE == 'Percentage') {
                    $userCashWithdrawal->withdrawal_fee = (WITHDRAW_REQUEST_FEE / 100) * $userCashWithdrawal->amount;
                } else {
                    $userCashWithdrawal->withdrawal_fee = WITHDRAW_REQUEST_FEE;
                }
                $userCashWithdrawal->update();
            }
            insertActivities($userCashWithdrawal->user_id, $adminId['id'], 'UserCashWithdrawal', $userCashWithdrawal->id, 0, 0, \Constants\ActivityType::WithdrawRequested, $userCashWithdrawal->id);
            $result = $userCashWithdrawal->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'User cash withdrawals could not be added. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'User cash withdrawals could not be added. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUserCreateUserCashWithdrawals'));
/**
 * GET useruserIdUserCashWithdrawalsUserCashWithdrawalsIdGet
 * Summary: Get paticular user cash withdrawals
 * Notes:  Get paticular user cash withdrawals
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/users/{userId}/user_cash_withdrawals/{userCashWithdrawalsId}', function ($request, $response, $args) {
    $userCashWithdrawal = Models\UserCashWithdrawal::find($request->getAttribute('userCashWithdrawalsId'));
    $result = array();
    if (!empty($userCashWithdrawal)) {
        $result['data'] = $userCashWithdrawal->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUserViewUserCashWithdrawals'));
/**
 * PUT usersUserIdUserCashWithdrawalsUserCashWithdrawalsIdPut
 * Summary: Update  user cash withdrawals.
 * Notes: Update user cash withdrawals.
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/user_cash_withdrawals/{userCashWithdrawalsId}', function ($request, $response, $args) {
    $body = $request->getParsedBody();
    $result = array();
    $enabledIncludes = array(
        'user'
    );
    $userCashWithdrawal = Models\UserCashWithdrawal::with($enabledIncludes)->where('id', $request->getAttribute('userCashWithdrawalsId'))->first();
    $oldStatus = $userCashWithdrawal->withdrawal_status_id;
    if (!empty($userCashWithdrawal)) {        
        if (!in_array($oldStatus, [\Constants\UserCashWithdrawStatus::Approved, \Constants\UserCashWithdrawStatus::Rejected])) {
            $oldStatus = $userCashWithdrawal->withdrawal_status_id;
            $userCashWithdrawal->fill($body);
            $userCashWithdrawal->save();
            $emailFindReplace = array(
                '##USERNAME##' => $userCashWithdrawal['user']['username']
            );
            $adminId = Models\User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            $userDetails = Models\User::find($userCashWithdrawal->user_id);
            $userDetails->makeVisible(array(
                'available_wallet_amount'
            ));
            if ($userCashWithdrawal->withdrawal_status_id == \Constants\UserCashWithdrawStatus::Approved) {
                $userDetails->blocked_amount = $userDetails->blocked_amount - $userCashWithdrawal->amount;
                $userDetails->update();
                insertTransaction($adminId['id'], $userCashWithdrawal->user_id, $userCashWithdrawal->id, 'UserCashWithdrawal', \Constants\TransactionType::WithdrawRequestApproved, 1, $userCashWithdrawal->amount, 0, 0, 0, 0, $userCashWithdrawal->id, 0);              
                if (!empty($userCashWithdrawal->withdrawal_fee)) {
                    insertTransaction($userCashWithdrawal->user_id, $adminId['id'], $userCashWithdrawal->id, 'UserCashWithdrawal', \Constants\TransactionType::WithdrawRequestCommission, 1, $userCashWithdrawal->withdrawal_fee, 0, 0, 0, 0, $userCashWithdrawal->id, 0);
                }                
            } elseif ($userCashWithdrawal->withdrawal_status_id == \Constants\UserCashWithdrawStatus::Rejected) {
                $userDetails->available_wallet_amount = $userDetails->available_wallet_amount + $userCashWithdrawal->amount;
                $userDetails->blocked_amount = $userDetails->blocked_amount - $userCashWithdrawal->amount;
                $userDetails->update();
                insertTransaction($adminId['id'], $userCashWithdrawal->user_id, $userCashWithdrawal->id, 'UserCashWithdrawal', \Constants\TransactionType::WithdrawRequestRejected, 1, $userCashWithdrawal->amount, 0, 0, 0, 0, $userCashWithdrawal->id, 0);
            }
            if ($oldStatus != $userCashWithdrawal->withdrawal_status_id) {
                 insertActivities($adminId['id'], $userCashWithdrawal->user_id, 'UserCashWithdrawal', $userCashWithdrawal->id, $oldStatus, $userCashWithdrawal->withdrawal_status_id, \Constants\ActivityType::WithdrawRequestStatusChange, $userCashWithdrawal->id);
            }
            sendMail('adminpaidyourwithdrawalrequest', $emailFindReplace, $userCashWithdrawal['user']['email']);
        } else {
            $userCashWithdrawal->remark = $body['remark'];
            $userCashWithdrawal->save();
        }
        $result['data'] = $userCashWithdrawal->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'User cash withdrawals could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateUserCashWithdrawals'));

/**
 * DELETE User Cash Withdrawals DELETE.
 * Summary: Delete user cash withdrawals
 * Notes: Delete Delete user cash withdrawals
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/user_cash_withdrawals/{withdrawalId}', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    $userCashWithdrawal = Models\UserCashWithdrawal::where('id', $request->getAttribute('withdrawalId'))->first();
    try {
        if (!empty($userCashWithdrawal)) {
        $userCashWithdrawal->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'No record found', '', 1);
        }
     }
     catch (Exception $e) {
        return renderWithJson($result, 'User cash withdrawals could not be deleted. Please, try again.', '', 1);
    }

});

/**
 * GET MoneyTransferAccountsGet
 * Summary: Get money transfer accounts lists
 * Notes: Get money transfer accounts lists
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/money_transfer_accounts', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $enabledIncludes = array(
            'user'
        );
        $moneyTransferAccounts = Models\MoneyTransferAccount::Filter($queryParams);
        if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
            $moneyTransferAccounts = $moneyTransferAccounts->with($enabledIncludes)->get()->toArray();
            unset($moneyTransferAccounts['data']);
            $result = array(
                'data' => $moneyTransferAccounts
            );
        } else {
            $moneyTransferAccounts = Models\MoneyTransferAccount::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
            $data = $moneyTransferAccounts['data'];
            unset($moneyTransferAccounts['data']);
            $result = array(
                'data' => $data,
                '_metadata' => $moneyTransferAccounts
            );
        }
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListMoneyTransferAccount'));
/**
 * GET usersuserIdMoneyTransferAccountsGet
 * Summary: Get money transfer accounts lists
 * Notes: Get money transfer accounts lists
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/users/{userId}/money_transfer_accounts', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $result = array();
    try {
        $count = PAGE_LIMIT;
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $moneyTransferAccounts = Models\MoneyTransferAccount::where('user_id', $request->getAttribute('userId'))->Filter($queryParams);
        if (!empty($queryParams['limit']) && $queryParams['limit'] == 'all') {
            $moneyTransferAccounts = $moneyTransferAccounts->get()->toArray();
            unset($moneyTransferAccounts['data']);
            $result = array(
                'data' => $moneyTransferAccounts
            );
        } else {
            $moneyTransferAccounts = Models\MoneyTransferAccount::where('user_id', $request->getAttribute('userId'))->Filter($queryParams)->paginate($count)->toArray();
            $data = $moneyTransferAccounts['data'];
            unset($moneyTransferAccounts['data']);
            $result = array(
                'data' => $data,
                '_metadata' => $moneyTransferAccounts
            );
        }
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canUserListMoneyTransferAccount'));
/**
 * POST moneyTransferAccountPost
 * Summary: Create New money transfer account
 * Notes: Create money transfer account.
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/money_transfer_accounts', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $result = array();
    $moneyTransferAccount = new Models\MoneyTransferAccount;
    $validationErrorFields = $moneyTransferAccount->validate($args);
    if (empty($validationErrorFields)) {
        foreach ($args as $key => $arg) {
            $moneyTransferAccount->{$key} = $arg;
        }
        if ($authUser['role_id'] == \Constants\ConstUserTypes::User) {
            $moneyTransferAccount->user_id = $authUser->id;
        }
        try {
            $moneyTransferAccount->save();
            $result = $moneyTransferAccount->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Account could not be added. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Account could not be added. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canCreateMoneyTransferAccount'));
/**
 * POST usersuserIdmoneyTransferAccountPost
 * Summary: Create New money transfer account
 * Notes: Create money transfer account.
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/users/{userId}/money_transfer_accounts', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $moneyTransferAccount = new Models\MoneyTransferAccount;
    $validationErrorFields = $moneyTransferAccount->validate($args);
    if (empty($validationErrorFields)) {
        foreach ($args as $key => $arg) {
            $moneyTransferAccount->{$key} = $arg;
        }
        $moneyTransferAccount->user_id = $request->getAttribute('userId');
        try {
            $moneyTransferAccount->save();
            $result = $moneyTransferAccount->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Account could not be added. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Account could not be added. Please, try again.', $validationErrorFields, 1);
    }
})->add(new ACL('canUserCreateMoneyTransferAccount'));
/**
 * GET MoneyTransferAccountsMoneyTransferAccountIdGet
 * Summary: Get particular money transfer accounts
 * Notes: Get particular money transfer accounts
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/money_transfer_accounts/{moneyTransferAccountId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'user'
    );
    $moneyTransferAccount = Models\MoneyTransferAccount::with($enabledIncludes)->find($request->getAttribute('moneyTransferAccountId'));
    if (!empty($moneyTransferAccount)) {
        $result['data'] = $moneyTransferAccount->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewMoneyTransferAccount'));
/**
 * GET usersuserIdMoneyTransferAccountsMoneyTransferAccountIdGet
 * Summary: Get particular money transfer accounts
 * Notes: Get particular money transfer accounts
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/users/{userId}/money_transfer_accounts/{moneyTransferAccountId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'user'
    );
    $moneyTransferAccount = Models\MoneyTransferAccount::with($enabledIncludes)->where('id', $request->getAttribute('moneyTransferAccountId'))->where('user_id', $request->getAttribute('userId'))->first();
    if (!empty($moneyTransferAccount)) {
        $result['data'] = $moneyTransferAccount;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUserViewMoneyTransferAccount'));
/**
 * PUT moneyTransferAccountMoneyTransferAccountIdPut
 * Summary: Update money transfer account by its id
 * Notes: Update money transfer account.
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/money_transfer_accounts/{MoneyTransferAccountId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $moneyTransferAccount = Models\MoneyTransferAccount::find($request->getAttribute('MoneyTransferAccountId'));
    $validationErrorFields = $moneyTransferAccount->validate($args);
    if (empty($validationErrorFields)) {
        foreach ($args as $key => $arg) {
            $moneyTransferAccount->{$key} = $arg;
        }
        try {
            $moneyTransferAccount->save();
            $result['data'] = $moneyTransferAccount->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Account could not be updated. Please, try again', '', 1);
        }
    } else {
        return renderWithJson($result, 'Account could not be updated. Please, try again', $validationErrorFields, 1);
    }
})->add(new ACL('canUpdateMoneyTransferAccount'));
/**
 * PUT usersuserIdmoneyTransferAccountMoneyTransferAccountIdPut
 * Summary: Update money transfer account by its id
 * Notes: Update money transfer account.
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/users/{userId}/money_transfer_accounts/{MoneyTransferAccountId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $moneyTransferAccount = Models\MoneyTransferAccount::where('id', $request->getAttribute('MoneyTransferAccountId'))->where('user_id', $request->getAttribute('userId'))->first();
    $validationErrorFields = $moneyTransferAccount->validate($args);
    if (empty($validationErrorFields)) {
        foreach ($args as $key => $arg) {
            $moneyTransferAccount->{$key} = $arg;
        }
        try {
            $moneyTransferAccount->save();
            $result['data'] = $moneyTransferAccount->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            return renderWithJson($result, 'Account could not be updated. Please, try again', '', 1);
        }
    } else {
        return renderWithJson($result, 'Account could not be updated. Please, try again', $validationErrorFields, 1);
    }
})->add(new ACL('canUserUpdateMoneyTransferAccount'));
/**
 * DELETE MoneyTransferAccountsMoneyTransferAccountIdDelete
 * Summary: Delete money transfer account
 * Notes: Delete money transfer account
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/money_transfer_accounts/{moneyTransferAccountId}', function ($request, $response, $args) {
    $result = array();
    $moneyTransferAccount = Models\MoneyTransferAccount::where('id', $request->getAttribute('moneyTransferAccountId'))->first();
    try {
        $userCashWithdrawal = Models\UserCashWithdrawal::where('money_transfer_account_id', $moneyTransferAccount->id)->whereIn('withdrawal_status_id', [\Constants\UserCashWithdrawStatus::Pending, \Constants\UserCashWithdrawStatus::UnderProcess])->count();        
        if ($userCashWithdrawal == 0) {
            $moneyTransferAccount->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Money transfer account already assigned to user cash withdrawal', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Money transfer account could not be added. Please, try again', '', 1);
    }
})->add(new ACL('canDeleteMoneyTransferAccount'));
/**
 * DELETE usersuserIdMoneyTransferAccountsMoneyTransferAccountIdDelete
 * Summary: Delete money transfer account
 * Notes: Delete money transfer account
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/users/{userId}/money_transfer_accounts/{moneyTransferAccountId}', function ($request, $response, $args) {
    $result = array();
    $moneyTransferAccount = Models\MoneyTransferAccount::where('id', $request->getAttribute('moneyTransferAccountId'))->first();
    try {
        $moneyTransferAccount->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Money transfer account could not be added. Please, try again', '', 1);
    }
})->add(new ACL('canUserDeleteMoneyTransferAccount'));
