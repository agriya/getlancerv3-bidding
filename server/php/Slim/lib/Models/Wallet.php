<?php
/**
 * Wallet
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

/*
 * Wallet
*/
class Wallet extends AppModel
{
    protected $table = 'wallets';
    protected $fillable = array(
        'payment_gateway_id',
        'gateway_id',
        'buyer_name',
        'buyer_email',
        'buyer_address',
        'buyer_city',
        'buyer_state',
        'buyer_country_iso2',
        'buyer_phone',
        'buyer_zipcode',
        'credit_card_code',
        'credti_card_expire',
        'credit_card_name_on_card',
        'credit_card_number',
        'amount'
    );
    public $rules = array(
        'amount' => 'sometimes|required',
        'payment_gateway_id' => 'sometimes|required',
    );
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id')->select('id', 'username', 'first_name', 'last_name');
    }
    public function payment_gateway()
    {
        return $this->belongsTo('Models\PaymentGateway', 'payment_gateway_id', 'id');
    }
    public function foreign_transactions()
    {
        return $this->morphMany('Models\Transaction', 'foreign_transaction');
    }
    public function processCaptured($payment_response, $id)
    {
        $wallet = Wallet::where('id', $id)->where('is_payment_completed', false)->first();
        if (!empty($wallet)) {
            $wallet->is_payment_completed = true;
            if (!empty($payment_response['paykey'])) {
                $wallet->paypal_pay_key = $payment_response['paykey'];
            }
            $adminId = User::select('id')->where('role_id', \Constants\ConstUserTypes::Admin)->first();
            insertTransaction($wallet->user_id, $adminId['id'], $wallet->id, 'Wallet', \Constants\TransactionType::AmountAddedToWallet, $wallet->payment_gateway_id, $wallet->amount, 0, 0, 0, 0, $wallet->id, $wallet->gateway_id);
            $wallet->update();
            $user = User::find($wallet->user_id);
            $user->makeVisible(['available_wallet_amount']);
            $user->available_wallet_amount = $user->available_wallet_amount + $wallet->amount;
            $user->is_made_deposite = 1;
            $user->update();
        }
        $response = array(
            'data' => $payment_response,
            'error' => array(
                'code' => 0,
                'message' => 'Payment successfully completed'
            )
        );
        return $response;
    }
    public function processInitiated($payment_response)
    {
        $response = array(
            'data' => $payment_response,
            'error' => array(
                'code' => 0,
                'message' => 'Payment initiated',
                'fields' => ''
            )
        );
        return $response;
    }
    public function processPending($payment_response)
    {
        $response = array(
            'data' => $payment_response,
            'error' => array(
                'code' => 0,
                'message' => 'Payment is in pending state.'
            )
        );
        return $response;
    }
}
