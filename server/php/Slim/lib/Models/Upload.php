<?php
/**
 * Upload
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
 * Upload
*/
class Upload extends AppModel
{
    protected $table = 'uploads';
    public $rules = array();
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");
            });
            $query->orWhereHas('contest_user', function ($q) use ($search) {
                $q->where('description', 'ilike', "%$search%");
            });
            $query->orWhereHas('upload_service', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
            $query->orWhereHas('upload_status', function ($q) use ($search) {
                $q->where('name', 'ilike', "%$search%");
            });
        }
    }
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'id');
    }
    public function contest_user()
    {
        return $this->belongsTo('Models\ContestUser', 'contest_user_id', 'id');
    }
    public function upload_service()
    {
        return $this->belongsTo('Models\UploadService', 'upload_service_id', 'id');
    }
    public function upload_service_type()
    {
        return $this->belongsTo('Models\UploadServiceType', 'upload_service_type_id', 'id');
    }
    public function upload_status()
    {
        return $this->belongsTo('Models\UploadStatus', 'upload_status_id', 'id');
    }
    public function vimeoCheckQuota($service, $file_size)
    {
        $uploadService = new UploadService;
        $uploadService->updateQuota(ConstUploadService::Vimeo);
        if (!empty($service) && !empty($file_size)) {
            $UploadService = UploadService::where('slug', $service)->first();
            $remain_space = $UploadService->total_quota - $UploadService->total_upload_filesize;
            if ($file_size > $remain_space) {
                $emailFindReplace = array(
                    '##SERVICE##' => $service,
                );
                // Send e-mail to admin
                sendMail('accountSpaceExceed', $emailFindReplace, SITE_CONTACT_EMAIL);
                return false;
            } else {
                return true;
            }
        }
    }
    public function uploadAudio($contest_user_id, $requestData, $userName, $userId, $reentry = null, $contest = null)
    {
        if (empty($reentry)) {
            //$contestUserData['ContestUser']['is_active'] = 0;
            //$this->ContestUser->save($contestUserData);
        }
        $is_file_uplaoded = false;
        $target_path = APP_PATH . '/media' . DS . 'ContestUser' . DS . $contest_user_id . DS . $requestData['image'];
        $tmp_path = APP_PATH . '/media/tmp/' . $requestData['image'];
        if (HOSTER_AUDIO_TYPE == 'direct') {
            $target_path = $tmp_path;
        } else {
            if (!$reentry) {
                //echo APP_PATH . '/media' . DS . 'ContestUser' . DS . $contest_user_id; exit;
                @mkdir(APP_PATH . '/media' . DS . 'ContestUser', 0777);
                @mkdir(APP_PATH . '/media' . DS . 'ContestUser' . DS . $contest_user_id, 0777);
            }
            $model_path = $target_path;
            $temp_path = substr($target_path, 0, strlen($target_path) - strlen(strrchr($requestData['image'], "."))); //temp path without the ext
            //make sure the file doesn't already exist, if it does, add an itteration to it
            $i = 1;
            while (file_exists($target_path)) {
                $target_path = $temp_path . "-" . $i . strrchr($requestData['image'], ".");
                $i++;
            }
            $is_file_uplaoded = copy($tmp_path, $target_path);
        }
        $uploadData = new Upload;
        $title = SITE_NAME . ' - ' . $contest->name;
        if (((HOSTER_AUDIO_TYPE == 'normal' && $is_file_uplaoded) || (HOSTER_AUDIO_TYPE == 'direct'))) {
            $uploadData->upload_service_type_id = \Constants\ConstUploadServiceType::Normal;
            $uploadData->user_id = $userId;
            $uploadData->contest_user_id = $contest_user_id;
            $uploadData->upload_status_id = \Constants\ConstUploadStatus::Processing;
            $uploadData->video_url = $requestData['image'];
            $uploadData->filesize = round(filesize($target_path) / 1024);
            $contenttype = 'audio/mpeg';
            // $uploadData->audio_title = $title;
            if (HOSTER_AUDIO_SERVICE == 'soundcloud') {
                $uploadData->upload_service_id = \Constants\ConstUploadService::SoundCloud;
                $uploadData->save();
                $_data = Upload::where('id', $uploadData->id)->first();
                try {
                    $soundcloud = new \Services_Soundcloud(soundcloud_client_id, soundcloud_client_secret);
                    $soundcloud->setCurlOptions(array(
                        CURLOPT_SSL_VERIFYPEER => 0,
                        CURLOPT_SSL_VERIFYHOST,
                        0
                    ));
                    $tokens = $soundcloud->credentialsFlow(soundcloud_username, soundcloud_password);
                    $soundcloud->setAccessToken($tokens['access_token']);
                    // upload audio file
                    $track = $soundcloud->post('tracks', array(
                        'track[title]' => $title,
                        'track[asset_data]' => $target_path,
                        'track[sharing]' => 'private',
                        'track[downloadable]' => false,
                        'track[streamable]' => true,
                        'track[embeddable_by]' => 'me'
                    ));
                    $track_data = json_decode($track, true);
                    switch (json_last_error()) {
                        case JSON_ERROR_NONE:
                            $_data->upload_status_id = \Constants\ConstUploadStatus::Processing;
                            $status_value = $track_data['state'];
                            $_data->soundcloud_audio_id = $track_data['id'];
                            if (!empty($track_data['secret_uri'])) {
                                $_data->audio_url = $track_data['secret_uri'];
                            }
                            if ($track_data['state'] == 'finished') {
                                $_data->audio_url = $track_data['secret_uri'];
                                $_data->upload_status_id = \Constants\ConstUploadStatus::Success;
                            } elseif ($track_data['state'] == 'failed') {
                                $_data->upload_status_id = \Constants\ConstUploadStatus::Failure;
                                $_data->soundcloud_audio_id = null;
                            }
                            break;

                        default:
                            $status_value = 'failed';
                            $_data->upload_status_id = \Constants\ConstUploadStatus::Failure;
                            $_data->soundcloud_audio_id = null;
                            break;
                    }
                } catch (VimeoAPIException $e) {
                    $_data->upload_status_id = \Constants\ConstUploadStatus::Failure;
                    $_data->soundcloud_audio_id = null;
                    $_data->failure_message = $e->getMessage();
                    $status_value = 'failed';
                }
                $_data->save();
            } else {
                $status_value = 'failed';
            }
            return $status_value;
        }
    }
    public function uploadVideo($contest_user_id, $requestData, $userName, $userId, $reentry = null, $contest = null)
    {
        if (empty($reentry)) {
            //$contestUserData['ContestUser']['is_active'] = 0;
            //  $this->ContestUser->save($contestUserData);
        }
        if (!$reentry) {
            @mkdir(APP_PATH . '/media' . DS . 'ContestUser' . DS . $contest_user_id, 0777);
        }
        $target_path = APP_PATH . '/media' . DS . 'ContestUser' . DS . $contest_user_id . DS . $requestData['image'];
        $model_path = $target_path;
        $temp_path = substr($target_path, 0, strlen($target_path) - strlen(strrchr($requestData['image'], "."))); //temp path without the ext
        //make sure the file doesn't already exist, if it does, add an itteration to it
        $i = 1;
        /* while (file_exists($target_path)) {
           // $target_path = $temp_path . "-" . $i . strrchr($requestData['image'], ".");
            $i++;
        }*/
        $tmp_path = APP_PATH . '/media/tmp/' . $requestData['image'];
        $uploadData = new Upload;
        $title = SITE_NAME . ' - ' . $contest->name;
        $contenttype = mime_content_type($tmp_path);
        if (copy($tmp_path, $target_path)) {
            $uploadData['upload_service_type_id'] = \Constants\ConstUploadServiceType::Normal;
            $uploadData['user_id'] = $userId;
            $uploadData['contest_user_id'] = $contest_user_id;
            $uploadData['upload_status_id'] = \Constants\ConstUploadStatus::Processing;
            $uploadData['video_url'] = $requestData['image'];
            $uploadData['filesize'] = round(filesize($target_path) / 1024);
            $uploadData['video_title'] = $title;
            if (HOSTER_SERVICE == 'youtube') {
                $uploadData['upload_service_id'] = \Constants\ConstUploadService::YouTube;
                $uploadData->save();
                $_data = new Upload;
                $_data['id'] = $uploadData->id;
                \Zend_Loader::loadClass('Zend_Gdata_YouTube');
                \Zend_Loader::loadClass('Zend_Gdata_ClientLogin');
                $yt = new \Zend_Gdata_YouTube();
                $authenticationURL = 'https://www.google.com/accounts/ClientLogin';
                $httpClient = \Zend_Gdata_ClientLogin::getHttpClient(
                    $username = youtube_username,
                    $password = youtube_password,
                    $service = 'youtube',
                    $client = null,
                    $source = 'MySource', // a short string identifying your application
                    $loginToken = null,
                    $loginCaptcha = null,
                    $authenticationURL
                );
                $applicationId = '';
                $yt = new \Zend_Gdata_YouTube($httpClient, $applicationId, youtube_client_id, youtube_developer_key);
                // create a new VideoEntry object
                $myVideoEntry = new \Zend_Gdata_YouTube_VideoEntry();
                // create a new Zend_Gdata_App_MediaFileSource object
                $filesource = $yt->newMediaFileSource($target_path);
                $filesource->setContentType($contenttype);
                // set slug header
                $filesource->setSlug('IronMan.flv');
                // add the filesource to the video entry
                $myVideoEntry->setMediaSource($filesource);
                $myVideoEntry->setVideoTitle($title);
                $myVideoEntry->setVideoDescription('New video');
                $myVideoEntry->setVideoCategory("Autos");
                // unlisted upload
                $accessControlElement = new \Zend_Gdata_App_Extension_Element('yt:accessControl', 'yt', 'http://gdata.youtube.com/schemas/2007', '');
                $accessControlElement->extensionAttributes = array(
                    array(
                        'namespaceUri' => '',
                        'name' => 'action',
                        'value' => 'list'
                    ) ,
                    array(
                        'namespaceUri' => '',
                        'name' => 'permission',
                        'value' => 'denied'
                    )
                );
                $myVideoEntry->extensionElements = array(
                    $accessControlElement
                );
                // upload URI for the currently authenticated user
                $uploadUrl = 'http://uploads.gdata.youtube.com/feeds/api/users/default/uploads';
                try {
                    $videoEntry = $yt->insertEntry($myVideoEntry, $uploadUrl, 'Zend_Gdata_YouTube_VideoEntry');
                    $state = $videoEntry->getVideoState();
                    if ($state) {
                        $_data['youtube_video_id'] = $videoEntry->getVideoId();
                        $_data['video_url'] = $videoEntry->getVideoWatchPageUrl();
                        $_data['upload_status_id'] = ConstUploadStatus::Processing;
                        if ($state->getName() == 'processing') {
                            $_data['upload_status_id'] = ConstUploadStatus::Processing;
                        } elseif ($state->getName() == 'success') {
                            $_data['upload_status_id'] = ConstUploadStatus::Success;
                        } else {
                            $_data['upload_status_id'] = ConstUploadStatus::Failure;
                        }
                        $videoThumbnails = $videoEntry->getVideoThumbnails();
                        foreach ($videoThumbnails as $videoThumbnail) {
                            $_data['youtube_thumbnail_url'] = $videoThumbnail['url'];
                            break;
                        }
                        $status_value = 2;
                    } else {
                        $status_value = 3;
                    }
                } catch (Zend_Gdata_App_HttpException $httpException) {
                    $_data['upload_status_id'] = ConstUploadStatus::Failure;
                    $_data['failure_message'] = $httpException->getRawResponseBody();
                    $status_value = 4;
                } catch (Zend_Gdata_App_Exception $e) {
                    $_data['upload_status_id'] = ConstUploadStatus::Failure;
                    $_data['failure_message'] = $e->getMessage();
                    $status_value = 4;
                }
            } elseif (HOSTER_SERVICE == 'vimeo') {
                $uploadData['upload_service_id'] = ConstUploadService::Vimeo;
                include 'vendors/VideoResources/Vimeo/vimeo.php';
                $vimeo = new \phpVimeo(vimeo_api_key, vimeo_secret_key, vimeo_access_token, vimeo_access_token_secret);
                $params = array();
                $rsp = $vimeo->call('vimeo.videos.upload.getTicket', $params, 'GET', 'http://vimeo.com/api/rest/v2', false);
                $uploadData['vimeo_video_id'] = $rsp->ticket->id;
                $uploadData->save();
                $_data = new Upload;
                $_data['id'] = $uploadData->id;
                try {
                    $video_id = $vimeo->upload($target_path);
                    if ($video_id) {
                        $_data['vimeo_video_id'] = $video_id;
                        $vimeo->call('vimeo.videos.setTitle', array(
                            'title' => $uploadData['video_title'],
                            'video_id' => $video_id
                        ));
                        if (isset($requestData['Message']['revised']) && $requestData['Message']['revised'] == 1) {
                            $vimeo->call('vimeo.videos.setDescription', array(
                                'description' => $requestData['Message']['message'],
                                'video_id' => $video_id
                            ));
                        } else {
                            $vimeo->call('vimeo.videos.setDescription', array(
                                'description' => $requestData['ContestUser']['description'],
                                'video_id' => $video_id
                            ));
                        }
                        $complete = $vimeo->call('vimeo.videos.getInfo', array(
                            'video_id' => $video_id
                        ));
                        $privacy = $vimeo->call('vimeo.videos.embed.setPrivacy', array(
                            'video_id' => $video_id,
                            'approved_domains' => json_encode(explode(',', Configure::read('vimeo_approved_domains'))) ,
                            'privacy' => 'approved'
                        ), 'GET', 'http://vimeo.com/api/rest/v2', false);
                        $_data['upload_status_id'] = ConstUploadStatus::Processing;
                        if ($complete->stat == 'ok') {
                            $_data['video_url'] = $complete->video[0]->urls->url[0]->_content;
                            $_data['upload_status_id'] = ConstUploadStatus::Success;
                            $_data['vimeo_thumbnail_url'] = $complete->video[0]->thumbnails->thumbnail[0]->_content;
                            $_data['upload_status_id'] = ConstUploadStatus::Success;
                            $status_value = 2;
                        }
                    } else {
                        $status_value = 5;
                    }
                } catch (VimeoAPIException $e) {
                    $_data['upload_status_id'] = ConstUploadStatus::Failure;
                    $_data['failure_message'] = $e->getMessage();
                    $status_value = 4;
                }
            }
            $_data->save();
        } else {
            $status_value = 1;
        }
        return $status_value;
    }
}
