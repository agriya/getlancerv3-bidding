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
 * GET PortfolioFlagCategoriesGet
 * Summary: Fetch all Portfolio Flag Categories
 * Notes: Returns all Portfolio Flag Categories from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/flag_categories', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        if (!empty($queryParams['limit']) && ($queryParams['limit'] == 'all')) {
            $results['data'] = Models\FlagCategory::get()->toArray();
        } else {
            $count = PAGE_LIMIT;
            if (!empty($queryParams['limit'])) {
                $count = $queryParams['limit'];
            }
            $flagCategories = Models\FlagCategory::Filter($queryParams)->paginate($count)->toArray();
            $data = $flagCategories['data'];
            unset($flagCategories['data']);
            $results = array(
                'data' => $data,
                '_metadata' => $flagCategories
            );
        }
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * GET PortfolioFlagCategoriesIdGet
 * Summary: Fetch PortfolioFlagCategory
 * Notes: Returns a PortfolioFlagCategory based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/flag_categories/{flagCategoryId}', function ($request, $response, $args) {
    $result['data'] = array();
    $flagCategory = Models\FlagCategory::find($request->getAttribute('flagCategoryId'));
    if (!empty($flagCategory)) {
        $result['data'] = $flagCategory->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'Portfolio Flag Category could not be found. Please, try again.', '', 1);
    }
})->add(new ACL('canViewFlagCategory'));
/**
 * DELETE PortfolioFlagCategoriesPortfolioFlagCategoryIdDelete
 * Summary: Delete Portfolio Flag Category
 * Notes: Deletes a single Portfolio Flag Category based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/flag_categories/{flagCategoryId}', function ($request, $response, $args) {
    $result = array();
    $flagCategory = Models\FlagCategory::find($request->getAttribute('flagCategoryId'));
    if (empty($flagCategory)) {
        return renderWithJson($result, 'No record found.', '', 1);
    }
    try {
        $flagCategory->delete();
        $result = array(
            'status' => 'success',
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, 'Portfolio flag category could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteFlagCategory'));
/**
 * PUT PortfolioFlagCategoriesPortfolioFlagCategoryIdPut
 * Summary: Update Portfolio Flag Category by its id
 * Notes: Update Portfolio Flag Category by its id
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/flag_categories/{flagCategoryId}', function ($request, $response, $args) {
    $args = $request->getParsedBody();
    $result = array();
    $flagCategory = Models\FlagCategory::find($request->getAttribute('flagCategoryId'));
    if (empty($flagCategory)) {
        return renderWithJson($result, 'No record found.', '', 1);
    }
    $flagCategory->fill($args);
    $result = array();
    try {
        $validationErrorFields = $flagCategory->validate($args);
        if (empty($validationErrorFields)) {
            $flagCategory->save();
            $result['data'] = $flagCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Portfolio flag category could not be updated. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Portfolio flag category could not be updated. Please, try again.', '', 1);
    }
})->add(new ACL('canUpdateFlagCategory'));
/**
 * POST PortfolioFlagCategoriesPost
 * Summary: Creates a new Portfolio Flag Category
 * Notes: Creates a new Portfolio Flag Category
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/flag_categories', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $flagCategory = new Models\FlagCategory($args);
    $result = array();
    try {
        $validationErrorFields = $flagCategory->validate($args);
        if (empty($validationErrorFields)) {
            $flagCategory->save();
            $result['data'] = $flagCategory->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Flag category could not be added. Please, try again.', $validationErrorFields, 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Flag category could not be added. Please, try again.', '', 1);
    }
})->add(new ACL('canCreateFlagCategory'));
$app->GET('/api/v1/flags', '_getFlags')->add(new ACL('canListFlag'));
$app->GET('/api/v1/flags/{flagId}', '_getFlags')->add(new ACL('canViewFlag'));
/**
 * DELETE portfolioFlagsPortfolioFlagIdDelete
 * Summary: Delete Portfolio Flag
 * Notes: Deletes a single Portfolio Flag based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/flags/{flagId}', function ($request, $response, $args) {
    global $authUser;
    $result = array();
    $flag = Models\Flag::find($request->getAttribute('flagId'));
    if (empty($flag)) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
    try {
        if (($authUser['id'] == $flag['user_id']) || ($authUser['role_id'] == 1)) {
            $flag->delete($flag->foreign_id, $flag->type);
            $flagCount = Models\Flag::where('class', $flag->class)->where('foreign_id', $flag->foreign_id)->count();
            $model = 'Models\\' . $flag->class;
            $dispatcher = $model::getEventDispatcher();
            $model::unsetEventDispatcher();
            $foreignModel = $model::find($flag->foreign_id);
            $foreignModel->flag_count = $flagCount;
            $foreignModel->update();
            $model::setEventDispatcher($dispatcher);
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            $result = array();
            return renderWithJson($result, ' flag could not be deleted. Please, try again.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, ' flag could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteFlag'));
/**
 * POST FlagsPost
 * Summary: Creates a new Flag
 * Notes: Creates a new  Flag
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/flags', '_postFlags');
//Get Portfolio flags
function _getFlags($request, $response, $args)
{
    $result = array();
    $queryParams = $request->getQueryParams();
    try {
        if (!isset($queryParams['limit']) || ($queryParams['limit'] == 'all')) {
            $queryParams['limit'] = Models\Flag::count();
        }
        if (!empty($request->getAttribute('portfolioId'))) {
            $enabledIncludes = array(
                'attachment',
                'flag_category'
            );
            (isPluginEnabled('Portfolio/Portfolio')) ? $enabledIncludes[] = 'portfolio' : '';
            $flags = Models\Flag::with($enabledIncludes)->Filter($queryParams)->where('portfolio_id', $request->getAttribute('portfolioId'))->paginate($queryParams['limit'])->toArray();
        } elseif (!empty($request->getAttribute('flagId'))) {
            $enabledIncludes = array(
                'attachment',
                'foreign_flag',
                'user',
                'flag_category'
            );
            (isPluginEnabled('Portfolio/Portfolio')) ? $enabledIncludes[] = 'portfolio' : '';            
            $result['data'] = Models\Flag::with($enabledIncludes)->Filter($queryParams)->where('id', $request->getAttribute('flagId'))->first()->toArray();
            return renderWithJson($result);
        } else {
            $enabledIncludes = array(
                'foreign_flag',
                'user',
                'flag_category'
            );            
            $flags = Models\Flag::with($enabledIncludes)->Filter($queryParams)->paginate(PAGE_LIMIT)->toArray();
        }
        $data = $flags['data'];
        unset($flags['data']);
        $result = array(
            'data' => $data,
            '_metadata' => $flags
        );
        return renderWithJson($result);
    } catch (Exception $e) {
        return renderWithJson($result, $message = 'No record found', $fields = '', $isError = 1);
    }
}
//Post Flags for Portfolio, Job, User and Project
function _postFlags($request, $response, $args)
{
    global $authUser;
    $body = $request->getParsedBody();
    $result = array();
    $flag = new Models\Flag($body);
    $validationErrorFields = $flag->validate($args);
    if (empty($validationErrorFields)) {
        try {
            $flag->user_id = $authUser['id'];
            $flag->ip_id = saveIp();
            $flag->save();
            if (!empty($flag->flag_category_id)) {
                Models\FlagCategory::where('id', $flag->flag_category_id)->increment('flag_count', 1);
            }
            $flagCount = Models\Flag::where('class', $flag->class)->where('foreign_id', $flag->foreign_id)->count();
            $model = 'Models\\' . $flag->class;
            $dispatcher = $model::getEventDispatcher();
            $model::unsetEventDispatcher();
            $foreignModel = $model::find($flag->foreign_id);
            $foreignModel->flag_count = $flagCount;
            $foreignModel->update();
            $model::setEventDispatcher($dispatcher);
            $result = $flag->toArray();
            return renderWithJson($result);
        } catch (Exception $e) {
            print_r($e->getMessage());
            exit;
            return renderWithJson($result, 'Flag could not be added. Please, try again.', '', 1);
        }
    } else {
        return renderWithJson($result, 'Flag could not be added. Please, try again.', $validationErrorFields, 1);
    }
}
