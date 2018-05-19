<?php
/**
 * Roles configurations
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
class Auth
{
    public function __invoke($request, $response, $next)
    {
        global $authUser;
        $requestUri = $request->getRequestTarget();
        $queryParams = $request->getQueryParams();
        if (!empty($queryParams['token']) && strpos($requestUri, 'oauth/refresh_token') == false && strpos($requestUri, 'admin-config') == false && strpos($requestUri, 'paypal/process_payment') == false) {
            $oauthAccessToken = Models\OauthAccessToken::where('access_token', $queryParams['token'])->first();
            $expires = !empty($oauthAccessToken['expires']) ? strtotime($oauthAccessToken['expires']) : 0;
            if (empty($oauthAccessToken['access_token']) || ($expires > 0 && $expires < time())) {
                return renderWithJson(array(), 'Authorization Failed', '', 1, 401);
            } else {
                if (!empty($oauthAccessToken['user_id'])) {
                    $authUser = Models\User::select('id', 'role_id')->where('username', $oauthAccessToken['user_id'])->where('is_active', 1)->where('is_email_confirmed', 1)->first();
                    $authUser->makeVisible(['role_id']);
                    $authUser['scope'] = $oauthAccessToken['scope'];
                } else {
                    $authUser['scope'] = $oauthAccessToken['scope'];
                }
            }
            $response = $next($request, $response);
        } /*elseif ($requestUri == '/api/v1/oauth/token' || strpos($requestUri, 'oauth/refresh_token') == true ||  strpos($requestUri, 'admin-config') == true || strpos($requestUri, 'paypal/process_payment') == true){
            $response = $next($request, $response);
        } */else {
            //return renderWithJson(array(), 'Authorization Failed', '', 1, 401);
            $response = $next($request, $response);
        }
        return $response;
    }
}
