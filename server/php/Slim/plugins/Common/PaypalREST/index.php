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
$app_path = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR;
require_once $app_path . 'Common' . DIRECTORY_SEPARATOR . 'PaypalREST' . DIRECTORY_SEPARATOR . 'functions.php';
use PayPal\Api\CreditCard;
use PayPal\Rest\ApiContext;

/**
 *
 * @package         Getlancer
 * @copyright   Copyright (c) 2012 {@link http://www.agriya.com/ Agriya Infoway}
 * @license         http://www.agriya.com/ Agriya Infoway Licence
 * @since       2017-05-16
 *
 */
/**
 * GET vaultsPost
 * Summary: Fetch post vaults
 * Notes: Returns post vaults from the system
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/paypal/vaults', function ($request, $response, $args) {
    global $authUser;
    $vault_data = $request->getParsedBody();
    $result = array();
    $vault = new Models\Vault($args);
    try {
        $apiContext = getApiContext();
        $card = new CreditCard();
        $card->setType($vault_data['credit_card_type'])->setNumber($vault_data['credit_card_number'])->setExpireMonth($vault_data['expire_month'])->setExpireYear($vault_data['expire_year'])->setCvv2($vault_data['cvv2'])->setFirstName($vault_data['first_name'])->setLastName($vault_data['last_name']);
        $card->create($apiContext);
        $vault->user_id = $authUser['id'];
        $vault->credit_card_type = $card->getType();
        $vault->vault_key = $card->getId();
        $vault->masked_cc = $card->getNumber();
        $vault->expire_month = $card->getExpireMonth();
        $vault->expire_year = $card->getExpireYear();
        $vault->cvv2 = $card->getCvv2();
        $vault->first_name = $card->getFirstName();
        $vault->last_name = $card->getLastName();
        $vault->payment_type = \Constants\PaymentGateways::PayPalREST;
        if ($vault->save()) {
            $result['data'] = $vault->toArray();
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'Card details could not be saved', '', 1);
        }
    } catch (PayPal\Exception\PayPalConnectionException $ex) {
        $data = json_decode($ex->getData());
        return renderWithJson($data->details, 'Card details could not be saved', '', 1);
    } catch (Exception $ex) {
        return renderWithJson($result, "Card details could not be saved" . $ex->getMessage(), '', 1);
    }
    return renderWithJson($results);
})->add(new ACL('canCreateValut'));
/**
 * GET vaultsPUT
 * Summary: Fetch all vaults
 * Notes: Returns all vaults from the system
 * Output-Formats: [application/json]
 */
$app->PUT('/api/v1/paypal/vaults/{vaultId}', function ($request, $response, $args) {
    global $authUser;
    $args = $request->getParsedBody();
    $vault = Models\Vault::find($request->getAttribute('vaultId'));
    $result = array();
    if (!empty($vault)) {
        try {
            $vault->fill($args);
            $apiContext = getApiContext();
            $card = CreditCard::get($vault->vault_key, $apiContext);
            $vault->save();
            $result['data'] = $vault->toArray();
            return renderWithJson($result);
        } catch (PayPal\Exception\PayPalConnectionException $ex) {
            $data = json_decode($ex->getData());
            return renderWithJson($data->details, 'Card details could not be saved', '', 1);
        } catch (Exception $ex) {
            return renderWithJson($result, "Card details could not be saved" . $ex->getMessage(), '', 1);
        }
    } else {
        return renderWithJson($result, 'No record found', '', 1);
    }
})->add(new ACL('canUpdateValut'));
/**
 * DELETE vaultVaultIdDelete
 * Summary: Delete vault
 * Notes: Deletes a single vault based on the ID supplied
 * Output-Formats: [application/json]
 */
$app->DELETE('/api/v1/paypal/vaults/{vaultId}', function ($request, $response, $args) {
    $vault = Models\Vault::find($request->getAttribute('vaultId'));
    $result = array();
    try {
        if (!empty($vault)) {
            $vault->delete();
            $result = array(
                'status' => 'success',
            );
            return renderWithJson($result);
        } else {
            return renderWithJson($result, 'No record found.', '', 1);
        }
    } catch (Exception $e) {
        return renderWithJson($result, 'Valut could not be deleted. Please, try again.', '', 1);
    }
})->add(new ACL('canDeleteValut'));
/**
 * GET vaultVaultIdGET
 * Summary: Fetch vault
 * Notes: Returns a vault based on a single ID
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/paypal/vaults/{vaultId}', function ($request, $response, $args) {
    $result = array();
    global $authUser;
    $vault = Models\Vault::with('user')->find($request->getAttribute('vaultId'));
    if (!empty($vault)) {
        $result = $vault->toArray();
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'No record found', '', 1, 404);
    }
});
/**
 * GET vaultsGet
 * Summary: Fetch all vaults
 * Notes: Returns all vaults from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/paypal/vaults', function ($request, $response, $args) {
    global $authUser;
    $count = PAGE_LIMIT;
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        if (!empty($queryParams['limit'])) {
            $count = $queryParams['limit'];
        }
        $vaults = Models\Vault::with('user')->Filter($queryParams)->paginate($count)->toArray();
        $data = $vaults['data'];
        unset($vaults['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $vaults
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
});
/**
 * GET vaultsGet
 * Summary: Fetch all vaults
 * Notes: Returns all vaults from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/paypal/process_payment', function ($request, $response, $args) {
    global $authUser, $queryParams, $_server_domain_url;
    $queryParams = $request->getQueryParams();
    $results = array();
    if ($queryParams['paymentId'] && $queryParams['PayerID'] && $queryParams['token'] && $queryParams['id'] && $queryParams['model']) {
        $results = executePayment($queryParams['paymentId'], $queryParams['PayerID'], $queryParams['token'], $queryParams['id'], $queryParams['model']);
        header("Location: " . $results['data']['returnUrl']);
        die;
    } else {
        return renderWithJson($results, $message = 'Invalid Request', $fields = '', $isError = 1);
    }
    header("Location: " . $_server_domain_url);
    die;
});
