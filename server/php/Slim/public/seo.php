<?php
/**
 * For SEO Purpose
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
require_once __DIR__ . '/../../config.inc.php';
require_once __DIR__ . '/../vendor/autoload.php';
require_once '../lib/vendors/Inflector.php';
require_once '../lib/database.php';
ini_set('error_reporting', E_ALL);
global $_server_domain_url;
$inflector = new Inflector();
$php_path = PHP_BINDIR . DIRECTORY_SEPARATOR . 'php';
$api_url_map = array(     
    '/\/quote_service\/(?P<quote_service_id>\d+)\/(?P<slug>.*)/' => array(
        'api_url' => '/api/v1/quote_services/{id}',
    ) ,
    '/\/portfolios\/(?P<portfolio_id>\d+)\/(?P<slug>.*)/' => array(
        'api_url' => '/api/v1/portfolios/{id}',
        'title' => 'Portfolios'
    ) ,
    '/\/contests\/(?P<contest_id>\d+)/' => array(
        'api_url' => '/api/v1/contests/{id}',
        'title' => 'Contests'
    ) ,
    '/\/projects\/view\/(?P<project_id>\d+)\/(?P<slug>.*)/' => array(
        'api_url' => '/api/v1/projects/{id}',
        'title' => 'Project'
    ) ,
    '/\/jobs\/view\/(?P<job_id>\d+)/' => array(
        'api_url' => '/api/v1/jobs/{id}',
        'title' => 'Job'
    ) ,
    '/\/user\/(?P<user_id>\d+)\/(?P<slug>.*)/' => array(
        'api_url' => '/api/v1/users/{id}',
    ) ,
    '/\/users(.*)/' => array(
        'api_url' => '/api/v1/users',
        'title' => 'Users'
    ) ,
    '/^\/users\/login$/' => array(
        'api_url' => null,
        'title' => 'Login'
    ) ,
    '/^\/users\/register$/' => array(
        'api_url' => null,
        'title' => 'Register'
    ) ,
    '/^\/users\/forgot_password$/' => array(
        'api_url' => null,
        'title' => 'Forgot Password'
    ) ,
    '/\/page\/(?P<page_id>\d+)\/(?P<slug>.*)/' => array(
        'api_url' => '/api/v1/pages/{id}',
    ) ,
    '/^\/$/' => array(
        'api_url' => null,
        'title' => 'Home'
    ) ,
);
$meta_keywords = $meta_description = $title = $site_name = '';
$og_image = $_server_domain_url . '/images/no_image_available.png';
$og_type = 'website';
$og_url = $_server_domain_url . '' . $_GET['_escaped_fragment_'];
$res = Models\Setting::whereIn('name', array(
    'META_KEYWORDS',
    'META_DESCRIPTION',
    'SITE_NAME'
))->get()->toArray();
foreach ($res as $key => $arr) {
    if ($res[$key]['name'] == 'META_KEYWORDS') {
        $meta_keywords = $res[$key]['value'];
    }
    if ($res[$key]['name'] == 'META_DESCRIPTION') {
        $meta_description = $res[$key]['value'];
    }
    if ($res[$key]['name'] == 'SITE_NAME') {
        $title = $site_name = $res[$key]['value'];
    }
}

if (!empty($_GET['_escaped_fragment_'])) {
    foreach ($api_url_map as $url_pattern => $values) { 
        if (preg_match($url_pattern, $_GET['_escaped_fragment_'], $matches)) {
             // Match _escaped_fragment_ with our api_url_map array; For selecting API call
            if (!empty($values['business_name'])) { //Default title; We will change title for course and user page below;
                $title = $site_name . ' | ' . $values['business_name'];
            }  
            if (!empty($values['api_url'])) {
                $id = (!empty($matches['quote_service_id']) ? $matches['quote_service_id'] :
                      (!empty($matches['page_id']) ? $matches['page_id'] :
                      (!empty($matches['portfolio_id']) ? $matches['portfolio_id'] :
                      (!empty($matches['contest_id']) ? $matches['contest_id'] :
                      (!empty($matches['project_id']) ? $matches['project_id'] :
                      (!empty($matches['job_id']) ? $matches['job_id'] : 0
                    ))))));
                if (!empty($id)) {
                    $api_url = str_replace('{id}', $id, $values['api_url']); // replacing id value
                } else {
                    $api_url = $values['api_url']; // using defined api_url
                }
               $query_string = !empty($matches[1]) ? $matches[1] : '';
				 $response=shell_exec($php_path.' '.__DIR__.'/index.php '.$api_url .' GET '. $query_string);
				$response=utf8_encode($response);
				$response = str_replace('&quot;', '"', $response);
				$response = json_decode($response,true);
								if (!empty($response['data'])) {
                    foreach ($response['data'] as $key => $value) {
                        if ($values['api_url'] == '/api/v1/pages/{id}') {
                            if ($key == 'meta_keywords') {
                                $meta_keywords = !empty($value) ? $value : '';
                            }
                            if ($key == 'meta_description') {
                                $meta_description = !empty($value) ? $value : '';
                            }
                        } 
                        elseif ($values['api_url'] == '/api/v1/quote_services/{id}') {
                                $og_type = 'LocalBusiness';
                                $api_url = '/api/v1/quote_services/{id}';
                            if ($key == 'id') {
                                $quote_services_id = $value;
                            }    
                            if ($key == 'business_name') {
                                $meta_keywords = !empty($value) ? $value : '';
                                $title =  !empty($value) ? $value: $title;
                                $business_name =  !empty($value) ? $value: $title;
                            }
                            if ($key == 'phone_number') {
                                $contact['@type'] = 'ContactPoint';
                                $contact['contactType'] = 'mobile';
                                $contact['telephone'] =  $value;
                            }
                            $location ['@type'] = 'Place';
                            $offer['@type'] = 'Offer';
                            $geoloc['@type'] = 'GeoCoordinates';
                            $location['address']['@type'] = 'PostalAddress';
                            if ($key == 'city') {
                                $location['address']['streetAddress'] =  $value['name'];
                            }
                            if ($key == 'state') {
                                $location['address']['addressRegion'] =  $value['name'];
                            }
                            if ($key == 'country') {
                                $location['address']['addressCountry'] =  $value['name'];
                            }
                            if ($key == 'zip_code'){
                                $location['address']['postalCode'] =  $value;
                            }
                            if ($key == 'latitude'){
                                $geoloc['latitude'] =  $value;
                            }
                            if ($key == 'longitude'){
                                $geoloc['longitude'] =  $value;
                            }                            
                            if ($key == 'attachment' && !empty($value)) {
                                $og_image = $_server_domain_url . '/images/large_thumb/QuoteService/' . $quote_services_id . '.' . md5('QuoteService' . $quote_services_id . 'png' . 'large_thumb') . '.' . 'png';
                            }
                            if ($key == 'slug' && $value != NULL) {
                                $og_url = $_server_domain_url . '/quote_service/' . $quote_services_id . '/' . $value;
                            }
                        }
                        elseif ($values['api_url'] == '/api/v1/jobs/{id}') {
                                $api_url = '/api/v1/jobs/{id}';
                                $og_type = 'BusinessEvent';
                            if ($key == 'id') {
                                $job_id = $value;
                            }    
                            if ($key == 'title') {
                                $meta_keywords = !empty($value) ? $value : '';
                                $title =  !empty($value) ? $value: $title;
                                $name =  !empty($value) ? $value: $title;
                            }
                            $location ['@type'] = 'Place';
                            $offer['@type'] = 'Offer';
                            $location['address']['@type'] = 'PostalAddress';
                            if ($key == 'city') {
                                $location['address']['streetAddress'] =  $value['name'];
                            }
                            if ($key == 'state') {
                                $location['address']['addressRegion'] =  $value['name'];
                            }
                            if ($key == 'country') {
                                $location['address']['addressCountry'] =  $value['name'];
                            }
                            if($key == 'zip_code'){
                                $location['address']['postalCode'] =  $value;
                            }
                            if($key == 'company_website'){
                                 $offer['url'] = $value;
                            }
                            if($key == 'salary_from'){
                                $offer['price'] = $value;
                            }
                            if ($key == 'attachment' && !empty($value)) {
                                $og_image = $_server_domain_url . '/images/medium_thumb/Job/' . $job_id . '.' . md5('Job' . $job_id . 'png' . 'medium_thumb') . '.' . 'png';
                            }
                            if ($key == 'slug' && $value!= NULL) {
                                $og_url = $_server_domain_url . '/jobs/view/' . $job_id;
                            }
                        }
                        elseif ($values['api_url'] == '/api/v1/projects/{id}') {
                            $api_url = '/api/v1/projects/{id}';
                            $og_type =  'product';
                            $rating['@type'] = 'aggregateRating'; 
                            if ($key == 'id') {
                                 $projects_id = $value;
                            }
                            if ($key == 'name') {
                                $meta_keywords = !empty($value) ? $value : '';
                                $title =  !empty($value) ? $value: $title;
                                $project_name = $value;
                            }
                            if ($key == 'reviews' && !empty($value)) {
                                $rating['ratingValue'] = !empty(count($value)) ? count($value) : '';
                            }
                            if ($key == 'description') {
                                 $meta_description = !empty($value) ? $value : '';
                            }
                            if ($key == 'slug' && $value!= NULL) {
                                $og_url = $_server_domain_url . '/projects/view/' . $projects_id . '/' . $value;
                            }
                            if ($key == 'attachment' && !empty($value)) {
                                $og_image = $_server_domain_url . '/images/medium_thumb/Job/' . $projects_id . '.' . md5('Job' . $projects_id . 'png' . 'medium_thumb') . '.' . 'png';
                            }
                        }
                        elseif ($values['api_url'] == '/api/v1/contests/{id}') {
                            $api_url = '/api/v1/contests/{id}';
                            if ($key == 'id') {
                                 $contest_id = $value;
                            }
                            if ($key == 'name') {
                                $meta_keywords = !empty($value) ? $value : '';
                                $title =  !empty($value) ? $value: $title;
                                $contest_name = $value; 
                            }
                            if ($key == 'description') {
                                 $meta_description = !empty($value) ? $value : '';
                                 $offer['description'] = $meta_description;
                            }
                            $og_type =  'Event';
                            $location ['@type'] = 'Place';
                            $location['address']['@type'] = 'PostalAddress';
                            if($key=='prize' && !empty($value)){
                                 $offer['price'] = $value;
                            }
                            if ($key == 'contest_type' && !empty($value['attachment'])) {
                                $og_image = $_server_domain_url . '/images/medium_thumb/ContestType/' . $value['id'] . '.' . md5('ContestType' . $value['id'] . 'png' . 'medium_thumb') . '.' . 'png';
                            }
                            if ($key == 'slug' && $value!= NULL) {
                                $og_url = $_server_domain_url . '/contest/' . $contest_id . '/' . $value;
                            }
                        }
                        elseif ($values['api_url'] == '/api/v1/portfolios/{id}') {
                             $api_url = '/api/v1/portfolios/{id}';
                            if ($key == 'id') {
                                $portfolios_id = $value;
                            }
                            if ($key == 'title') {
                                $meta_keywords = !empty($value) ? $value : '';
                                $title =  !empty($value) ? $value: $title;
                                $portfolios_name = $value; 
                                $og_url = $_server_domain_url . '/portfolios/' . $portfolios_id . '/' . $title;
                            }
                            if ($key == 'description') {
                                 $meta_description = !empty($value) ? $value : '';
                            }
                            $og_type =  'WebSite';
                            if ($key == 'attachment' && !empty($value)) {
                                $og_image = $_server_domain_url . '/images/large_thumb/Portfolio/' . $portfolios_id . '.' . md5('Portfolio' . $portfolios_id . 'png' . 'large_thumb') . '.' . 'png';
                            }                            
                        }
                    }
                } else {
                    $isNoRecordFound = 1;
                }
            }
            break;
        } 
    }
}
if (!empty($response->error) || !empty($isNoRecordFound) || empty($matches)) { // returning 404, if URL or record not found
    header('Access-Control-Allow-Origin: *');
    header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
    exit;
}
$app_id = Models\Provider::where('name', 'Facebook')->first();
?>
<!DOCTYPE html>
<html>
<head>
 <title><?php echo $title; ?></title>
  <meta charset="UTF-8">
  <meta name="description" content="<?php
    echo $meta_description; ?>"/>
  <meta name="keywords" content="<?php
    echo $meta_keywords; ?>"/>
  <meta property="og:app_id" content="<?php
    echo $app_id->api_key; ?>"/>
  <meta property="og:type" content="<?php
    echo $og_type; ?>"/>
  <meta property="og:title" content="<?php
    echo $title; ?>"/>
  <meta property="og:description" content="<?php
    echo $meta_description; ?>"/>
  <meta property="og:type" content="<?php
    echo $og_type; ?>"/>
  <meta property="og:image" content="<?php
    echo $og_image; ?>"/>
  <meta property="og:site_name" content="<?php
    echo $site_name; ?>"/>
  <meta property="og:url" content="<?php
    echo $og_url; ?>"/> 
    <?php
        if ($api_url == '/api/v1/jobs/{id}'){
            $datas['@context'] = "http://www.schema.org";
            $datas['@type'] =  $og_type;
            $datas['image'] = $og_image;
            $datas['description'] = $meta_description;
            $datas['name'] = $meta_keywords;
            $datas['url'] = $og_url;
            $datas['location'] = $location;
            $datas['offers'] = $offer;
        }
        if ($api_url == '/api/v1/projects/{id}'){
            $datas['@context'] = "http://www.schema.org";
            $datas['@type'] =  $og_type;
            $datas['name'] = $project_name;
            $datas['image'] = $og_image;
            $datas['description'] = $meta_description;
            $datas['aggregateRating'] = $rating;
        }
        if ($api_url == '/api/v1/contests/{id}'){
            $datas['@context'] = "http://www.schema.org";
            $datas['@type'] =  $og_type;
            $datas['name'] = $contest_name;
            $datas['image'] = $og_image;
            $datas['url'] = $og_url;
            $datas['description'] = $meta_description;
            $datas['offers'] = $offer;
        }
        if ($api_url == '/api/v1/portfolios/{id}'){
            $datas['@context'] = "http://www.schema.org";
            $datas['@type'] =  $og_type;
            $datas['name'] = $portfolios_name;
            $datas['image'] = $og_image;
            $datas['url'] = $og_url;
        }
        if ($api_url == '/api/v1/quote_services/{id}'){
            $datas['@context'] = "http://www.schema.org";
            $datas['@type'] =  $og_type;
            $datas['name'] = $business_name;
            $datas['image'] = $og_image;
            $datas['url'] = $og_url;
            $datas['description'] = $meta_description;
            $datas['address'] = $location;
            $datas['geo'] = $geoloc;
            $datas['contactPoint'] = $contact;
        }
   ?>
   <script type = "application/ld+json">
        <?php
           echo json_encode($datas, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
        ?>
    </script>
</head>
<body>
</body>
</html>
