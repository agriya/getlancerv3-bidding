<?php
/**
 * To create thumbnail for uploaded images
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
$db_lnk = pg_connect('host=' . R_DB_HOST . ' port=' . R_DB_PORT . ' dbname=' . R_DB_NAME . ' user=' . R_DB_USER . ' password=' . R_DB_PASSWORD . ' options=--client_encoding=UTF8') or die('Database could not connect');
$thumbsizes = array(
    'UserAvatar' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '42x42',
        'medium_thumb' => '59x59',
        'normal_thumb' => '64x64',
        'big_thumb' => '225x225',
        'large_thumb' => '152x152'
    ) ,
    'Post' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64'
    ) ,
    'ContestType' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '250x200',
        'medium_thumb' => '448x358'
    ) ,
    'ContestUser' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64',
        'entry_big_thumb' => '694x696',
        'medium_thumb' => '200x200',
        'big_thumb' => '471x376'
    ) ,
    'MessageContent' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64',
        'entry_big_thumb' => '694x696',
        'medium_thumb' => '200x200',
        'big_thumb' => '471x376'
    ) ,
    'QuoteService' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '64x64',
        'entry_big_thumb' => '120x120',
        'normal_thumb' => '230x115',
        'medium_thumb' => '201x182',
        'large_thumb' => '284x200',
    ) ,
    'QuoteServicePhoto' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64',
        'entry_big_thumb' => '120x120',
        'medium_thumb' => '201x182'
    ) ,
    'QuoteCategory' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64',
        'entry_big_thumb' => '120x120',
        'medium_thumb' => '241x193',
        'large_thumb' => '1425x400'
    ) ,
    'Portfolio' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '190x160',
        'medium_thumb' => '385x400',
        'large_thumb' => '831x701',
        'lower_medium_thumb' => '238x238',
        'extra_large_thumb' => '780x530',
        'extra_medium_thumb' => '555x311',
        'extra_normal_thumb' => '115x115',
        'entry_big_thumb' => '120x120',
        'medium_big_thumb' => '205x154',
        'medium_thumb' => '284x200'
    ) ,
    'Company' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64',
        'entry_big_thumb' => '120x120'
    ) ,
    'Job' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '56x56',
        'small_normal_thumb' => '92x91',
        'normal_thumb' => '179x151',
        'medium_thumb' => '210x200',
        'entry_big_thumb' => '120x120'
    ) ,
    'JobApply' => array(
        'micro_thumb' => '16x16',
        'small_thumb' => '32x32',
        'normal_thumb' => '64x64',
        'entry_big_thumb' => '120x120'
    ) ,
    'Watermark' => array(
        'big_thumb' => '100x100'
    ) ,
    'Exam' => array(
        'small_normal_thumb' => '30x30',
        'big_thumb' => '165x132'
    )
);
$size = $_GET['size'];
$model = $_GET['model'];
$filename = $_GET['filename'];
$val = $thumbsizes[$model][$size];
list($width, $height) = explode('x', $val);
list($id, $hash, $ext) = explode('.', $filename);
if ($hash == md5($model . $id . $ext . $size)) {
    $condition = array(
        $id,
        $model
    );
    $s_result = Models\Attachment::where('foreign_id', $id)->where('class', $model)->select('filename', 'dir')->first();
    $fullPath = APP_PATH . '/media/' . $s_result->dir . '/' . $s_result->filename;
    $is_aspect = false;
    if (!empty($aspect[$model][$size])) {
        $is_aspect = true;
    }
    $imagePath = '/client/app/images/';
    $whitelist = array(
        '127.0.0.1',
        '::1'
    );
    if (!in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
        $imagePath = '/client/images/';
    }
    $mediadir = APP_PATH . $imagePath . $size . '/' . $model . '/';
    if (!file_exists($mediadir)) {
        mkdir($mediadir, 0777, true);
    }
    $filename = $id . '.' . $hash . '.' . $ext;
    $writeTo = $mediadir . $filename;
    if ($size != 'original') {
        if (!$width || !$height) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            exit;
        }
        if (!($size = getimagesize($fullPath))) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            exit;
        }
        list($currentWidth, $currentHeight, $currentType) = $size;
        if (class_exists('imagick')) {
            $new_image_obj = new imagick($fullPath);
            $new_image = $new_image_obj->clone();
            $new_image->setImageColorspace(Imagick::COLORSPACE_RGB);
            $new_image->flattenImages();
            if (!$is_aspect) {
                $new_image->cropThumbnailImage($width, $height);
            } else {
                $new_image->scaleImage($width, $height, false);
            }
            $new_image->writeImage($writeTo);
        } else {
            $target['width'] = $currentWidth;
            $target['height'] = $currentHeight;
            $target['x'] = $target['y'] = 0;
            $types = array(
                1 => 'gif',
                'jpeg',
                'png',
                'swf',
                'psd',
                'wbmp'
            );
            //http://www.php.net/imagecreatefromjpeg#60241 && http://in2.php.net/imagecreatefrompng#73546
            $imageInfo = getimagesize($fullPath);
            $imageInfo['channels'] = !empty($imageInfo['channels']) ? $imageInfo['channels'] : 1;
            $imageInfo['bits'] = !empty($imageInfo['bits']) ? $imageInfo['bits'] : 1;
            $memoryNeeded = round(($imageInfo[0] * $imageInfo[1] * $imageInfo['bits'] * $imageInfo['channels'] / 8 + Pow(2, 16)) * 1.65);
            if (function_exists('memory_get_usage') && memory_get_usage() + $memoryNeeded > (integer)ini_get('memory_limit') * pow(1024, 2)) {
                ini_set('memory_limit', (integer)ini_get('memory_limit') + ceil(((memory_get_usage() + $memoryNeeded) - (integer)ini_get('memory_limit') * pow(1024, 2)) / pow(1024, 2)) . 'M');
            }
            $image = call_user_func('imagecreatefrom' . $types[$currentType], $fullPath);
            ini_restore('memory_limit');
            // adjust to aspect.
            if ($is_aspect) {
                if (($currentHeight / $height) > ($currentWidth / $width)) {
                    $width = ceil(($currentWidth / $currentHeight) * $height);
                } else {
                    $height = ceil($width / ($currentWidth / $currentHeight));
                }
            } else {
                // Optimized crop adopted from http://in2.php.net/imagecopyresized#71182
                $proportion_X = $currentWidth / $width;
                $proportion_Y = $currentHeight / $height;
                if ($proportion_X > $proportion_Y) {
                    $proportion = $proportion_Y;
                } else {
                    $proportion = $proportion_X;
                }
                $target['width'] = $width * $proportion;
                $target['height'] = $height * $proportion;
                $original['diagonal_center'] = round(sqrt(($currentWidth * $currentWidth) + ($currentHeight * $currentHeight)) / 2);
                $target['diagonal_center'] = round(sqrt(($target['width'] * $target['width']) + ($target['height'] * $target['height'])) / 2);
                $crop = round($original['diagonal_center'] - $target['diagonal_center']);
                if ($proportion_X < $proportion_Y) {
                    $target['x'] = 0;
                    $target['y'] = round((($currentHeight / 2) * $crop) / $target['diagonal_center']);
                } else {
                    $target['x'] = round((($currentWidth / 2) * $crop) / $target['diagonal_center']);
                    $target['y'] = 0;
                }
            }
            if (function_exists('imagecreatetruecolor') && ($temp = imagecreatetruecolor($width, $height))) {
                imagecopyresampled($temp, $image, 0, 0, $target['x'], $target['y'], $width, $height, $target['width'], $target['height']);
            } else {
                $temp = imagecreate($width, $height);
                imagecopyresized($temp, $image, 0, 0, 0, 0, $width, $height, $currentWidth, $currentHeight);
            }
            // Handle Watermark
            $temp = watermark($temp, $model, $size, $currentWidth, $currentHeight, $width, $height);
            if ($model == 'ContestUser' && $size == 'entry_big_thumb') {
                $image_position_y = $image_position_x = 0;
                $white_big_url = APP_PATH . $imagePath . 'white-big.png';
                $white_image_info = getimagesize($white_big_url);
                $white_big_bg = imagecreatefrompng($white_big_url);
                if ($width < $white_image_info[0]) {
                    $image_position_x = ($white_image_info[0] - $width) / 2;
                }
                if ($height < $white_image_info[1]) {
                    $image_position_y = ($white_image_info[1] - $height) / 2;
                }
                imagecopymerge($white_big_bg, $temp, $image_position_x, $image_position_y, 0, 0, $width, $height, 100);
                imagedestroy($temp);
                $temp = $white_big_bg;
            }
            if (strtolower($ext) == 'png') {
                imagepng($temp, $writeTo);
            } elseif (strtolower($ext) == 'jpg' || strtolower($ext) == 'jpeg') {
                imagejpeg($temp, $writeTo, 100);
            } elseif (strtolower($ext) == 'gif') {
                imagegif($temp, $writeTo);
            }
            ob_start();
            call_user_func('image' . $types[$currentType], $temp);
            ob_get_clean();
            imagedestroy($image);
            imagedestroy($temp);
        }
    } else {
        copy($fullPath, $writeTo);
    }
    header('Location:' . $_SERVER['REQUEST_URI'] . '?chrome-3xx-fix');
} else {
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
}
function watermark($temp, $class, $size, $currentWidth, $currentHeight, $width, $height)
{
    $watermark_type = WATERMARK_TYPE;
    if (!empty($watermark_type)) {
        if ($watermark_type == 'Watermark Image') {
            $attachment = Models\Attachment::where('class', 'WaterMark')->first();
            if (!empty($attachment)) {
                $options['dimension'] = $size;
                $options['type'] = 'png';
                $watermark_image_url = APP_PATH . '/media/' . $attachment->dir . '/' . $attachment->filename;
            }
            $watermark_image_info = getimagesize($watermark_image_url);
            $watermark_position_x = $currentWidth;
            $watermark_position_y = $currentHeight;
            $watermark_image_width = $watermark_image_height = 0;
            if (!empty($watermark_image_info)) {
                $watermark_position_x = ($width * WATERMARK_POSITION_X) / 100;
                $watermark_position_y = ($height * WATERMARK_POSITION_Y) / 100;
                $watermark_image_width = $watermark_image_info[0];
                $watermark_image_height = $watermark_image_info[1];
            }
            $watermark = imagecreatefrompng($watermark_image_url);
            imagecopymerge($temp, $watermark, $watermark_position_x, $watermark_position_y, 0, 0, $watermark_image_width, $watermark_image_height, 20);
            imagedestroy($watermark);
        } elseif ($watermark_type == 'Enable Text Watermark') {
            $fontPath = '/client/app/fonts/';
            $whitelist = array(
                '127.0.0.1',
                '::1'
            );
            if (!in_array($_SERVER['REMOTE_ADDR'], $whitelist)) {
                $fontPath = '/client/fonts/';
            }
            $font = APP_PATH . $fontPath . 'arial.ttf';
            $grey = imagecolorallocate($temp, 128, 128, 128);
            $watermark_text = (WATERMARK_TEXT !== null) ? WATERMARK_TEXT : SITE_NAME;
            $op_watermark_text = '';
            for ($i = 0; $i < 10; $i++) {
                $op_watermark_text.= '   ' . $watermark_text;
            }
            imagettftext($temp, 20, 0, WATERMARK_POSITION_X, WATERMARK_POSITION_Y, $grey, $font, $op_watermark_text);
        }
    }
    return $temp;
}
