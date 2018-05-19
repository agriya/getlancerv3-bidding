<?php
/**
 * API Endpoints
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
require_once 'vendors/Inflector.php';
require_once 'vendors/OAuth2/Autoloader.php';
require_once 'database.php';
require_once 'vendors/Zazpay/zazpay.php';
require_once 'vendors/Soundcloud/Soundcloud.php';
require_once 'vendors/Youtube/Zend/Loader.php';
require_once 'core.php';
require_once 'constants.php';
require_once 'settings.php';
require_once 'acl.php';
require_once 'auth.php';
use Illuminate\Pagination\Paginator;

Paginator::currentPageResolver(function ($pageName) {
    return empty($_GET[$pageName]) ? 1 : $_GET[$pageName];
});
$config = ['settings' => ['displayErrorDetails' => R_DEBUG]];
global $app;
$app = new Slim\App($config);
$app->add(new \pavlakis\cli\CliRequest());
$app->add(new Auth());
$plugins = explode(',', SITE_ENABLED_PLUGINS);
$corePlugins = array(
    'Common/Message'
);
$plugins = array_merge($plugins, $corePlugins);
$mappingPlugins = array(
    'Common/Flag' => array(
        'Bidding/ProjectFlag',
        'Job/JobFlag',
        'Portfolio/PortfolioFlag',
        'Quote/QuoteSeviceFlag',
        'Common/UserFlag',
    ) ,
    'Common/Follower' => array(
        'Portfolio/PortfolioFollow',
        'Common/UserFollow',
        'Bidding/ProjectFollow'
    ) ,
    'Common/Review' => array(
        'Bidding/BiddingReview',
        'Quote/QuoteReview',
    ) ,
    'Common/Message' => array(
        'Portfolio/PortfolioComment'
    )
);
$newPlugins = array();
foreach ($plugins as $plugin) {
    $isMappingPlugin = false;
    foreach ($mappingPlugins as $mappingPluginKey => $mappingPluginValue) {
        if (array_search($plugin, $mappingPluginValue) !== false) {
            $newPlugins[] = $mappingPluginKey;
            $isMappingPlugin = true;
        }
    }
    if (!$isMappingPlugin) {
        $newPlugins[] = $plugin;
    }
}
$newPlugins = array_unique($newPlugins);
foreach ($newPlugins as $plugin) {
    require_once __DIR__ . '/../plugins/' . $plugin . '/index.php';
}
function isPluginEnabled($pluginName)
{
    $plugins = explode(',', SITE_ENABLED_PLUGINS);
    $plugins = array_map('trim', $plugins);
    if (in_array($pluginName, $plugins)) {
        return true;
    }
    return false;
}
