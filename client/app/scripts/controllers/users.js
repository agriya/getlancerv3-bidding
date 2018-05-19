 'use strict';
 /**
  * @ngdoc function
  * @name getlancerApp.controller:UsersController
  * @description
  * # UsersController
  * Controller of the getlancerApp
  */
 angular.module('getlancerApp')
     .controller('UsersController', ['$rootScope', '$scope', '$state', 'UserProfile', 'FreelancerSkills', 'md5', '$filter', '$uibModalStack','$uibModal', function($rootScope, $scope, $state, UserProfile, FreelancerSkills, md5, $filter, $uibModalStack, $uibModal) {
         $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Browse Freelancers");
         $scope.data = {};
         $scope.search_value = {};
         /*  search freelancer function*/
         $scope.freelancerSearch = function(data) {
             if (angular.isDefined(data.skill_select)) {
                 var skills = [];
                 angular.forEach(data.skill_select, function(value) {
                     skills.push(value.id);
                 });
                 data.skills = skills.toString();
             }
             $scope.params.q = data.q;
             $scope.params.skills = data.skills;
             $scope.params.hourly_rate = data.hourly_rate;
             $state.go('Users', $scope.params);
         };
         $scope.data.q = $state.params.q;
         $scope.data.hourly_rate = $state.params.hourly_rate;
         $scope.data.skills = $state.params.skills;
         //$scope.search_value = data;
         if ($state.params.hourly_rate === 'hourly_rate_min') {
             $scope.search_value.hourly_rate_min = 0;
             $scope.search_value.hourly_rate_max = 9;
         } else if ($state.params.hourly_rate === 'hourly_rate_minimum') {
             $scope.search_value.hourly_rate_min = 10;
             $scope.search_value.hourly_rate_max = 20;
         } else if ($state.params.hourly_rate === 'hourly_rate_medium') {
             $scope.search_value.hourly_rate_min = 21;
             $scope.search_value.hourly_rate_max = 30;
         } else if ($state.params.hourly_rate === 'hourly_rate_max') {
             $scope.search_value.hourly_rate_min = 31;
             $scope.search_value.hourly_rate_max = 40;
         } else if ($state.params.hourly_rate === 'hourly_rate_maximum') {
             $scope.search_value.hourly_rate_min = 41;
         } else {}
         /*  user details get function */
         function usersDetail() {
             $scope.loader = true;
             $scope.params = {};
             $scope.rating_value = 0;
             $scope.params.page = ($scope.currentPage !== undefined) ? $scope.currentPage : 1;
             $scope.params.role = 'freelancer';
             $scope.params.q = $state.params.q;
             $scope.params.skills = $state.params.skills;
             $scope.params.hourly_rate_min = $scope.search_value.hourly_rate_min;
             $scope.params.hourly_rate_max = $scope.search_value.hourly_rate_max;
             UserProfile.getbyId($scope.params, function(response) {
                  if (angular.isDefined(response._metadata)) {
                    $scope.currentPage = response._metadata.current_page;
                    $scope.totalItems = response._metadata.total;
                    $scope.itemsPerPage = response._metadata.per_page;
                    $scope.noOfPages = response._metadata.last_page;
                }
                 $scope.loader = false;
                 $scope.users = response.data;
                 angular.forEach($scope.users, function(user) {
                     if (user.attachment !== null) {
                         user.users_avatar_url = 'images/big_thumb/UserAvatar/' + user.id + '.' + md5.createHash('UserAvatar' + user.id + 'png' + 'big_thumb') + '.png';
                     } else {
                         user.users_avatar_url = 'images/default.png';
                     }
                     $scope.exam_users = user.exams_users;
                     angular.forEach($scope.exam_users, function(exams) {
                         $scope.total_mark = Number(exams.total_mark || 0);
                         $scope.total_question_count = Number(exams.total_question_count || 0);
                         $scope.average = $scope.total_mark / $scope.total_question_count;
                         exams.exam_user_per = parseInt($scope.average * 100);
                         if (angular.isDefined(exams.exam.attachment) && exams.exam.attachment !== null) {
                             exams.exam_image = 'images/small_normal_thumb/Exam/' + exams.exam.attachment.foreign_id + '.' + md5.createHash('Exam' + exams.exam.attachment.foreign_id + 'png' + 'small_normal_thumb') + '.png';
                         } else {
                             exams.exam_image = 'images/no-image.png';
                         }
                     });
                 });
             });
         }
         $scope.showhideSkills = function(id, is_show) {
             var skillId = 'skills-' + id;
             if (parseInt(is_show) === 1) {
                 $('#' + skillId) //jshint ignore:line
                     .attr('style', 'display:block');
             } else {
                 $('.user-certificate-skills') //jshint ignore:line
                     .attr('style', 'display:none');
             }
         };
         /*skills listing get funtion*/
         var params = {};
         params.limit = 'all';
         FreelancerSkills.get(params, function(response) {
             $scope.loader = false;
             if (parseInt(response.error.code) === 0) {
                 $scope.userSkill = [];
                 $scope.userSkills = response.data;
                 $scope.data.skill_select = [];
                 var selectedSkill = "";
                 if (angular.isDefined($state.params.skills)) {
                     selectedSkill = $state.params.skills.split(',');
                 }
                 angular.forEach($scope.userSkills, function(value) {
                     $scope.skillName = value.name;
                     $scope.userSkill.push({
                         id: value.id,
                         text: value.name
                     });
                     if (selectedSkill !== "" && selectedSkill.indexOf(value.id.toString()) !== -1) {
                         $scope.data.skill_select.push({
                             id: value.id,
                             text: value.name
                         });
                     }
                 });
             } else {
                 console.log('Skills Error');
             }
         }, function(error) {
             console.log('Skills Error', error);
             
         });
         /*load skills in search */
         $scope.loadSkills = function(qstr) {
             qstr = qstr.toLowerCase();
             var items = [];
             var name;
             angular.forEach($scope.userSkill, function(value) {
                 name = value.text.toLowerCase();
                 if (name.indexOf(qstr) >= 0) {
                     items.push({
                         id: value.id,
                         text: value.text
                     });
                 }
             });
             return items;
         };
          $scope.paginate = function() {
            $scope.currentPage = parseInt($scope.currentPage);
            usersDetail();
        };
         /*hire me option*/
         var flashMessage = "";
          $scope.HireMe = function($other_user_id) {              
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'views/hire_me.html',
                animation: false,
                controller: function($scope, $rootScope, $window, $stateParams, $filter, md5, $state, Upload, $timeout, $uibModal, $uibModalStack, ActiveProjects, UserProfile, HireMe, flash) {
                    var params = {};
                    params.id = $rootScope.user.id;
                    ActiveProjects.getall(params, function(response) {
                        $scope.projects = response.data;
                    });
                    $rootScope.closemodel = function() {
                        $state.go('Users');
                        $uibModalStack.dismissAll();
                    };
                    $scope.project_select = [];
                    $scope.check = function(value, checked) {
                        var idx = $scope.project_select.indexOf(value);
                        if (idx >= 0 && !checked) {
                            $scope.project_select.splice(idx, 1);
                        }
                        if (idx < 0 && checked) {
                            $scope.project_select.push(value);
                        }
                    };
                    $scope.submit = function() {
                        $scope.tmp_skills = [];
                        angular.forEach($scope.project_select, function(id) {
                            $scope.tmp_skills.push({
                                'project_id': id
                            });
                        });
                        var params = {};
                        params.projects = $scope.tmp_skills;
                        params.message = $scope.message;
                        params.class = 'Project';
                        params.user_id = $other_user_id;
                        HireMe.create(params, function(response) {
                            $scope.closemodel();
                            if (response.error.code === 0) {
                                flashMessage = $filter("translate")("Message sent successfully.");
                                flash.set(flashMessage, 'success', false);
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                            }
                        });
                    };
                },
                size: 'lg'
            });
        };
         usersDetail();
         }]);