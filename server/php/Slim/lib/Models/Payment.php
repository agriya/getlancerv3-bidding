<?php
/**
 * Payment
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    GetlancerV3
 * @subpackage Model
 * @author     Agriya <info@agriya.com>
 * @copyright  2018 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
namespace Models;

class Payment extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = '';
    protected $fillable = array(
        'class',
        'foreign_id',
        'payment_gateway_id',
        'gateway_id',
        'buyer_name',
        'buyer_email',
        'buyer_address',
        'buyer_city',
        'buyer_state',
        'buyer_country_iso2',
        'buyer_phone',
        'buyer_zip_code',
        'credit_card_code',
        'credit_card_expire',
        'credit_card_name_on_card',
        'credit_card_number'
    );
    public function processPayment($id, $body, $type)
    {
        $modelName = 'Models' . '\\' . $type;
        global $_server_domain_url;
        $payment_response = array();
        if ($body['payment_gateway_id'] == \Constants\PaymentGateways::ZazPay) {
            $paymentGatewaySettings = PaymentGatewaySetting::where('payment_gateway_id', \Constants\PaymentGateways::ZazPay)->get();
            foreach ($paymentGatewaySettings as $value) {
                $zazpay[$value->name] = $value->test_mode_value;
            }
            $s = getZazPayObject();
            $post['gateway_id'] = $body['gateway_id'];
            $post['website_id'] = $zazpay['zazpay_website_id'];
            $post['currency_code'] = CURRENCY_CODE;
            $post['amount'] = $body['amount'];
            $post['item_name'] = $body['name'];
            $post['item_description'] = substr($body['description'], 0, 50);
            $post['buyer_email'] = $body['buyer_email'];
            $post['buyer_phone'] = $body['buyer_phone'];
            $post['buyer_address'] = $body['buyer_address'];
            $post['buyer_city'] = $body['buyer_city'];
            $post['buyer_state'] = $body['buyer_state'];
            $post['buyer_country'] = $body['buyer_country_iso2'];
            $post['buyer_zip_code'] = $body['buyer_zip_code'];
            if (!empty($body['credit_card_number'])) {
                $post['credit_card_number'] = $body['credit_card_number'];
                $post['credit_card_expire'] = $body['credit_card_expire'];
                $post['credit_card_name_on_card'] = $body['credit_card_name_on_card'];
                $post['credit_card_code'] = $body['credit_card_code'];
            } elseif (!empty($body['payment_note'])) {
                $post['payment_note'] = $body['payment_note'];
            }
            $post['notify_url'] = $body['notify_url'];
            $post['success_url'] = $body['success_url'];
            $post['cancel_url'] = $body['cancel_url'];
            // @TODO
            $payment_response = $s->callCapture($post);
            $data_response = $modelName::find($body['id']);
            if (!empty($payment_response['status']) && $payment_response['status'] == 'Captured' && $payment_response['error']['code'] == 0) {
                $post['paykey'] = $payment_response['paykey'];
                $post['status'] = 'Captured';
                $post['payment_type'] = 'Capture';
                $post['amount'] = $body['amount'];
                $post['payment_id'] = $payment_response['id'];
                $post['merchant_id'] = $zazpay['zazpay_merchant_id'];
                $post['buyer_id'] = $body['user_id'];
                $modelName::processCaptured($payment_response, $id);
                Payment::_savePaidLog($id, $post, $type, $body['payment_gateway_id']);
                $response = array(
                    'data' => $data_response,
                    'payment_response' => $payment_response,
                    'error' => array(
                        'code' => 0,
                        'message' => 'order successfully completed'
                    )
                );
                // @TODO
                //Payment::addTransactions($response, $type);
            } elseif (!empty($payment_response['status']) && $payment_response['status'] == 'Initiated' && $payment_response['error']['code'] <= 0) { //Offline payment
                $modelName::processInitiated($payment_response);
                if (!empty($payment_response['gateway_callback_url'])) {
                    $response = array(
                        'data' => $data_response,
                        'redirect_url' => $payment_response['gateway_callback_url'],
                        'payment_response' => $payment_response,
                        'error' => array(
                            'code' => 0,
                            'message' => 'redirect to payment url',
                            'fields' => ''
                        )
                    );
                } else {
                    $response = array(
                        'data' => $data_response,
                        'payment_response' => $payment_response,
                        'error' => array(
                            'code' => 0,
                            'message' => 'Initiated Payment without error code',
                            'fields' => ''
                        )
                    );
                }
            } elseif (!empty($payment_response['status']) && $payment_response['status'] == 'Pending' && $payment_response['error']['code'] == '-8') {
                $modelName::processPending($payment_response);
                $response = array(
                    'data' => $data_response,
                    'payment_response' => $payment_response,
                    'error' => array(
                        'code' => 0,
                        'message' => 'You order has been completed and payment is progress.'
                    )
                );
            } else {
                $response = array(
                    'data' => '',
                    'payment_response' => $payment_response,
                    'error' => array(
                        'code' => 1,
                        'message' => 'Payment could not be completed.Please try again...',
                        'fields' => ''
                    )
                );
            }
        } elseif ($body['payment_gateway_id'] == \Constants\PaymentGateways::Wallet) {
            $user = User::find($body['user_id']);
            $user->makeVisible(['available_wallet_amount']);
            $available_wallet_amount = $user['available_wallet_amount'];
            if ($available_wallet_amount >= $body['amount']) {
                $post = array();
                $post['amount'] = $body['amount'];
                $payment_response = array(
                    'status' => 'Captured'
                );
                Payment::_savePaidLog($id, $post, $type, $body['payment_gateway_id']);
                // @TODO
                //Payment::addTransactions($response, $type);
                $response = $modelName::processCaptured($payment_response, $id);
                Payment::updateUserWalletAmount($body['user_id'], $body['amount']);
                $data_response = $modelName::find($body['id']);
                $response = array(
                    'data' => $data_response,
                    'payment_response' => $payment_response,
                    'error' => array(
                        'code' => 0,
                        'message' => 'Order successfully completed'
                    )
                );
            } else {
                $response = array(
                    'data' => '',
                    'error' => array(
                        'code' => 1,
                        'message' => 'Insufficient balance. Please add amount to wallet.',
                        'fields' => ''
                    )
                );
            }
        } elseif ($body['payment_gateway_id'] == \Constants\PaymentGateways::PayPalREST) {
            require_once APP_PATH . DIRECTORY_SEPARATOR . 'server' . DIRECTORY_SEPARATOR . 'php' . DIRECTORY_SEPARATOR . 'Slim/plugins' . DIRECTORY_SEPARATOR . 'Common' . DIRECTORY_SEPARATOR . 'PaypalREST' . DIRECTORY_SEPARATOR . 'functions.php';
            $paymentGatewaySettings = PaymentGatewaySetting::where('payment_gateway_id', \Constants\PaymentGateways::PayPalREST)->get();
            foreach ($paymentGatewaySettings as $value) {
                $paypal[$value->name] = $value->test_mode_value;
            }
            $apiContext = getApiContext();
            $body['success_url'] = $_server_domain_url . '/api/v1/paypal/process_payment?id=' . $id . '&model=' . $type;
            $payment = createPayment($id, $body);
            $data_response = $modelName::find($body['id']);
            if (!empty($payment) && empty($payment->message)) {
                if ($payment->getState() == 'created') {
                    $payment->status = 'Initiated';
                    $data_response->paypal_pay_key = $payment->getId();
                    $data_response->update();
                    if (!empty($payment->getApprovalLink())) {
                        $response = array(
                            'data' => $data_response,
                            'redirect_url' => $payment->getApprovalLink() ,
                            'payment_response' => $payment->toArray() ,
                            'error' => array(
                                'code' => 0,
                                'message' => 'redirect to payment url',
                                'fields' => ''
                            )
                        );
                    } else {
                        $response = array(
                            'data' => $data_response,
                            'payment_response' => $payment->toArray() ,
                            'error' => array(
                                'code' => 0,
                                'message' => 'Initiated Payment without error code',
                                'fields' => ''
                            )
                        );
                    }
                } elseif ($payment->getState() == 'approved') {
                    $transactions = $payment->getTransactions();
                    $relatedResources = $transactions[0]->getRelatedResources();
                    $sale = $relatedResources[0]->getSale();
                    $payment_response = array(
                        'status' => 'Captured',
                        'paykey' => $payment->getId()
                    );
                    $payment->status = 'Captured';
                    $modelName::processCaptured($payment_response, $id);
                    $data_response = $modelName::find($body['id']);
                    $response = array(
                        'data' => $data_response,
                        'payment_response' => $payment->toArray() ,
                        'error' => array(
                            'code' => 0,
                            'message' => 'order successfully completed'
                        )
                    );
                } else {
                    $response = array(
                        'data' => '',
                        'payment_response' => $payment_response,
                        'error' => array(
                            'code' => 1,
                            'message' => 'Payment could not be completed.Please try again...',
                            'fields' => ''
                        )
                    );
                }
            } else {
                $response = array(
                    'data' => $payment->data,
                    'payment_response' => $payment->message,
                    'error' => array(
                        'code' => 1,
                        'message' => 'Payment could not be completed.Please try again...',
                        'fields' => ''
                    )
                );
            }
        } else {
            $response = array(
                'data' => '',
                'payment_response' => $payment_response,
                'error' => array(
                    'code' => 1,
                    'message' => 'Payment could not be completed.Please try again...',
                    'fields' => ''
                )
            );
        }
        return $response;
    }
    public function _saveIPNLog($post_variable)
    {
        $zazpayIpnLog = new ZazpayIpnLog;
        $zazpayIpnLog->post_variable = $post_variable;
        $zazpayIpnLog->ip = saveIp();
        $zazpayIpnLog->save();
    }
    public function _savePaidLog($foreign_id, $paymentDetails, $class = '', $payment_gateway_id)
    {
        if ($payment_gateway_id == \Constants\PaymentGateways::ZazPay) {
            $ZazpayTransactionLog = new ZazpayTransactionLog;
            $ZazpayTransactionLog->foreign_id = $foreign_id;
            $ZazpayTransactionLog->class = $class;
            $ZazpayTransactionLog->amount = !empty($paymentDetails['amount']) ? $paymentDetails['amount'] : '';
            $ZazpayTransactionLog->payment_id = !empty($paymentDetails['payment_id']) ? $paymentDetails['payment_id'] : '';
            $ZazpayTransactionLog->zazpay_pay_key = !empty($paymentDetails['paykey']) ? $paymentDetails['paykey'] : '';
            $ZazpayTransactionLog->merchant_id = !empty($paymentDetails['merchant_id']) ? $paymentDetails['merchant_id'] : '';
            $ZazpayTransactionLog->gateway_id = !empty($paymentDetails['gateway_id']) ? $paymentDetails['gateway_id'] : '';
            $ZazpayTransactionLog->status = !empty($paymentDetails['status']) ? $paymentDetails['status'] : '';
            $ZazpayTransactionLog->payment_type = !empty($paymentDetails['payment_type']) ? $paymentDetails['payment_type'] : '';
            $ZazpayTransactionLog->buyer_id = !empty($paymentDetails['buyer_id']) ? $paymentDetails['buyer_id'] : '';
            $ZazpayTransactionLog->buyer_email = !empty($paymentDetails['buyer_email']) ? $paymentDetails['buyer_email'] : '';
            $ZazpayTransactionLog->buyer_address = !empty($paymentDetails['buyer_address']) ? $paymentDetails['buyer_address'] : '';
            $ZazpayTransactionLog->save();
        } elseif ($payment_gateway_id == \Constants\PaymentGateways::Wallet) {
            $walletTransactionLog = new WalletTransactionLog;
            $walletTransactionLog->foreign_id = $foreign_id;
            $walletTransactionLog->class = $class;
            $walletTransactionLog->amount = !empty($paymentDetails['amount']) ? $paymentDetails['amount'] : '0.00';
            $walletTransactionLog->status = 'Captured';
            $walletTransactionLog->payment_type = 'Capture';
            $walletTransactionLog->save();
        }
    }
    /*public function addTransactions($order, $type)
    {
        if ($type == 'QuoteCreditPurchaseLog') {
            $transaction = new Transaction;
            if ($order->order_status_id == \Constants\OrderStatus::Rejected) {
                $transaction->user_id = \Constants\ConstUserTypes::Admin;
                $transaction->other_user_id = $order['user_id'];
                $transaction->transaction_type_id = \Constants\ConstTransactionTypes::RefundForRejectedOrder;
            } elseif ($order->order_status_id == \Constants\OrderStatus::Pending) {
                $transaction->user_id = $order['user_id'];
                $transaction->other_user_id = \Constants\ConstUserTypes::Admin;
                $transaction->transaction_type_id = \Constants\ConstTransactionTypes::OrderPlaced;
            } elseif ($order->order_status_id == \Constants\OrderStatus::Processing) {
                $transaction->user_id = \Constants\ConstUserTypes::Admin;
                $transaction->other_user_id = $order['restaurant']['user_id'];
                $transaction->transaction_type_id = \Constants\ConstTransactionTypes::PaidAmountToRestaurant;
            } 
            $transaction->restaurant_id = $order['restaurant']['id'];
            $transaction->amount = $order['total_price'];
            $transaction->foreign_id = $order['id'];
            $transaction->class = \Constants\TransactionKeys::Order;
            $transaction->payment_gateway_id = !empty($order['payment_gateway_id']) ? $order['payment_gateway_id'] : '';
            $transaction->gateway_fees = !empty($order['payment_gateway']['gateway_fees']) ? $order['payment_gateway']['gateway_fees'] : '0.00';
            $transaction->save();
        }
        if($type == 'Wallet') {
            $transaction = new Transaction;
            $transaction->user_id = $order['user_id'];
            $transaction->amount = $order['amount'];
            $transaction->foreign_id = $order['id'];
            $transaction->class = \Constants\TransactionKeys::Wallet;
            $transaction->transaction_type_id = \Constants\ConstTransactionTypes::AddedToWallet;
            $transaction->payment_gateway_id = !empty($order['payment_gateway_id']) ? $order['payment_gateway_id'] : '';
            $transaction->gateway_fees = !empty($order['payment_gateway']['gateway_fees']) ? $order['payment_gateway']['gateway_fees'] : '';
            $transaction->save();
        }
        return true;
    }*/
    public function updateUserWalletAmount($user_id, $amount)
    {
        $user = User::where('id', $user_id)->first();
        $user->makeVisible(['available_wallet_amount']);
        $user->available_wallet_amount = $user->available_wallet_amount - $amount;
        $user->save();
    }
}
