'use strict';
/**
 * @ngdoc function
 * @name getlancerApp.controller:UserProfileController
 * @description
 * # UserProfileController
 * Controller of the getlancerApp
 */
angular.module('getlancerApp')
    .controller('UserProfileController', ['$rootScope', '$scope', '$state', 'WorkProfile', 'Education', 'Certifications', 'Publications', 'UserProfile', 'Countries', 'flash', '$filter', 'Constyear', 'Upload', 'md5', '$uibModal', 'ExamUsers', 'ConstUserRole', 'FreelancerStats', 'EmployerStats', 'FreelancerReview', 'EmployerReview', 'ConstExamStatus', '$stateParams', '$uibModalStack', '$location', '$anchorScroll', '$timeout', '$cookies', function($rootScope, $scope, $state, WorkProfile, Education, Certifications, Publications, UserProfile, Countries, flash, $filter, Constyear, Upload, md5, $uibModal, ExamUsers, ConstUserRole, FreelancerStats, EmployerStats, FreelancerReview, EmployerReview, ConstExamStatus, $stateParams, $uibModalStack, $location, $anchorScroll, $timeout, $cookies) {
         if ($cookies.get("auth") !== null && $cookies.get("auth") !== undefined) {
                 $scope.auth_user_detail = $cookies.getObject("auth");
         }
        $scope.ConstUserRole = ConstUserRole;
        $scope.ConstExamStatus = ConstExamStatus;
        $scope.user_id = $stateParams.id;
        var model = this;
        var flashMessage;
        var params = {};
        $scope.experience = {};
        $scope.education = {};
        $scope.certification = {};
        $scope.publication = {};
        $scope.init = function() {
            $scope.portfolio_focus = $location.path()
                .split("/")[4];
            $scope.checked = function(value) {
                $scope.check = value;
            };
                 
            //  $scope.userprofileDetails();
            $scope.ExperienceDetail();
            $scope.educationDetail();
            $scope.CertificationsDetail();
            $scope.publicationsDetail();
            if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/BiddingReview') > -1 === true) {
            $scope.UserRecentReviews();
            }
             userprofileDetail();
            $scope.userDetailGet();
            if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Exam') > -1 === true && $rootScope.isAuth) {
                $scope.GetExamCeritifications();
            }
            $scope.ProfileStats();
            // $scope.getUsersDetails();
        };
        $scope.status = [
            'Invalid',
            'Jan',
            'Feb',
            'March',
            'April',
            'May',
            'June',
            'July',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ];

        function userprofileDetail() {
            UserProfile.getbyId({
                id: $state.params.id
            }, params, function(response) {
                if (parseInt(response.error.code) === 0) {
                    if ($scope.portfolio_focus === 'portfolios') {
                        $timeout(function() {//jshint ignore:line
                            $('html, body')//jshint ignore:line
                                .animate({
                                    scrollTop: $('#portfolios')//jshint ignore:line
                                        .offset()
                                        .top
                                }, 'slow');
                        }, 2000);
                    }
                    $scope.show_response_page = true;
                    $scope.userprofile = response.data;
                    if($scope.userprofile.hourly_rate === null)
                    {
                        $scope.editMoney = true;
                    }
                    // $timeout(function(){
                    //  document.getElementById("user_profile_hourly_rate").innerHTML = $filter("customCurrency")(  $scope.userprofile.hourly_rate);
                    // },500);
                     delete $scope.userprofile.image_name;
                    if (angular.isDefined($scope.userprofile.attachment) && $scope.userprofile.attachment !== null) {
                        var c = new Date();
                        var hash = md5.createHash(response.data.attachment.class + response.data.attachment.foreign_id + 'png' + 'big_thumb');
                        $scope.userprofile.image_name = 'images/big_thumb/' + response.data.attachment.class + '/' + response.data.attachment.foreign_id + '.' + hash + '.png?' + c.getTime();
                    } else {
                        $scope.userprofile.image_name = 'images/default.png';
                    }  if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Common/UserFollow') > -1 === true) {
                            if ($scope.userprofile.follower.length === 0){
                                 $scope.isfollow = false;
                            } else {
                                        angular.forEach($scope.userprofile.follower, function(follow) {
                                            if (angular.isDefined(follow) && follow !== null) {
                                                $scope.isfollow = true;
                                                $scope.follow_id = follow.id;
                                            } else {
                                                $scope.isfollow = false;
                                            }
                                        });
                                    }
                                 }
                    $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Profile") + ' ' + '-' + ' ' + $scope.userprofile.username;
                    /*Employer and Freelancer Profile Change*/
                    if ($scope.userprofile.role.id === $scope.ConstUserRole.User) {
                        $scope.profile_name = 'View Employer Profile';
                        $scope.role_id = $scope.ConstUserRole.Employer;
                        $scope.rating_count = Number(Math.round($scope.userprofile.total_rating_as_freelancer / $scope.userprofile.review_count_as_freelancer) || 0);
                        $scope.review_count = $scope.userprofile.review_count_as_freelancer;
                        $timeout(function(){
                              $scope.reviewLists = $scope.freelancer_review;
                                        angular.forEach($scope.reviewLists, function(review) {
                                            if (review.user.attachment !== null) {
                                                review.review_url = 'images/big_thumb/UserAvatar/' + review.user.id + '.' + md5.createHash('UserAvatar' + review.user.id + 'png' + 'big_thumb') + '.png';
                                            } else {
                                                review.review_url = 'images/default.png';
                                            }
                                        });
                         },500);
                    }else if($scope.userprofile.role.id === $scope.ConstUserRole.Employer)
                    {
                        $timeout(function(){
                            $scope.reviewLists = $scope.employer_review;
                            angular.forEach($scope.reviewLists, function(review) {
                                if (review.user.attachment !== null) {
                                    review.review_url = 'images/big_thumb/UserAvatar/' + review.user.id + '.' + md5.createHash('UserAvatar' + review.user.id + 'png' + 'big_thumb') + '.png';
                                } else {
                                    review.review_url = 'images/default.png';
                                }
                            });
                         },500);
                    }else if($scope.userprofile.role.id === $scope.ConstUserRole.Freelancer)
                    {
                        $timeout(function(){
                            $scope.reviewLists = $scope.freelancer_review;   
                                angular.forEach($scope.reviewLists, function(review) {
                                    if (review.user.attachment !== null) {
                                        review.review_url = 'images/big_thumb/UserAvatar/' + review.user.id + '.' + md5.createHash('UserAvatar' + review.user.id + 'png' + 'big_thumb') + '.png';
                                    } else {
                                        review.review_url = 'images/default.png';
                                    }
                                });
                            },500);
                    }else{
                        $scope.reviewLists = $scope.freelancer_review; 
                        var review = {};
                        angular.forEach($scope.reviewLists, function(review) {
                            if (review.user.attachment !== null) {
                                review.review_url = 'images/big_thumb/UserAvatar/' + review.user.id + '.' + md5.createHash('UserAvatar' + review.user.id + 'png' + 'big_thumb') + '.png';
                            } else {
                                review.review_url = 'images/default.png';
                            }
                        });
                    }
                    /*Rating Count For User*/
                    $scope.rating_count = 0;
                    if ($scope.userprofile.role.id === $scope.ConstUserRole.Employer) {
                        $scope.rating_count = Number(Math.round($scope.userprofile.total_rating_as_employer / $scope.userprofile.review_count_as_employer) || 0);
                        $scope.review_count = $scope.userprofile.review_count_as_employer;
                        $scope.free_emp_stats = false;
                    } else {
                        $scope.rating_count = Number(Math.round($scope.userprofile.total_rating_as_freelancer / $scope.userprofile.review_count_as_freelancer) || 0);
                        $scope.review_count = $scope.userprofile.review_count_as_freelancer;
                        $scope.free_emp_stats = true;
                    }
                    /*First & Last Name Check*/
                    //jshint unused:false
                    if ($scope.userprofile.first_name === null || $scope.userprofile.last_name === null) {
                        $scope.editname = true;
                    }
                    /*About Edit Check*/
                    //jshint unused:false 
                    if ($scope.userprofile.about_me === null) {
                        $scope.editAbout = true;
                    }
                    /*Designation Edit Check*/
                    //jshint unused:false 
                    //|| $scope.userprofile.designation == ''
                    if ($scope.userprofile.designation === null) {
                        $scope.editdesignation = true;
                    }
                    /*Hourly Rate Edit Check*/
                    
                    if ($scope.userprofile.hourly_rate === '0') {
                        $scope.editMoney = true;
                    }
                    /*Location*/
                    if ($scope.userprofile.city === null) {
                        $scope.editLocation = true;
                    }
                    /*Address Block*/
                    //jshint unused:false
                    if ($scope.userprofile.city !== 'null' || $scope.userprofile.country !== 'null') {
                        $scope.userdetail = $scope.userprofile.full_address;
                    }
                }
            });
        }
        /*Location*/
       
        $scope.location = function() {
            $scope.userdetail.city = {};
            $scope.userdetail.state = {};
            $scope.userdetail.country = {};
            var k = 0;
            if ($scope.userprofile.full_address !== undefined) {
                angular.forEach($scope.userprofile.full_address.address_components, function(value) {
                    if (value.types[0] === 'locality' || value.types[0] === 'administrative_area_level_2') {
                        if (value.types[0] === 'locality') {
                            k = 1;
                        }
                    }
                    if (value.types[0] === 'administrative_area_level_2') {
                        $scope.userdetail.city.name = value.long_name;
                    }
                    if (value.types[0] === 'administrative_area_level_1') {
                        $scope.userdetail.state.name = value.long_name;
                    }
                    if (value.types[0] === 'country') {
                        $scope.userdetail.country.iso_alpha2 = value.short_name;
                    }
                    if (value.types[0] === 'postal_code') {
                        $scope.userdetail.zip_code = parseInt(value.long_name);
                    }
                    $scope.userdetail.latitude = $scope.userprofile.full_address.geometry.location.lat();
                    $scope.disable_latitude = true;
                    $scope.userdetail.longitude = $scope.userprofile.full_address.geometry.location.lng();
                    $scope.disable_longitude = true;
                    $scope.userdetail.address = $scope.userprofile.full_address.name + " " + $scope.userprofile.full_address.vicinity;
                    $scope.userdetail.full_address = $scope.userprofile.full_address.formatted_address;
                });
            }
        };
        /*Employer/Freelancer Profile Change*/
        $scope.viewProfile = function(role_id) {
            if (role_id === $scope.ConstUserRole.Freelancer) {
                $scope.profile_name = 'View Employer Profile';
                $scope.review_count = $scope.userprofile.review_count_as_freelancer;
                $scope.role_id = $scope.ConstUserRole.Employer;
                $scope.rating_count = Number(Math.round($scope.userprofile.total_rating_as_freelancer / $scope.userprofile.review_count_as_freelancer) || 0);
                $scope.free_emp_stats = true;
                $scope.reviewLists = $scope.freelancer_review;
                  angular.forEach($scope.reviewLists, function(review) {
                            if (review.user.attachment !== null) {
                                review.review_url = 'images/big_thumb/UserAvatar/' + review.user.id + '.' + md5.createHash('UserAvatar' + review.user.id + 'png' + 'big_thumb') + '.png';
                            } else {
                                review.review_url = 'images/default.png';
                            }
                        });
            } else if (role_id === $scope.ConstUserRole.Employer) {
                $scope.profile_name = 'View Freelancer Profile';
                $scope.role_id = $scope.ConstUserRole.Freelancer;
                $scope.rating_count = Number(Math.round($scope.userprofile.total_rating_as_employer / $scope.userprofile.review_count_as_employer) || 0);
                $scope.review_count = $scope.userprofile.review_count_as_employer;
                $scope.free_emp_stats = false;
                $scope.reviewLists = $scope.employer_review;
                        angular.forEach($scope.reviewLists, function(review) {
                            if (review.user.attachment !== null) {
                                review.review_url = 'images/big_thumb/UserAvatar/' + review.user.id + '.' + md5.createHash('UserAvatar' + review.user.id + 'png' + 'big_thumb') + '.png';
                            } else {
                                review.review_url = 'images/default.png';
                            }
                        });
            }
        };
        $scope.ProfileStats = function() {
            if ($rootScope.settings.SITE_ENABLED_PLUGINS.indexOf('Bidding/Bidding') > -1 === true) {
                FreelancerStats.get({
                    user_id: $state.params.id
                }, params, function(response) {
                    $scope.freelancer_stats = response;
                });
                EmployerStats.get({
                    user_id: $state.params.id
                }, params, function(response) {
                    $scope.employer_stats = response.data;
                });
            }
        };
        $scope.closeInstance = function() {
            $uibModalStack.dismissAll();
        };
        $scope.UserRecentReviews = function() {
            FreelancerReview.getall({
                type: 'freelancer',
                to_user_id: $state.params.id,
                page: $scope.currentpage,
            }, params, function(response) {
                if (angular.isDefined(response._metadata)) {
                    $scope.lastpage = response._metadata.last_page;
                    $scope.currentpage = response._metadata.current_page;
                }
                $scope.freelancer_review = response.data;
            });
            EmployerReview.getall({
                type: 'employer',
                to_user_id: $state.params.id,
                page: $scope.currentpage,
            }, params, function(response) {
                if (angular.isDefined(response._metadata)) {
                    $scope.lastpage = response._metadata.last_page;
                    $scope.currentpage = response._metadata.current_page;
                }
                $scope.employer_review = response.data;
            });
        };
        /* loadmore for reviews  */
        $scope.loadMore = function() {
            $scope.currentpage += 1;
            $scope.UserRecentReviews();
        };
        /* skills Model Function */
        $scope.Userskills = function() {
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'views/user_profile_skills.html',
                animation: false,
                controller: function($scope, $rootScope, $window, $stateParams, $filter, md5, $state, Upload, $timeout, $uibModal, $uibModalStack, Skills, UserProfile) {
                    $rootScope.closemodel = function() {
                        $state.go('user_profile', {
                            id: $state.params.id,
                            slug: $state.params.slug
                        });
                        $uibModalStack.dismissAll();
                        userprofileDetail();
                    };
                    $scope.skill_select = [];
                    $scope.check = function(value, checked) {
                        var idx = $scope.skill_select.indexOf(value);
                        if (idx >= 0 && !checked) {
                            $scope.skill_select.splice(idx, 1);
                        }
                        if (idx < 0 && checked) {
                            $scope.skill_select.push(value);
                        }
                    };
                    var params = {};
                    params.limit = 'all';
                    Skills.getall(params, function(response) {
                        $scope.skills = response.data;
                    });
                    $scope.skill_select = [];
                    params.id = $state.params.id;
                    UserProfile.getbyId(params, function(response) {
                        angular.forEach(response.data.skill_users, function(value) {
                            $scope.skill_select.push(parseInt(value.skill_id));
                        });
                    });
                    $scope.UserSkills = function(skills) {
                        $scope.tmp_skills = [];
                        angular.forEach($scope.skill_select, function(id) {
                            $scope.tmp_skills.push({
                                'skill_id': id
                            });
                        });
                        var params = {};
                        params.skills = $scope.tmp_skills;
                        if(skills.length > 0)
                        {
                            UserProfile.update({
                                id: $state.params.id
                            }, params, function(response) {
                                $scope.closemodel();
                                if (response.error.code === 0) {
                                    flashMessage = $filter("translate")("Skills updated successfully.");
                                    flash.set(flashMessage, 'success', false);
                                    userprofileDetail();
                                    // $window.location.reload();
                                } else {
                                    flashMessage = $filter("translate")(response.error.message);
                                    flash.set(flashMessage, 'error', false);
                                }
                            });
                        }
                    };
                },
                size: 'lg'
            });
        };
        /* [Begin Years listing] */
        var date = new Date();
        var year = date.getFullYear();
        $scope.years = [];
        for (var i = Constyear.startyear; i >= 0; i--) {
            $scope.years.push(year - i);
        }
        $scope.Formcertificate = function(certificationForm) {
            $scope.certification = {};
            certificationForm.$setPristine();
            certificationForm.$setUntouched();
            $scope.showCer = false;
        };
        $scope.FormPublication = function(publicationForm) {
            $scope.publication = {};
            publicationForm.$setPristine();
            publicationForm.$setUntouched();
            $scope.pub_btn = false;
            $scope.showPub = false;
        };
        $scope.FormEducation = function(educationForm) {
            $scope.education = {};            
            educationForm.$setPristine();
            educationForm.$setUntouched();
            $scope.edu_btn = false;
            $scope.showEdu = false; 
        };
        $scope.FormExperience = function(experienceForm) {
            $scope.experience = {};
            experienceForm.$setPristine();
            experienceForm.$setUntouched();
            $scope.save_btn = false;
            $scope.showExp = false;
        };
        /* Get Experience */
        $scope.workdetails = {};
        $scope.ExperienceDetail = function() {
            var params = {};
            params.user_id = $state.params.id;
            WorkProfile.getbyId(params, function(response) {
                $scope.workdetails = response.data;
                if (angular.isDefined($scope.workdetails)) {
                    angular.forEach($scope.workdetails, function(workdetails) {
                        workdetails.to_month = $scope.status[(workdetails.to_month_year)
                            .split('-')[0]];
                        workdetails.from_month = $scope.status[(workdetails.from_month_year)
                            .split('-')[0]];
                    });
                }
            });
        };
        /* [End Years listing] */
        /*  Delete Experience - Can delte by experience user only -- Begins */
        $scope.deleteExperience = function(work_id) {
            /* [ Checks the user_id and login in auth user id ] */
            if ($rootScope.user !== null && $rootScope.user !== undefined) {
                swal({ //jshint ignore:line  
                    title: $filter("translate")("Are you sure you want to delete?"),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    animation: false,
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        var params = {};
                        params.id = work_id;
                        WorkProfile.delete(params, function(response) {
                            if (response.error.code === 0) {
                                flashMessage = $filter("translate")("Experience deleted successfully.");
                                flash.set(flashMessage, 'success', false);
                                $scope.ExperienceDetail();
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                                $scope.ExperienceDetail();
                            }
                        });
                    }
                });
            }
        };
        /* [ Delete Experience - Can delte by posted user only --- Ends] */
        /* [ Edit Click Function ]*/
        model.showform = false;
        $scope.editExperience = function(id) {
            $scope.save_btn = false;
            if (angular.isDefined(id)) {
                $scope.experienceId = id;
                $scope.showExp = true;
                WorkProfile.getbyId({
                    id: $scope.experienceId
                }, function(response) {
                    if (angular.isDefined(response.data)) {
                        $scope.save_btn = false;
                        $scope.experience = response.data;                 
                        var from_month_split = response.data.from_month_year.split('-');
                        if(response.data.currently_working == true){
                            response.data.currently_working == "t";
                        } 
                        if(response.data.to_month_year){
                           var to_month_split = response.data.to_month_year.split('-');
                           $scope.experience.to_month_year = parseInt(to_month_split[0]);
                           $scope.experience.end_year = to_month_split[1];    
                        }
                        $scope.experience.from_month_year = parseInt(from_month_split[0]);
                        $scope.experience.Start_year = from_month_split[1];
                        
                    }
                });
            }
        };
        /* [ Form Save and update ] */
        $scope.save_btn = false;
        $scope.userExperience = function(is_valid, experienceForm) {
            var flashMessage;
            var params = {};
            params.title = $scope.experience.title;
            params.company = $scope.experience.company;
            params.description = $scope.experience.description;
            params.from_month_year = $scope.experience.from_month_year + '-' + $scope.experience.Start_year;
            if ($scope.check === true) {
                var date = new Date();
                var Currentyear = date.getFullYear();
                var CurrentMonth = date.getMonth() + 1;
                params.to_month_year = null;
                params.currently_working = true;
            } else {
                params.currently_working = false;
                params.to_month_year = $scope.experience.to_month_year + '-' + $scope.experience.end_year;
                
            }
            if (angular.isDefined($scope.experienceId) && $scope.experienceId !== null && $scope.experienceId !== '') {
                if (is_valid) {
                    $scope.save_btn = true;
                    WorkProfile.update({
                        id: $scope.experienceId
                    }, params, function(response) {
                        $scope.experienceId = null;
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            $scope.save_btn = false;
                            flashMessage = $filter("translate")("Experience updated successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.experience = {};
                            $scope.showExp = false;
                            experienceForm.$setPristine();
                            experienceForm.$setUntouched();
                            $scope.ExperienceDetail();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.save_btn = false;
                        }
                    });
                }
            } else {
                if (is_valid) {
                    $scope.save_btn = true;
                    WorkProfile.create(params, function(response) {
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            flashMessage = $filter("translate")("Experience added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.experience = {};
                            $scope.showExp = false;
                            $scope.save_btn = false;
                            $scope.ExperienceDetail();
                            experienceForm.$setPristine();
                            experienceForm.$setUntouched();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.save_btn = false;
                        }
                    });
                }
            }
        };
        $scope.Add = function(type)
        {  if(type === 'experience')
            {
                $scope.showExp = true;
            }
            else if(type === 'education')
            {
               $scope.showEdu = true;
            }else if(type === 'Certification')
            {
                $scope.showCer = true;
            }else if(type === 'publication')
            {
                $scope.showPub = true
            }
            
        };
        /*[ Education Details Function Begin] */
        /* Country Details */
        $scope.country = {};
        $scope.country.limit = 'all';
        Countries.getall($scope.country, function(response) {
            if (angular.isDefined(response.data)) {
                $scope.countries = response.data;
            }
        });
        /* Get Educations */
        $scope.educationDetail = function() {
            var params = {};
            params.user_id = $state.params.id;
            Education.getbyId(params, function(response) {
                if (angular.isDefined(response.data)) {
                    $scope.educations = response.data;
                }
            });
        };
        /* Get Education edit details */
        model.showEdu = false;
        $scope.editEducation = function(id) {
            if (angular.isDefined(id)) {
                $scope.edu_btn = false;
                $scope.educationid = id;
                $scope.showEdu = true;
                Education.getbyId({
                    id: $scope.educationid
                }, function(response) {
                    if (angular.isDefined(response.data)) {
                        $scope.education = response.data;
                        $scope.education.country_id = parseInt($scope.education.country_id);
                    }
                });
            }
        };
        /* EDUCATION Create and Edit Function */
        $scope.edu_btn = false;
        $scope.userEducation = function(is_valid, form_name) {
            var flashMessage;
            if (angular.isDefined($scope.educationid) && $scope.educationid !== null && $scope.educationid !== '') {
                if (is_valid) {
                    $scope.edu_btn = true;
                    Education.update({
                        id: $scope.educationid
                    }, $scope.education, function(response) {
                        $scope.educationid = null;
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            flashMessage = $filter("translate")("Education qualification updated successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.education = {};
                            $scope.showEdu = false;
                            $scope.edu_btn = false;
                            $scope.educationDetail();
                            form_name.$setPristine();
                            form_name.$setUntouched();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.edu_btn = false;
                        }
                    });
                }
            } else {
                if (is_valid) {
                    $scope.edu_btn = true;
                    Education.create($scope.education, function(response) {
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            flashMessage = $filter("translate")("Education qualification added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.education = {};
                            $scope.showEdu = false;
                            $scope.edu_btn = false;
                            form_name.$setPristine();
                            form_name.$setUntouched();
                            $scope.educationDetail();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.edu_btn = false;
                        }
                    });
                }
            }
        };
        /*  Delete Experience - Can delte by experience user only -- Begins */
        $scope.deleteEducation = function(education_id) {
            /* [ Checks the user_id and login in auth user id ] */
            if ($rootScope.user !== null && $rootScope.user !== undefined) {
                swal({ //jshint ignore:line
                    title: $filter("translate")("Are you sure you want to delete?"),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    animation: false,
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        var params = {};
                        params.id = education_id;
                        Education.delete(params, function(response) {
                            if (response.error.code === 0) {
                                flashMessage = $filter("translate")("Education deleted successfully.");
                                flash.set(flashMessage, 'success', false);
                                $scope.educationDetail();
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                            }
                        });
                    }
                });
            }
        };
        /* [ Delete Experience - Can delte by posted user only --- Ends] */
        /*certifications Functions */
        $scope.CertificationsDetail = function() {
            var params = {};
            params.user_id = $state.params.id;
            Certifications.getbyId(params, function(response) {
                if (angular.isDefined(response.data)) {
                    $scope.Certifications = response.data;
                }
            });
        };
        model.showCer = false;
        $scope.EditCertification = function(id) {
            if (angular.isDefined(id)) {
                $scope.cer_btn = false;
                $scope.certificateid = id;
                $scope.showCer = true;
                Certifications.getbyId({
                    id: $scope.certificateid
                }, function(response) {
                    if (angular.isDefined(response.data)) {
                        $scope.certification = response.data;
                    }
                });
            }
        };
        /* EDUCATION Create and Edit Function */
        $scope.cer_btn = false;
        $scope.userCertification = function(is_valid, form_name) {
            var flashMessage;
            if (angular.isDefined($scope.certificateid) && $scope.certificateid !== null && $scope.certificateid !== '') {
                if (is_valid) {
                    $scope.cer_btn = true;
                    Certifications.update({
                        id: $scope.certificateid
                    }, $scope.certification, function(response) {
                        $scope.certificateid = null;
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            flashMessage = $filter("translate")("Certificate updated successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.certification = {};
                            $scope.showCer = false;
                            $scope.cer_btn = false;
                            $scope.CertificationsDetail();
                            form_name.$setPristine();
                            form_name.$setUntouched();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.cer_btn = false;
                        }
                    });
                }
            } else {
                if (is_valid) {
                    $scope.cer_btn = true;
                    Certifications.create($scope.certification, function(response) {
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            $scope.cer_btn = false;
                            flashMessage = $filter("translate")("Certificate added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.certification = {};
                            $scope.showCer = false;
                            $scope.CertificationsDetail();
                            form_name.$setPristine();
                            form_name.$setUntouched();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.cer_btn = false;
                        }
                    });
                }
            }
        };
        /*  Delete Experience - Can delte by experience user only -- Begins */
        $scope.deleteCertificate = function(ceritificate_id) {
            /* [ Checks the user_id and login in auth user id ] */
            if ($rootScope.user !== null && $rootScope.user !== undefined) {
                swal({ //jshint ignore:line
                    title: $filter("translate")("Are you sure you want to delete?"),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    animation: false,
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        var params = {};
                        params.id = ceritificate_id;
                        Certifications.delete(params, function(response) {
                            if (response.error.code === 0) {
                                flashMessage = $filter("translate")("Certificate deleted successfully.");
                                flash.set(flashMessage, 'success', false);
                                $scope.CertificationsDetail();
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                            }
                        });
                    }
                });
            }
        };
        /* Get publications */
        $scope.publicationsDetail = function() {
            var params = {};
            params.user_id = $state.params.id;
            Publications.getbyId(params, function(response) {
                if (angular.isDefined(response.data)) {
                    $scope.publications = response.data;
                }
            });
        };
        /* publications function */
        model.showPub = false;
        $scope.publicationid = '';
        $scope.EditPublication = function(id) {
            if (angular.isDefined(id)) {
                $scope.publicationid = id;
                $scope.showPub = true;
                $scope.pub_btn = true;
                Publications.getbyId({
                    id: $scope.publicationid
                }, function(response) {
                    $scope.pub_btn = false;
                    if (angular.isDefined(response.data)) {
                        $scope.publication = response.data;
                    }
                });
            }
        };
        /* EDUCATION Create and Edit Function */
        $scope.pub_btn = false;
        $scope.publication = {};
        $scope.userPublication = function(is_valid, form_name) {
            var flashMessage;
            if (angular.isDefined($scope.publicationid) && $scope.publicationid !== null && $scope.publicationid !== '') {
                if (is_valid) {
                    $scope.pub_btn = true;
                    Publications.update({
                        id: $scope.publicationid
                    }, $scope.publication, function(response) {
                        $scope.pub_btn = false;
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            flashMessage = $filter("translate")("Publication updated successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.publicationid = null;
                            $scope.publication = {};
                            $scope.pub_btn = false;
                            $scope.showPub = false;
                            $scope.publicationsDetail();
                            form_name.$setPristine();
                            form_name.$setUntouched();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.pub_btn = false;
                        }
                    });
                }
            } else {
                if (is_valid) {
                    $scope.pub_btn = true;
                    Publications.create($scope.publication, function(response) {
                        $scope.response = response;
                        if ($scope.response.error.code === 0) {
                            flashMessage = $filter("translate")("Publication added successfully.");
                            flash.set(flashMessage, 'success', false);
                            $scope.publication = {};
                            $scope.showPub = false;
                            $scope.pub_btn = false;
                            $scope.publicationsDetail();
                            form_name.$setPristine();
                            form_name.$setUntouched();
                        } else {
                            flashMessage = $filter("translate")($scope.response.error.message);
                            flash.set(flashMessage, 'error', false);
                            $scope.pub_btn = true;
                        }
                    });
                }
            }
        };
        /*  Delete Experience - Can delte by experience user only -- Begins */
        $scope.deletePublications = function(ceritificate_id) {
            /* [ Checks the user_id and login in auth user id ] */
            if ($rootScope.user !== null && $rootScope.user !== undefined) {
                 swal({ //jshint ignore:line
                    title: $filter("translate")("Are you sure you want to delete?"),
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    closeOnConfirm: true,
                    animation: false,
                 }).then(function (isConfirm) {
                    if (isConfirm) {
                        var params = {};
                        params.id = ceritificate_id;
                        Publications.delete(params, function(response) {
                            if (response.error.code === 0) {
                                flashMessage = $filter("translate")("Publication deleted successfully.");
                                flash.set(flashMessage, 'success', false);
                                $scope.publicationsDetail();
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                            }
                        });
                    }
                });
            }
        };
        //Upload user avatar
        $scope.uploadUserImage = function(file) {
            Upload.upload({
                    url: '/api/v1/attachments?class=UserAvatar',
                    data: {
                        file: file
                    }
                })
                .then(function(response) {
                    if (response.data.error.code === 0) {
                        $scope.newImage = response.data.attachment;
                        $scope.UserAvatar();
                        $scope.error_message = '';
                    } else {
                        $scope.error_message = response.data.error.message;
                    }
                });
        };
        $scope.UserAvatar = function() {
            var flashMessage = {};
            params.id = $state.params.id;
            params.image = $scope.newImage;
            UserProfile.update(params, function(response) {
                if (response.error.code === 0) {
                    $scope.init();
                      var c = new Date();
                      var hash = md5.createHash(response.data.attachment.class + response.data.attachment.foreign_id + 'png' + 'big_thumb');
                      $rootScope.user.userimage = 'images/normal_thumb/' + response.data.attachment.class + '/' + response.data.attachment.foreign_id + '.' + md5.createHash(response.data.attachment.class + response.data.attachment.foreign_id + 'png' + 'normal_thumb') + '.png?' + c.getTime();
                      $scope.userprofile.image_name = 'images/big_thumb/' + response.data.attachment.class + '/' + response.data.attachment.foreign_id + '.' + hash + '.png?' + c.getTime();
                     $cookies.remove('auth');
                        $scope.Authuser = { 
                         id: $scope.auth_user_detail.id,
                         username: $scope.auth_user_detail.username,
                         role_id: $scope.auth_user_detail.role_id,
                         refresh_token: $scope.auth_user_detail.refresh_token,
                         attachment: response.data.attachment
                    };
                    $cookies.put('auth', JSON.stringify($scope.Authuser), {
                                    path: '/'
                                });

                    flashMessage = $filter("translate")("Profile photo updated successfully.");
                    flash.set(flashMessage, 'success', false);
                } else {
                    flashMessage = $filter("translate")(response.error.message);
                    flash.set(flashMessage, 'error', false);
                }
            });
        };
        //user details update function
        $scope.abt_btn = false;
        $scope.userDetailUpdate = function($valid) {
            if ($valid) {
                $scope.abt_btn = true;
                $scope.editAbout = false;
                params.id = $state.params.id;
                UserProfile.update(params, $scope.userdetail, function(response) {
                    $scope.abt_btn = false;
                    if (response.error.code === 0) {
                        $scope.abt_btn = false;
                        $scope.init();
                    }
                });
            }
        };
        $scope.View = function() {
            $scope.showedit = false;
            $scope.showPub = false;
            $scope.showCer = false;
            $scope.showExp = false;
            $scope.showEdu = false;
            var x = document.querySelectorAll(".banner-profile");
            $( x ).removeClass( "banner-edit"); //jshint ignore:line
        };
        $scope.Edit = function() {
            if($scope.locations === true)
            {
                $scope.editLocation = true;
            }
            $scope.showedit = true;
            var x = document.querySelectorAll(".banner-profile");
            $( x ).addClass( "banner-edit"); //jshint ignore:line
        };
        $scope.editLocations = function()
        {
            $scope.locations = true;
            $scope.editLocation = false;
        };
        $scope.Location = function()
        {
            $scope.editLocation =true;
        };
        $scope.userDetailGet = function() {
            params.id = $state.params.id;
            UserProfile.getbyId(params, function(response) {
                $scope.userdetail = response.data;
                $scope.userdetail.hourly_rate = parseInt($scope.userdetail.hourly_rate);
                
            });
        };
        /*Hire model Funtions */
        $scope.HireMe = function() {
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'views/hire_me.html',
                animation: false,
                controller: function($scope, $rootScope, $window, $stateParams, $filter, md5, $state, Upload, $timeout, $uibModal, $uibModalStack, ActiveProjects, UserProfile, HireMe) {
                    var params = {};
                    params.id = $rootScope.user.id;
                     $scope.loader = true;
                    ActiveProjects.getall(params, function(response) {
                        $scope.projects = response.data;
                        $scope.loader = false;
                    });
                    $rootScope.closemodel = function() {
                        $state.go('user_profile', {
                            id: $state.params.id,
                            slug: $state.params.slug
                        });
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
                    $scope.submit = function(valid) {
                        if (valid) {
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
                        params.user_id = $state.params.id;
                        HireMe.create(params, function(response) {
                            $scope.Hire.$setPristine();
                            $scope.Hire.$setUntouched();
                            $scope.$root.message = '';
                            $scope.closemodel();
                            if (response.error.code === 0) {
                                flashMessage = $filter("translate")("Message sent successfully.");
                                flash.set(flashMessage, 'success', false);
                            } else {
                                flashMessage = $filter("translate")(response.error.message);
                                flash.set(flashMessage, 'error', false);
                            }
                        });
                    }
                    };
                },
                size: 'lg'
            });
        };
        /* Exam Users Ceritifications Begin*/
        $scope.GetExamCeritifications = function() {
            var params = {};
            params.user_id = $rootScope.user.id;
            params.exam_status_id = $scope.ConstExamStatus.Passed;
            ExamUsers.getall(params, function(response) {
                $scope.examCertifications = response.data;
                angular.forEach($scope.examCertifications, function(value) {
                    $scope.total_mark = Number(value.total_mark || 0);
                    $scope.total_question_count = Number(value.total_question_count || 0);
                    $scope.average = $scope.total_mark / $scope.total_question_count;
                    value.exam_user_per = parseInt($scope.average * 100);
                    if (angular.isDefined(value.exam.attachment) && value.exam.attachment !== null) {
                        value.logo_url = 'images/small_normal_thumb/' + value.exam.attachment.class + '/' + value.exam.attachment.foreign_id + '.' + md5.createHash(value.exam.attachment.class + value.exam.attachment.foreign_id + 'png' + 'small_normal_thumb') + '.png';
                    } else {
                        value.logo_url = 'images/no-image.png';
                    }
                });
            });
        };
        /**Exam Users End */
        $scope.init();
    }])
    .filter('numCheck', function() {
        return function(number) {
            var value;
            if (number === undefined || isNaN(number)) {
                value = 0;
            } else {
                value = number;
            }
            return value;
        };
    });