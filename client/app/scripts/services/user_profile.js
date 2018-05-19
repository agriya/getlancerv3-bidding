'use strict';
/**
 * @ngdoc service
 * @name getlancerApp.userProfile
 * @description
 * # userProfile
 * Factory in the getlancerApp.
 */
angular.module('getlancerApp')
    .factory('WorkProfile', ['$resource', function($resource) {
        return $resource('/api/v1/work_profiles/:id', {}, {
            getbyId: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
            getall: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    }])
    .factory('Education', ['$resource', function($resource) {
        return $resource('/api/v1/educations/:id', {}, {
            getbyId: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
            getall: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    }])
    .factory('Certifications', ['$resource', function($resource) {
        return $resource('/api/v1/certifications/:id', {}, {
            getbyId: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
            getall: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    }])
    .factory('Publications', ['$resource', function($resource) {
        return $resource('/api/v1/publications/:id', {}, {
            getbyId: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
            getall: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    }])
    .factory('UserProfile', ['$resource', function($resource) {
        return $resource('/api/v1/users/:id', {}, {
            getbyId: {
                method: 'GET',
                params: {
                    id: '@id'
                }
            },
            delete: {
                method: 'DELETE',
                params: {
                    id: '@id'
                }
            },
            getall: {
                method: 'GET'
            },
            create: {
                method: 'POST'
            },
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });
    }])
    .factory('Countries', ['$resource', function($resource) {
        return $resource('/api/v1/countries', {}, {
            getall: {
                method: 'GET'
            }
        });
    }])
    .factory('Skills', ['$resource', function($resource) {
        return $resource('/api/v1/skills', {}, {
            getall: {
                method: 'GET'
            }
        });
    }])
    .factory('ActiveProjects', ['$resource', function($resource) {
        return $resource('/api/v1/users/:id/active_projects', {}, {
            getall: {
                method: 'GET'
            }
        });
    }])
    .factory('HireMe', ['$resource', function($resource) {
        return $resource('/api/v1/hire_requests', {}, {
            create: {
                method: 'Post'
            }
        });
    }])
    .factory('ExamUsers', ['$resource', function($resource) {
        return $resource('/api/v1/exams_users', {}, {
            getall: {
                method: 'GET'
            }
        });
    }])
    .factory('FreelancerStats', ['$resource', function($resource) {
        return $resource('/api/v1/bids/:user_id/project_stats', {}, {
            get: {
                method: 'GET',
                params: {
                    user_id: '@user_id'
                }
            },
        });
    }])
    .factory('EmployerStats', ['$resource', function($resource) {
        return $resource('/api/v1/projects/:user_id/project_stats', {}, {
            get: {
                method: 'GET',
               
            },
        });
    }])
    .factory('FreelancerReview', ['$resource', function($resource) {
        return $resource('/api/v1/reviews/', {}, {
            getall: {
                method: 'GET',
            },
        });
    }])
    .factory('EmployerReview', ['$resource', function($resource) {
        return $resource('/api/v1/reviews/', {}, {
            getall: {
                method: 'GET',
            },
        });
    }])
      .factory('FollowersFactory', ['$resource', function($resource) {
          return $resource('/api/v1/followers', {}, {
              get: {
                  method: 'GET'
              },
              create: {
                  method: 'POST'
              }
          });
 }])
      .factory('UnfollowFactory', ['$resource', function($resource) {
          return $resource('/api/v1/followers/:followerId', {}, {
              remove: {
                  method: 'DELETE',
                  params: {
                      followerId: '@followerId'
                  }
              }
          });
          
    }])
    
    .factory('FlagsFactory', ['$resource', function($resource) {
        return $resource('/api/v1/flags', {}, {
            create: {
                method: 'POST'
            }
        });
    }])
            .factory('FlagCategoriesFactory', ['$resource', function($resource) {
          return $resource('/api/v1/flag_categories', {}, {
              get: {
                  method: 'GET'
              }
          });

 }]);