<?php
/**
 * To download Job Apply attachment
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
require_once 'config.inc.php';
require_once __DIR__ . '/Slim/vendor/autoload.php';
require_once './Slim/lib/database.php';
require_once './Slim/lib/settings.php';
$size = 'docdownload';
$model = $_GET['model'];
$filename = $_GET['filename'];
$id = $_GET['id'];
list($hash, $ext) = explode('.', $filename);
$attachment_id = '';
if ($model == 'ProjectDocument') {
    list($ext, $attachment_id) = explode('/', $ext);
}
if ($hash == md5($model . $id . $size)) {
    $val_array = array(
        $id,
        $model
    );
    if ($model == 'ProjectDocument') {       
        $s_result = Models\Attachment::where('foreign_id', $id)->where('id', $attachment_id)->where('class', $model)->select('filename', 'dir')->first();
    } else {        
        $s_result = Models\Attachment::where('foreign_id', $id)->where('class', $model)->select('filename', 'dir')->first();
    }
    $file = APP_PATH . '/media/' . $s_result->dir . '/' . $s_result->filename;
    if (file_exists($file)) {
        $basename = basename($file);
        $add_slash = addcslashes($basename, '"\\');
        $quoted = sprintf('"%s"', $add_slash);
        $size = filesize($file);
        $path_info = pathinfo($file);
        header('Content-Description: File Transfer');
        if ($path_info['extension'] == 'pdf') {
            header("Content-type: application/pdf");
        } else {
            header('Content-Type: application/octet-stream');
        }
        header('Content-Disposition: attachment; filename=' . $quoted);
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Content-length: ' . $size);
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        readfile($file);
        exit;
    }
} else {
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
}
