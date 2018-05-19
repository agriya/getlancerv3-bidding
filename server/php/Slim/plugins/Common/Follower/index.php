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
 * DELETE followersFollowerIdDelete
 * Summary: Delete follower
 * Notes: Deletes a single follower based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/followers/{followerId}', function ($request, $response, $args) {
    $follower = Models\Follower::find($request->getAttribute('followerId'));
    $result = array();
    try {
        if (!empty($follower)) {
            $follower->delete();
            $followeCount = Models\Follower::where('class', $follower->class)->where('foreign_id', $follower->foreign_id)->count();
            $model = 'Models\\' . $follower->class;
            $dispatcher = $model::getEventDispatcher();
            $model::unsetEventDispatcher();
            $foreignModel = $model::find($follower->foreign_id);
            $foreignModel->follower_count = $followeCount;
            $foreignModel->update();
            $model::setEventDispatcher($dispatcher);
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Follower could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Follower could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteFollower'));
/**
 * GET followersFollowerIdGet
 * Summary: Fetch follower
 * Notes: Returns a follower based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/followers/{followerId}', function ($request, $response, $args) {
    $result = array();
    $enabledIncludes = array(
        'foreign_follower',
        'user',
        'ip'
    );
    $follower = Models\Follower::with($enabledIncludes)->find($request->getAttribute('followerId'));
    if (!empty($follower)) {
        $result['data'] = $follower;
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canViewFollower'));
/**
 * GET followersGet
 * Summary: Fetch all followers
 * Notes: Returns all followers from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/followers', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $enabledIncludes = array(
            'foreign_follower',
            'user',
            'ip'
        );
        $followers = Models\Follower::with($enabledIncludes)->Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        $data = $followers['data'];
        unset($followers['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $followers
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListFollower'));
/**
 * POST followersPost
 * Summary: Creates a new follower
 * Notes: Creates a new follower
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/followers', function ($request, $response, $args) {
    global $authUser, $_server_domain_url;
    $args = $request->getParsedBody();
    $follower = new Models\Follower($args);
    $result = array();
    try {
        $validationErrorFields = $follower->validate($args);
        if (empty($validationErrorFields)) {
            $follwers = Models\Follower::where('user_id', $authUser['id'])->where('class', $follower->class)->where('foreign_id', $follower->foreign_id)->first();
            if (!empty($follwers)) {
                return renderWithJson($result, 'Already added Followers', '', 1);
            }
            $follower->user_id = $authUser['id'];
            $follower->ip_id = saveIp();
            $follower->save();
            $followeCount = Models\Follower::where('class', $follower->class)->where('foreign_id', $follower->foreign_id)->count();
            $model = 'Models\\' . $follower->class;
            $dispatcher = $model::getEventDispatcher();
            $model::unsetEventDispatcher();
            $foreignModel = $model::find($follower->foreign_id);
            $foreignModel->follower_count = $followeCount;
            $foreignModel->update();
            $model::setEventDispatcher($dispatcher);            
            $userDetails = getUserHiddenFields($authUser['id']);
            $otherUserId = 0;
            if ($follower->class == 'Project' && isPluginEnabled('Bidding/Bidding')) {
                $project = Models\Project::find($follower->foreign_id);
                $otherUserId = $project->user_id;
                $employerDetails = getUserHiddenFields($project->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($employerDetails->username) ,
                    '##FAV_USERNAME##' => ucfirst($userDetails->username) ,
                    '##PROJECT_NAME##' => $project->name,
                    '##PROJECT_LINK##' => $_server_domain_url . '/projects/view/' . $project->id . '/' . $project->slug
                );
                sendMail('Project Favorite Added', $emailFindReplace, $employerDetails->email);
            } elseif ($follower->class == 'User') {
                $user = Models\User::find($follower->foreign_id);
                $otherUserId = $user->id;
                $employerDetails = getUserHiddenFields($user->id);
                $emailFindReplace = array(
                    '##USER##' => ucfirst($employerDetails->username) ,
                    '##FOLLOWED_USER##' => ucfirst($userDetails->username)
                );
                sendMail('Follow Email', $emailFindReplace, $employerDetails->email);
            } elseif ($follower->class == 'Portfolio' && isPluginEnabled('Portfolio/Portfolio')) {
                $portfolio = Models\Portfolio::find($follower->foreign_id);
                $otherUserId = $portfolio->user_id;
                $employerDetails = getUserHiddenFields($portfolio->user_id);
                $emailFindReplace = array(
                    '##USERNAME##' => ucfirst($employerDetails->username) ,
                    '##FAV_USERNAME##' => ucfirst($userDetails->username) ,
                    '##PORTFOLIO_NAME##' => $portfolio->title,
                    '##PORTFOLIO_LINK##' => $_server_domain_url . '/portfolios/' . $portfolio->id . '/' . $portfolio->title
                );
                sendMail('Portfolio Favorite Added', $emailFindReplace, $employerDetails->email);
            }
            insertActivities($authUser['id'], $otherUserId, $follower->class, $follower->foreign_id, 0, 0, \Constants\ActivityType::FollowerPosted, $follower->foreign_id);
            $result = $follower->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Follower could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Follower could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateFollower'));
