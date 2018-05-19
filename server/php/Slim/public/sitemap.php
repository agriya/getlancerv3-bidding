<?php
/**
 * For Site Map Purpose
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
$stie_enabled_plugins = Models\Setting::whereIn('name', array(
    'SITE_ENABLED_PLUGINS'
))->get()->toArray();
$plugins_list = explode(',',$stie_enabled_plugins[0]['value']);
$bidding = false;
$job=false;
$portfolio=false;
$quote=false;
$exam=false;
foreach ($plugins_list as $plugin) {
    if (strpos($plugin, 'Bidding') !== false ) {
       $bidding = true;
    }
    if (strpos($plugin, 'Job') !== false ) {
        $job = true;
    }
    if (strpos($plugin, 'Portfolio') !== false ) {
        $portfolio = true;
    }
    if (strpos($plugin, 'Quote') !== false ) {
        $quote = true;
    }
    if (strpos($plugin, 'Exam') !== false ) {
        $exam = true;
    }
}

$tmView="";


if ($bidding) {       
    $projects = Models\Project::where('is_active',1)->get();
    if (!empty($projects)) {        
        foreach($projects as $project) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/projects/view/'.$project->id.'/'.$project->slug.'</loc>';
            $tmView.='<lastmod>'.$project->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }
}

if ($job) {       
    $jobs = Models\Job::get();
    if (!empty($jobs)) {        
        foreach($jobs as $job) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/jobs/view/'.$job->id.'</loc>';
            $tmView.='<lastmod>'.$job->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }
}

if ($portfolio) {       
    $portfolios = Models\Portfolio::get();    
    if (!empty($portfolios)) {        
        foreach($portfolios as $portfolio) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/portfolios/'.$portfolio->id.'/'.$portfolio->slug.'</loc>';
            $tmView.='<lastmod>'.$portfolio->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }
}
if ($quote) {       
    //$quotes = Models\QuoteService::get();    
    if (!empty($quotes)) {        
        foreach($quotes as $quote) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/quote_service/'.$quote->id.'/'.$quote->slug.'</loc>';
            $tmView.='<lastmod>'.$quote->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }
}
if ($exam) {
    $exams = Models\Exam::get();
    if (!empty($exams)) {        
        foreach($exams as $exam) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/exams/'.$exam->id.'/'.$exam->slug.'</loc>';
            $tmView.='<lastmod>'.$exam->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }
}
// static pages
$pages = Models\Page::where('draft',0)->get();
if (!empty($pages)) {        
        foreach($pages as $page) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/pages/'.$page->id.'/'.$page->slug.'</loc>';
            $tmView.='<lastmod>'.$page->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }
// freelancers
$freelancers = Models\User::where('is_active',1)->whereIn('role_id',array(2,4))->get();
if (!empty($freelancers)) {        
        foreach($freelancers as $freelancer) {
            $tmView.='<url>';
            $tmView.='<loc>'.$_server_domain_url.'/users/'.$freelancer->id.'/'.$freelancer->username.'</loc>';
            $tmView.='<lastmod>'.$page->updated_at.'</lastmod>';
            $tmView.='<priority>0.8</priority>'; 
            $tmView.='</url>';           
        }
    }


header('Content-Type: text/xml; charset=utf-8', true);

  
echo '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    echo $tmView;
echo '</urlset>';
 ?>
  