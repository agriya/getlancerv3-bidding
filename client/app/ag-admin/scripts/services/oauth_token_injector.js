'use strict';
/**
 * @ngdoc service
 * @name baseApp.oauthTokenInjector
 * @description
 * # sessionService
 * Factory in the baseApp.
 */
angular.module('base')
    .factory('oauthTokenInjector', ['$cookies',
    function($cookies) {
            var oauthTokenInjector = {
                request: function(config) {
                    if (config.url.indexOf('.html') === -1) {
                        if ($cookies.get("token") !== null && $cookies.get("token") !== undefined) {
                            var sep = config.url.indexOf('?') === -1 ? '?' : '&';
                            config.url = config.url + sep + 'token=' + $cookies.get("token");
                        }
                        if(config.url.indexOf('contest_flags') !== -1) {
                            config.url = config.url.replace('contest_flags', 'flags');                                     
                        } 
                        if(config.url.indexOf('portfolio_flags') !== -1) {
                            config.url = config.url.replace('portfolio_flags', 'flags');                                  
                        }                          
                        if(config.url.indexOf('job_flags') !== -1) {
                            config.url = config.url.replace('job_flags', 'flags');                                  
                        }                        
                        if(config.url.indexOf('service_flags') !== -1) {
                            config.url = config.url.replace('service_flags', 'flags');                                  
                        }
                        if(config.url.indexOf('project_flags') !== -1) {
                            config.url = config.url.replace('project_flags', 'flags');                                  
                        }   
                        if(config.url.indexOf('portfolio_followers') !== -1) {
                            config.url = config.url.replace('portfolio_followers', 'followers');                                  
                        }    
                        if(config.url.indexOf('contest_followers') !== -1) {
                            config.url = config.url.replace('contest_followers', 'followers');                                  
                        }           
                        if(config.url.indexOf('project_followers') !== -1) {
                            config.url = config.url.replace('project_followers', 'followers');                                  
                        }           
                        if(config.url.indexOf('service_flag_categories') !== -1) {
                            config.url = config.url.replace('service_flag_categories', 'flag_categories');                                  
                        }               
                        if(config.url.indexOf('project_flag_categories') !== -1) {
                            config.url = config.url.replace('project_flag_categories', 'flag_categories');                                  
                        }              
                        if(config.url.indexOf('contest_flag_categories') !== -1) {
                            config.url = config.url.replace('contest_flag_categories', 'flag_categories');                                  
                        }              
                        if(config.url.indexOf('job_flag_categories') !== -1) {
                            config.url = config.url.replace('job_flag_categories', 'flag_categories');                                  
                        }                   
                        if(config.url.indexOf('portfolio_flag_categories') !== -1) {
                            config.url = config.url.replace('portfolio_flag_categories', 'flag_categories');                                  
                        }                    
                        if(config.url.indexOf('service_reviews') !== -1) {
                            config.url = config.url.replace('service_reviews', 'reviews');                                  
                        }                   
                        if(config.url.indexOf('entry_reviews') !== -1) {
                            config.url = config.url.replace('entry_reviews', 'reviews');                                  
                        }                  
                        if(config.url.indexOf('project_reviews') !== -1) {
                            config.url = config.url.replace('project_reviews', 'reviews');                                  
                        } 
                        if(config.url.indexOf('project_views') !== -1) {
                            config.url = config.url.replace('project_views', 'views');                                  
                        }
                        if(config.url.indexOf('service_views') !== -1) {
                            config.url = config.url.replace('service_views', 'views');                                  
                        }
                        if(config.url.indexOf('contest_views') !== -1) {
                            config.url = config.url.replace('contest_views', 'views');                                  
                        }
                        if(config.url.indexOf('contest_user_views') !== -1) {
                            config.url = config.url.replace('contest_user_views', 'views');                                  
                        }
                        if(config.url.indexOf('exam_views') !== -1) {
                            config.url = config.url.replace('exam_views', 'views');                                  
                        }
                        if(config.url.indexOf('portfolio_views') !== -1) {
                            config.url = config.url.replace('portfolio_views', 'views');                                  
                        }                        
                        if(config.url.indexOf('job_views') !== -1) {
                            config.url = config.url.replace('job_views', 'views');
                        }
                        if(config.url.indexOf('user_flag_categories') !== -1) {
                            config.url = config.url.replace('user_flag_categories', 'flag_categories');
                        }
                        if(config.url.indexOf('user_flags') !== -1) {
                            config.url = config.url.replace('user_flags', 'flags');
                        }
                        if(config.url.indexOf('user_followers') !== -1) {
                            config.url = config.url.replace('user_followers', 'followers');
                        }
                        if(config.url.indexOf('entry_flag_categories') !== -1) {
                            config.url = config.url.replace('entry_flag_categories', 'flag_categories');
                        }
                        if(config.url.indexOf('user_views') !== -1) {
                            config.url = config.url.replace('user_views', 'views');
                        }
                    }
                    return config;
                }
            };
            return oauthTokenInjector;
}]);