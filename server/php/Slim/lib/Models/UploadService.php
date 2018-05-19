<?php
/**
 * UploadService
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
 * UploadService
*/
class UploadService extends AppModel
{
    protected $table = 'upload_services';
    public $rules = array();
    public function updateQuota($sevice_id)
    {
        if ($sevice_id == ConstUploadService::Vimeo) {
            $vimeo = new \phpVimeo(vimeo_api_key, vimeo_secret_key, vimeo_access_token, vimeo_access_token_secret);
            $complete = $vimeo->call('vimeo.videos.upload.getQuota');
            $_data = new UploadService;
            $_data['id'] = $sevice_id;
            $_data['total_quota'] = $complete->user->upload_space->max;
            $_data->save();
        }
    }
}
