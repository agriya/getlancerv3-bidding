angular.module('getlancerApp.Bidding')
    .controller('ProjectAddCtrl', function ($scope, $rootScope, $state, $filter, flash, Projects, ProjectStatus, ProjectSkills, ProjectCategory, ProjectRange, FileFormat, Upload, ProjectStatusConstant, $window, $timeout, AutocompleteUsers, ConstUserRole) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Post a Project");
        $scope.data = {};
        $timeout(function () {
            $scope.text_box = true;
        }, 1000);
        $scope.show_custom_range = false;
        /*if ($rootScope.projectlike !== undefined) {
            $scope.projectskillsList = $rootScope.projectlike.skills;
            $scope.data.skill_select = [];
            $scope.projectCategoriesList = $rootScope.projectlike.categories;
            $scope.data.category_select = [];
            delete $rootScope.projectlike;
        }*/
        $scope.project_bidding_fee = parseInt($rootScope.settings.PROJECT_MAX_BID_DURATION) || 0;
        $scope.PROJECT_TOTAL_FEE = $rootScope.settings.PROJECT_LISTING_FEE;
        $scope.ProjectStatusConstant = ProjectStatusConstant;
        $scope.index = function () {
            $scope.data.skill_select = [];
            $scope.data.category_select = [];
            ProjectStatus.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projectStatus = response.data;
                } else {
                    console.log('Status Error');
                }
            }, function (error) {
                console.log('ProjectStatus Error', error);
            });
            var params = {};
            params.limit = 'all';
            ProjectSkills.get(params, function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projectSkill = [];
                    $scope.projectSkills = response.data;
                    angular.forEach($scope.projectSkills, function (value) {
                        $scope.projectSkill.push({
                            id: value.id,
                            text: value.name
                        });
                        /* here for select skill default */
                        if ($scope.projectskillsList !== undefined) {
                            if ($scope.projectskillsList.indexOf(value.id) != -1) {
                                $scope.data.skill_select.push({
                                    id: value.id,
                                    text: value.name
                                });
                            }
                        }
                    });
                } else {
                    console.log('Skills Error');
                }
            }, function (error) {
                console.log('Skills Error', error);
            });


            AutocompleteUsers.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.employerUser = [];
                    $scope.employerUsers = response.data;
                    angular.forEach($scope.employerUsers, function (value) {
                        $scope.employerUser.push({
                            id: value.id,
                            text: value.username
                        });
                        /* here for select skill default */
                        if ($scope.employerUsersList !== undefined) {
                            if ($scope.employerUsersList.indexOf(value.id) != -1) {
                                $scope.data.user_select.push({
                                    id: value.id,
                                    text: value.username
                                });
                            }
                        }
                    });
                } else {
                    console.log('Users Error');
                }
            }, function (error) {
                console.log('Users Error', error);
            });
            ProjectRange.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projectRanges = [];
                    angular.forEach(response.data, function (value) {
                        $scope.projectRanges.push({
                            id: value.id,
                            name: value.name + " " + "(" + $rootScope.settings.CURRENCY_SYMBOL + value.min_amount + " - " + $rootScope.settings.CURRENCY_SYMBOL + +value.max_amount + ")"
                        });
                    });
                    $scope.projectRanges.push({
                        id: 0,
                        name: "Custom Range"
                    });
                } else {
                    console.log('Ranges Error');
                }
            }, function (error) {
                console.log('projectRanges Error', error);
            });
            ProjectCategory.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projectCategories = response.data;
                    $scope.projectCat = [];
                    angular.forEach($scope.projectCategories, function (value) {
                        $scope.projectCat.push({
                            id: value.id,
                            text: value.name
                        });
                        if ($scope.projectCategoriesList !== undefined) {
                            if ($scope.projectCategoriesList.indexOf(value.id) != -1) {
                                $scope.data.category_select.push({
                                    id: value.id,
                                    text: value.name
                                });
                            }
                        }
                    });
                } else {
                    console.log('Categories Error');
                }
            }, function (error) {
                console.log('ProjectCategory Error', error);
            });
        };
        $scope.index();
        $scope.loadCategories = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.projectCat, function (value) {
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
        $scope.loadSkills = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.projectSkill, function (value) {
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
        $scope.loadEmployers = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.employerUser, function (value) {
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
        $scope.save_btn = false;
        $scope.postProject = function ($valid, projectFrm, data, type) {
            if ($valid && !$scope.error_message) {
                $scope.save_btn = true;
                if (type === 1) {
                    data.project_status_id = ProjectStatusConstant.Draft;
                } else {
                    data.project_status_id = ProjectStatusConstant.PaymentPending;
                }
                if (data.project_range_id === 'Custom Range"') {
                    $scope.custom_range = {};
                }
                if (angular.isDefined(data.skill_select) && Object.keys(data.skill_select)
                    .length > 0) {
                    $scope.seperate_skills = [];
                    angular.forEach(data.skill_select, function (value) {
                       $scope.seperate_skills.push(value.text);
                    });
                   data.skills = $scope.seperate_skills.toString();
                }
                if (angular.isDefined(data.category_select) && Object.keys(data.category_select)
                    .length > 0) {
                    data.project_categories = [];
                    angular.forEach(data.category_select, function (value) {
                        data.project_categories.push({
                            project_category_id: value.id
                        });
                    });
                }
                if (angular.isUndefined(data.user_id)) {
                    data.user_id = ConstUserRole.Admin;
                }
                Projects.post($scope.data, function (response) {
                    var flashMessage;
                    if (parseInt(response.error.code) === 0) {
                        if (type === 1) {
                            flashMessage = $filter("translate")("Project stored in draft successfully.");
                            $state.go('user_dashboard', {
                                'type': 'my_projects',
                                'status': 'draft_payment_pending',
                            });
                        } else {
                            flashMessage = $filter("translate")("Project added successfully.");
                            if (response.total_listing_fee > 0) {
                                $state.go('Bid_ProjectPayment', {
                                    id: response.id,
                                    slug: response.slug
                                });
                            } else {
                                $state.go('Bid_ProjectView', {
                                    id: response.id,
                                    slug: response.slug
                                });
                            }
                        }
                        flash.set(flashMessage, 'success', false);
                    } else {
                        $scope.save_btn = false;
                        if (type === 1) {
                            flashMessage = $filter("translate")("Project stored in draft failed.");
                        } else {
                            flashMessage = $filter("translate")("Project added failed.");
                        }
                        flash.set(flashMessage, 'error', false);
                    }
                }, function (error) {
                    console.log('postProject Error', error);
                });
            } else {
                $timeout(function () {
                    $('.error')
                        .each(function () {
                            if (!$(this)
                                .hasClass('ng-hide')) {
                                $scope.scrollvalidate($(this)
                                    .offset().top-140);
                                return false;
                            }
                        });
                }, 100);
            }
        };
        $scope.scrollvalidate = function (topvalue) {
            $('html, body')
                .animate({
                    'scrollTop': topvalue
                });
        }
        $scope.customRange = function (val) {
            if (parseInt(val) === 0) {
                $scope.show_custom_range = true;
            } else {
                $scope.show_custom_range = false;
            };
        };
        // $scope.is_image_error = false;
        $scope.upload = function (file) {
            // $scope.data = {};
            // if (checkFileFormat(file, FileFormat.project)) {
            // $scope.is_image_error = false;
            Upload.upload({
                url: '/api/v1/attachments?class=Project',
                data: {
                    file: file,
                }
            })
                .then(function (response) {
                    if (response.data.error.code === 0) {
                        $scope.data.image = response.data.attachment;
                        $scope.error_message = '';
                    } else {
                        $scope.error_message = response.data.error.message;
                    }
                });

        };
        $scope.amount_find = true;
        $scope.projectFeatureFeeAdd = function (value) {
            if ($scope.data.is_featured) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        $scope.projectUrgentFeeAdd = function (value) {
            if ($scope.data.is_urgent) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        $scope.projectPrivateFeeAdd = function (value) {
            if ($scope.data.is_private) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        $scope.projectHiddenFeeAdd = function (value) {
            if ($scope.data.is_hidded_bid) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        //}
    })
    .controller('ProjectEditCtrl', function ($scope, $rootScope, $state, $filter, flash, ProjectEditView, ProjectStatus, ProjectSkills, ProjectCategory, ProjectRange, ProjectStatusConstant, md5, $timeout, AutocompleteUsers, ConstUserRole, Upload) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Edit Project");
        //  $scope.data = [];
        $timeout(function () {
            $scope.text_box = true;
        }, 1000);
        $scope.projectRanges = [];
        $scope.projectRangesId = [];
        $scope.OpenForBidding = ProjectStatusConstant.OpenForBidding;
        $scope.PendingApproval = ProjectStatusConstant.PendingForApproval;
        $scope.Draft = ProjectStatusConstant.Draft;
        $scope.paymentPending = ProjectStatusConstant.PaymentPending;
        $scope.projectCustomCheck = 0;
        $scope.PROJECT_TOTAL_FEE = $rootScope.settings.PROJECT_LISTING_FEE;
        $scope.project_bidding_fee = parseInt($rootScope.settings.PROJECT_MAX_BID_DURATION) || 0;
        //  $scope.show_custom_range = false;
        $scope.index = function () {
            var selectedSkill = [];
            var selectedProjectCat = [];
            var params = {
                id: $state.params.id
            };
            if ($state.params.status) {
                params.status = $state.params.status;
            }
            $scope.customRange = function (val) {
                $scope.data.custom_range = {};
                if (parseInt(val) == parseInt($scope.projectCustomCheck)) {
                    $scope.show_custom_range = true;
                    $scope.data.custom_range.min_amount = '';
                } else {
                    $scope.show_custom_range = false;
                    delete $scope.data.custom_range;
                }
            };

            ProjectEditView.get(params, function (response) {
                if (response.data.project_status_id < $scope.OpenForBidding) {
                    if (parseInt(response.error.code) === 0) {
                        // delete response.data.user;
                        $scope.data = {};
                        $scope.data.name = response.data.name;
                        $scope.data.description = response.data.description;
                        $scope.data.bid_duration = response.data.bid_duration;
                        $scope.data.additional_descriptions = response.data.additional_descriptions;
                        $scope.data.project_status_id = response.data.project_status_id;
                        $scope.data.is_featured = response.data.is_featured;
                        $scope.data.is_private = response.data.is_private;
                        $scope.data.is_urgent = response.data.is_urgent;
                        $scope.data.is_hidded_bid = response.data.is_hidded_bid;
                        $scope.data.user_id = response.data.user_id;
                        $scope.data.username = response.data.user.username;
                        $scope.accessCard = {
                            id: response.data.user_id,
                            username: response.data.user.username
                        };
                        //$scope.data.filename = response.data.user.attachment.filename;
                        //  $scope.data.project_range = {};

                        $scope.data.project_range_id = parseInt(response.data.project_range_id);
                        angular.forEach(response.data.skills_projects, function (value) {
                            selectedSkill.push(value.skills.id);
                        });
                        angular.forEach(response.data.projects_project_categories, function (catvalue) {
                            selectedProjectCat.push(catvalue.project_categories.id);
                        });
                        //angular.element('.dropdown-toggle').prop('title', $scope.data.user_id);
                        angular.element(document.getElementsByClassName('btn dropdown-toggle')).prop('title', $scope.data.username);
                        angular.element('.filter-option').text($scope.data.username);
                        skillCategoriesBack();
                        ProjectRange.get(function (response) {
                            if (parseInt(response.error.code) === 0) {
                                $scope.amount_find = true;
                                angular.forEach(response.data, function (value) {
                                    $scope.projectRangesId.push(value.id);
                                    if ($scope.data.project_range_id === value.id) {
                                        $scope.project_range = value.id;
                                    }
                                    $scope.projectRanges.push({
                                        id: value.id,
                                        name: value.name + " " + "(" + $rootScope.settings.CURRENCY_SYMBOL + value.min_amount + " - " + $rootScope.settings.CURRENCY_SYMBOL + +value.max_amount + ")"
                                    });
                                });
                            } else {
                                console.log('Ranges Error');
                            }
                            if ($scope.data.project_range_id === $scope.project_range) {
                                $scope.show_custom_range = false;
                            } else {
                                $scope.show_custom_range = true;
                                $scope.custom_id = 0;
                                $scope.data.project_range_id = 0;
                            }
                        }, function (error) {
                            console.log('projectRanges Error', error);
                        });
                        if ($scope.projectRangesId.indexOf(response.data.project_range_id) > -1) {
                            $scope.data.project_range_id = response.data.project_range_id;
                            delete $scope.data.custom_range;
                        } else {
                            $scope.range = {};
                            $scope.data.custom_range = {};
                            $scope.data.custom_range.min_amount = Number(response.data.project_range.min_amount);
                            $scope.data.custom_range.max_amount = Number(response.data.project_range.max_amount);
                        }
                        if (!$scope.projectRangesId.indexOf($scope.data.project_range_id)) {
                            $scope.projectRanges.push({
                                id: $scope.data.project_range_id,
                                name: "Custom Range"
                            });
                            $scope.projectCustomCheck = $scope.data.project_range_id;
                        } else {
                            $scope.projectRanges.push({
                                id: 0,
                                name: "Custom Range"
                            });
                        }
                        if (angular.isDefined(response.data.attachment)) {
                            if (response.data.attachment !== null) {
                                $scope.project_filename = response.data.attachment.filename;
                                /*      $scope.project_url = 'images/medium_thumb/Project/' + response.data.id + '.' + md5.createHash('Project' + response.data.id + 'png' + 'medium_thumb') + '.png';*/
                            }
                        }
                        /*if ($scope.data.project_status_id >= $scope.OpenForBidding) {
                            flashMessage = $filter("translate")("You can't Edit this project"); 
                            flash.set(flashMessage, 'error', false);
                            $state.go('Bid_MeProjects');
                        }*/
                        //$scope.data.project_range_id = parseInt(response.data.project_range_id);        
                        if ($scope.data.is_featured) {
                            $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt($rootScope.settings.PROJECT_FEATURED_FEE || 0);
                        }
                        if ($scope.data.is_urgent) {
                            $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt($rootScope.settings.PROJECT_URGENT_FEE || 0);
                        }
                        if ($scope.data.is_private) {
                            $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt($rootScope.settings.PROJECT_PRIVATE_PROJECT_FEE || 0);
                        }
                        if ($scope.data.is_hidded_bid) {
                            $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt($rootScope.settings.PROJECT_HIDDEN_BID_FEE || 0);
                        }

                    } else {
                        console.log('Skills Error');
                    }
                } else {
                    $scope.data = {};
                    $scope.data.project_status_id = response.data.project_status_id;
                    $scope.data.name = response.data.name;
                    $scope.data.additional_descriptions = response.data.additional_descriptions;
                    angular.forEach(response.data.skills_projects, function (value) {
                        selectedSkill.push(value.skills.id);
                    });
                    skillCategoriesBack();
                }

            });
            ProjectStatus.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projectStatus = response.data;
                } else {
                    console.log('Status Error');
                }
            }, function (error) {
                console.log('ProjectStatus Error', error);
            });
            function skillCategoriesBack() {
                var params = {};
                params.limit = 'all';
                params.project_id = $state.params.id;
                ProjectSkills.get(params, function (response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.projectSkills = response.data;
                        $scope.projectSkill = [];
                        $scope.data.skill_select = [];
                        angular.forEach($scope.projectSkills, function (value) {
                            $scope.projectSkill.push({
                                id: value.id,
                                text: value.name
                            });
                            if (selectedSkill !== "" && selectedSkill.indexOf(value.id) != -1) {
                                $scope.data.skill_select.push({
                                    id: value.id,
                                    text: value.name
                                });
                            }
                        });
                    } else {
                        console.log('Skills Error');
                    }
                }, function (error) {
                    console.log('Skills Error', error);
                });
                ProjectCategory.get(function (response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.projectCategories = response.data;
                        $scope.projectCat = [];
                        $scope.data.category_select = [];
                        angular.forEach($scope.projectCategories, function (catvalueFinal) {
                            $scope.projectCat.push({
                                id: catvalueFinal.id,
                                text: catvalueFinal.name
                            });
                            if (selectedProjectCat.indexOf(catvalueFinal.id) != -1) {
                                $scope.data.category_select.push({
                                    id: catvalueFinal.id,
                                    text: catvalueFinal.name
                                });
                            }
                        });
                    } else {
                        console.log('Categories Error');
                    }
                }, function (error) {
                    console.log('ProjectCategory Error', error);
                });
                AutocompleteUsers.get(function (response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.employerUser = [];
                        $scope.employerUsers = response.data;
                        $scope.data.user_select = [];
                        angular.forEach($scope.employerUsers, function (value) {
                            $scope.employerUser.push({
                                id: value.id,
                                text: value.username
                            });

                        });
                    } else {
                        console.log('User Error');
                    }
                }, function (error) {
                    console.log('Users Error', error);
                });
            }


        };
        $scope.index();
        $scope.loadCategories = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.projectCat, function (value) {
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
        $scope.loadSkills = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.projectSkill, function (value) {
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
        $scope.loadEmployers = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.employerUser, function (value) {
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
        /*project edit attachment Function */
        $scope.upload = function (file) {
            Upload.upload({
                url: '/api/v1/attachments?class=Project',
                data: {
                    file: file,
                }
            })
                .then(function (response) {
                    if (response.data.error.code === 0) {
                        $scope.data.image = response.data.attachment;
                        $scope.error_message = '';
                    } else {
                        $scope.error_message = response.data.error.message;
                    }
                });
        };

        $scope.save_btn = false;
        $scope.showform = false;
        $scope.postProject = function ($valid, data, type) {
            if ($valid && !$scope.error_message) {
                $scope.showform = true;
                $scope.save_btn = true;
                if (type === 1) {
                    data.project_status_id = ProjectStatusConstant.Draft;
                } else if (type === 2) {
                    data.project_status_id = ProjectStatusConstant.PaymentPending;
                } else {
                    delete data.project_status_id;
                }
                if (data.project_range_id === 'custom') {
                    $scope.custom_range = {};
                }
                if (angular.isDefined(data.skill_select) && Object.keys(data.skill_select)
                    .length > 0) {
                   $scope.seperate_skills = [];
                    angular.forEach(data.skill_select, function (value) {
                       $scope.seperate_skills.push(value.text);
                    });
                   data.skills = $scope.seperate_skills.toString();
                }
                if (angular.isDefined(data.category_select) && Object.keys(data.category_select)
                    .length > 0) {
                    data.project_categories = [];
                    angular.forEach(data.category_select, function (value) {
                        data.project_categories.push({
                            project_category_id: value.id
                        });
                    });
                }
                if (angular.isUndefined(data.user_id)) {
                    data.user_id = ConstUserRole.Admin;
                }
                ProjectEditView.put({ id: $state.params.id }, data, function (response) {
                    var flashMessage;
                    if (parseInt(response.error.code) === 0) {
                        if (type === 1) {
                            flashMessage = $filter("translate")("Project stored in draft successfully.");
                            $state.go('user_dashboard', {
                                'type': 'my_projects',
                                'status': 'draft_payment_pending',
                            });
                        }
                        else {
                            flashMessage = $filter("translate")("Project updated successfully.");
                            if (response.total_listing_fee > 0 && (response.project_status_id != $scope.OpenForBidding && response.project_status_id != $scope.PendingApproval)) {
                                $state.go('Bid_ProjectPayment', {
                                    id: response.id,
                                    slug: response.slug
                                });
                            } else if (response.project_status_id == $scope.OpenForBidding) {
                                flashMessage = $filter("translate")("Project updated successfully.");
                                $state.go('Bid_ProjectView', {
                                    id: response.id,
                                    slug: response.slug
                                });
                            } else if (response.project_status_id == $scope.PendingApproval) {
                                flashMessage = $filter("translate")("Project updated successfully.");
                                $state.go('user_dashboard', {
                                    'type': 'my_projects',
                                    'status': 'open_bidding',
                                });
                            } else {
                                $state.go('Bid_ProjectView', {
                                    id: response.id,
                                    slug: response.slug
                                });
                            }
                        }
                        flash.set(flashMessage, 'success', false);
                    } else {
                        if (type === 1) {
                            flashMessage = $filter("translate")("Project stored in draft failed.");
                            $state.go('Bid_Projects');
                        } else {
                            flashMessage = $filter("translate")("Project update failed.");
                        }
                        flash.set(flashMessage, 'error', false);
                    }
                }, function (error) {
                    console.log('postProject Error', error);
                });
            } else {
                $timeout(function () {
                    $('.error')
                        .each(function () {
                            if (!$(this)
                                .hasClass('ng-hide')) {
                                $scope.scrollvalidate($(this)
                                     .offset().top-140);
                                return false;
                            }
                        });
                }, 100);
            }
        };
        $scope.scrollvalidate = function (topvalue) {
            $('html, body')
                .animate({
                    'scrollTop': topvalue
                });
        };
        $scope.projectFeatureFeeAdd = function (value) {
            $scope.amount_find = true;
            if ($scope.data.is_featured) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        $scope.projectUrgentFeeAdd = function (value) {
            if ($scope.data.is_urgent) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        $scope.projectPrivateFeeAdd = function (value) {
            if ($scope.data.is_private) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
        $scope.projectHiddenFeeAdd = function (value) {
            if ($scope.data.is_hidded_bid) {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) + parseInt(value || 0);
                }, 100);
            } else {
                $scope.amount_find = false;
                $timeout(function () {
                    $scope.amount_find = true;
                    $scope.PROJECT_TOTAL_FEE = parseInt($scope.PROJECT_TOTAL_FEE || 0) - parseInt(value || 0);
                }, 100);
            }
        };
    })

    .controller('ProjectsListCtrl', function ($scope, $rootScope, $state, $filter, $location, flash, Projects, ProjectStatus, ProjectSkills, ProjectCategory, ProjectStatusConstant, $stateParams) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Browse Projects");
        // $scope.q = $stateParams.q;
        $scope.data = [];
        $scope.priceSlider = 150;
        $scope.params = {};
        $scope.sortby = $scope.params.sortby = 'desc';
        $scope.created_at = 'down';
        $scope.OpenForBidding = ProjectStatusConstant.OpenForBidding;
        $scope.bookmarked = true;
        $scope.data = {
            q: $state.params.q,
            project_categories: $state.params.categories,
            skills: $state.params.skills,
            price_range_min: $state.params.price_range_min,
            price_range_max: $state.params.price_range_max,
            project_status_id: $scope.OpenForBidding,
            page: ($scope.currentPage !== undefined) ? $scope.currentPage : 1
        };
        $scope.orderPosted = function (sortby) {
            $scope.params.sort = 'created_at';
            $scope.params.sortby = sortby;
            if (sortby === 'asc') {
                $scope.created_at = 'down';
            }
            $scope.index($scope.params);
            $scope.sortby = 'desc';
            if (sortby === 'desc') {
                $scope.sortby = 'asc';
                $scope.created_at = 'up';
            }
        };
        if ($state.params.type == 'bookmarked') {
            $scope.type = 'bookmarked';
            $scope.bookmarked = false;
            $scope.skill = false;
        }
        else if ($state.params.type == 'my_skills') {
            $scope.type = 'my_skills';
            $scope.bookmarked = false;
            $scope.skill = true;
        }
        else {
            $scope.type = 'price_range';
            $scope.bookmarked = true;
        }
        $scope.index = function (params) {
            $scope.slider = {};
            $scope.getProjects();
            $scope.loader = true;
            Projects.get({
                type: $scope.type
            }, function (response) {
                if (angular.isDefined(response.data)) {
                    $scope.minimum_price = response.data.min_price;
                    $scope.maximum_price = response.data.max_price;
                    /*  if min price && max price null hardcode set 0 to 1000 */
                    if (response.data.min_price == null && response.data.max_price == null) {
                        $scope.min_price = 0;
                        $scope.max_price = 1000;
                    } else if (response.data.min_price != null && response.data.max_price != null) {
                        $scope.min_price = $scope.minimum_price,
                            $scope.max_price = $scope.maximum_price;
                    }
                    if (angular.isDefined($state.params.price_range_min) && angular.isDefined($state.params.price_range_max)) {
                        $scope.min_price = $state.params.price_range_min;
                        $scope.max_price = $state.params.price_range_max;
                    }
                    /*  if min price && max price null hardcode set 0 to 1000 */
                    if (response.data.min_price == null && response.data.max_price == null) {
                        $scope.slider = {
                            min: $scope.min_price,
                            max: $scope.max_price,
                            options: {
                                floor: parseInt($scope.min_price),
                                ceil: parseInt($scope.max_price)
                            }
                        }

                    } else if (response.data.min_price != null && response.data.max_price != null && $stateParams.price_range_max === undefined && $stateParams.price_range_max === undefined) {
                        $scope.slider = {
                            min: $scope.minimum_price,
                            max: $scope.maximum_price,
                            options: {
                                floor: parseInt(response.data.min_price),
                                ceil: parseInt(response.data.max_price)
                            }
                        };
                    } else {
                        $scope.slider = {
                            min: $stateParams.price_range_min,
                            max: $stateParams.price_range_max,
                            options: {
                                floor: parseInt(response.data.min_price),
                                ceil: parseInt(response.data.max_price)
                            }
                        };
                    }
                }
            });
        };
        $scope.loader = true;
        $scope.getProjects = function () {
            var params = {};
            if ($stateParams.q != undefined) {
                params.q = $stateParams.q;
            }
            if ($stateParams.project_categories != undefined) {
                params.project_categories = $stateParams.project_categories;
            }
            if ($stateParams.skills != undefined) {
                params.skills = $stateParams.skills;
            }
            if ($stateParams.price_range_max != undefined) {
                params.price_range_max = $stateParams.price_range_max;
            }
            if ($stateParams.price_range_min != undefined) {
                params.price_range_min = $stateParams.price_range_min;
            }
            if ($state.params.type === 'bookmarked') {
                params.type = 'bookmarked';
                $scope.bookmarked = false;
            }
            if ($state.params.type === 'my_skills') {
                params.type = 'my_skills';
                $scope.bookmarked = false;
            }
            if($state.params.page === undefined)
            {
                params.page = 1;
            }else{
                params.page = $state.params.page;
            }  
            Projects.get(params, function (response) {
                   $scope.loader = false;
                if (angular.isDefined(response._metadata)) {
                    $scope.currentPage = response._metadata.current_page;
                    $scope.totalItems = response._metadata.total;
                    $scope.itemsPerPage = response._metadata.per_page;
                    $scope.noOfPages = response._metadata.last_page;
                }
                if (angular.isDefined(response.data)) {
                    $scope.projects = response.data;
                } else {
                    $scope.projects = "";
                    $scope.errorMessage = "";
                    if (angular.isDefined(response.error)) {
                        $scope.errorMessage = response.error.message;
                    }
                    $scope.currentPage = 0;
                    $scope.totalItems = 0;
                    $scope.itemsPerPage = 0;
                    $scope.noOfPages = 0;
                }
            });
        };
        $scope.loader = false;
        ProjectCategory.get(function (response) {
            if (parseInt(response.error.code) === 0) {
                $scope.projectCategories = response.data;
                $scope.projectCat = [];
                $scope.data.category_select = [];
                var selectedProjectCat = "";
                if (angular.isDefined($state.params.project_categories)) {
                    selectedProjectCat = $state.params.project_categories.split(',');
                }
                angular.forEach($scope.projectCategories, function (value) {
                    $scope.projectCat.push({
                        id: value.id,
                        text: value.name
                    });
                    if (selectedProjectCat !== "" && selectedProjectCat.indexOf(value.id.toString()) != -1) {
                        $scope.data.category_select.push({
                            id: value.id,
                            text: value.name
                        });
                    }
                });
            } else {
                console.log('Categories Error');
            }
        }, function (error) {
            console.log('ProjectCategory Error', error);
        });
        $scope.loadCategories = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.projectCat, function (value) {
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
        var params = {};
        params.limit = 'all';
        ProjectSkills.get(params, function (response) {
            if (parseInt(response.error.code) === 0) {
                $scope.projectSkill = [];
                $scope.projectSkills = response.data;
                $scope.data.skill_select = [];
                var selectedSkill = "";
                if (angular.isDefined($state.params.skills)) {
                    selectedSkill = $state.params.skills.split(',');
                }
                angular.forEach($scope.projectSkills, function (value) {
                    $scope.projectSkill.push({
                        id: value.id,
                        text: value.name
                    });
                    if (selectedSkill !== "" && selectedSkill.indexOf(value.id.toString()) != -1) {
                        $scope.data.skill_select.push({
                            id: value.id,
                            text: value.name
                        });
                    }
                });
            } else {
                console.log('Skills Error');
            }
        }, function (error) {
            console.log('Skills Error', error);
        });
        $scope.loadSkills = function (qstr) {
            qstr = qstr.toLowerCase();
            var items = [];
            angular.forEach($scope.projectSkill, function (value) {
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
        /**
         * Refine Search Project Listing
         */
        $scope.refinesearch = function (data) {
            if (angular.isDefined(data.skill_select) && Object.keys(data.skill_select)
                .length > 0) {
                var skills = [];
                angular.forEach(data.skill_select, function (value) {
                    skills.push(value.id);
                });
                data.skills = skills.toString();
            }
            if (angular.isDefined(data.category_select) && Object.keys(data.category_select)
                .length > 0) {
                var categories = [];
                angular.forEach(data.category_select, function (value) {
                    categories.push(value.id);
                });
                data.categories = categories.toString();
            }
            $scope.params = {
                q: data.q,
                project_categories: data.categories,
                skills: data.skills,
                price_range_min: $scope.slider.min,
                price_range_max: $scope.slider.max
            };
            $state.go('Bid_Projects', $scope.params);
        };
        /**
         * @ngdoc method
         * @name projectController.job
         * @methodOf module.projectController
         * @description
         * This method is used to get the project listings
         */
         $scope.paginate = function() {
            $scope.currentPage = parseInt($scope.currentPage);
             $state.go('Bid_Projects', {
                    'page': $scope.currentPage,
                });
             $scope.getProjects();
        };
        $scope.index();
    })
    .controller('ProjectViewCtrl', function ($scope, $rootScope, $state, $filter, $cookies, flash, ProjectEditView, ProjectStatusConstant, BidStatusConstant, SweetAlert, md5, $window, FollowUser, FollowUserDelete, $timeout, $uibModal, $uibModalStack) {

        $scope.ProjectStatusConstant = ProjectStatusConstant;
    /*    $scope.auth = JSON.parse($cookies.get('auth'));*/
        $scope.isprojectcancel = false;
        $scope.is_show_follow = false;
        $rootScope.projectlike = {};
        $scope.rating_value = 0;
        $scope.getProjectDetails = function () {
            ProjectEditView.get({
                id: $state.params.id,
                type : 'view'
            }, function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.show_response_page = true;
                    $scope.project = response.data;
                    $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Project") + ' ' + '-' + ' ' + $scope.project.name;
                    /* for project user image */
                    if (angular.isDefined($scope.project.user.attachment) && $scope.project.user.attachment !== null) {
                        $scope.project.user.user_avatar_url = 'images/large_thumb/UserAvatar/' + $scope.project.user.id + '.' + md5.createHash('UserAvatar' + $scope.project.user.id + 'png' + 'large_thumb') + '.png';
                    } else {
                        $scope.project.user.user_avatar_url = 'images/default.png';
                    }
                    if (angular.isDefined($scope.project.follower) && $scope.project.follower.length > 0) {
                        angular.forEach($scope.project.follower, function (follower) {
                            $rootScope.book_id = follower.id;
                        });
                        $scope.is_book = true;
                    } else {
                        $scope.is_book = false;
                    }
                    /* For Create a projcet like concept */
                    var skillsList = [];
                    angular.forEach($scope.project.skills_projects, function (value) {
                        skillsList.push(value.skills.id);
                    });
                    $rootScope.projectlike.skills = skillsList;
                    var categoriesList = [];
                    angular.forEach($scope.project.projects_project_categories, function (value) {
                        categoriesList.push(parseInt(value.project_category_id));
                    });
                    $rootScope.projectlike.categories = categoriesList;
                    /* For the purpose of project cancel status */
                    if ($scope.project.is_cancel_request_freelancer || $scope.project.is_cancel_request_employer) {
                        $scope.isprojectcancel = true;
                            $rootScope.broadCastDataempolyer = {
                                notes: $scope.project.mutual_cancel_note,
                            }  
                            $rootScope.broadCastDatafreelancer = {
                                notes: $scope.project.mutual_cancel_note,
                            }  
                           /* empolyer*/
                            $scope.is_freelancer = false;
                            $rootScope.broadCastDatafreelancer.is_show_accept = (!$scope.is_freelancer && $scope.project.is_cancel_request_employer) ? false : true;
                            $rootScope.broadCastDatafreelancer.userinfo = $scope.project.project_bid.user.username;
                            $rootScope.broadCastDatafreelancer.userImage = $scope.project.bid_winner.user.attachment;
                            $rootScope.broadCastDatafreelancer.userId = $scope.project.project_bid.user.id;
                            $rootScope.broadCastDatafreelancer.createdAt = $scope.project.created_at;

                          /*  freelancer*/
                            $scope.is_freelancer = true;
                            $rootScope.broadCastDataempolyer.is_show_accept = ($scope.is_freelancer && $scope.project.is_cancel_request_freelancer) ? false : true;
                            $rootScope.broadCastDataempolyer.userinfo = $scope.project.user.username;
                            $rootScope.broadCastDataempolyer.userImage = $scope.project.user.attachment;
                            $rootScope.broadCastDataempolyer.userId = $scope.project.user.id;
                            $rootScope.broadCastDataempolyer.createdAt = $scope.project.created_at;
                       /* $timeout(function () {
                            $scope.$broadcast('mutualcancel', broadCastData);
                        }, 3000);*/
                    }
                    if (parseInt($rootScope.user.id) === parseInt(response.data.user_id)) {
                        $scope.project_user = true;
                    } else {
                        $scope.project_user = false;
                        if (angular.isDefined($scope.project.owner_bid) && ($scope.project.owner_bid !== null)){
                            if(Object.keys($scope.project.owner_bid.length > 0)){
                                 $scope.is_already_bidded = true;
                            }
                        } else {
                            $scope.is_already_bidded = false;
                        }
                        if ($state.params.edit !== undefined) {
                            $scope.is_already_bidded = false;
                            $scope.is_bid_edit = true;
                        }
                    }
                    /* For the purpose of status shown */
                    if (parseInt($scope.project.project_status_id) > $scope.ProjectStatusConstant.OpenForBidding) {
                        if (parseInt($rootScope.user.id) === parseInt($scope.project.freelancer_user_id)) {
                            $scope.bid_lost = false;
                        } else {
                            $scope.bid_lost = true;
                        }
                    }
                    /* For the purpose to hide the bid lost */
                    var listbroadcastData = {
                        is_show_lost: (parseInt($rootScope.user.id) === parseInt($scope.project.freelancer_user_id) || parseInt($rootScope.user.id) === parseInt($scope.project.user_id)) ? false : true
                    }
                    var isbookshow = {
                        projectid: $scope.project.id,
                        isbook: $scope.is_book
                    }
                    $timeout(function () {
                        $scope.$broadcast('showlostbids', listbroadcastData);
                        $scope.$broadcast('showisbook', isbookshow);
                        $scope.projectbidcount = response.data.project_bid.bid_count;
                    }, 2000)
                }
            }, function (error) {
                console.log(error);
            });
        }

        $scope.getProjectDetails();

        $scope.closeInstance = function () {
            $uibModalStack.dismissAll();
        };

        $scope.follow = function () {
            var flashMessage = "";
            if (Object.keys($scope.project.user.follower)
                .length > 0) {
                FollowUserDelete.delete({
                    id: $scope.project.user.follower[0]['id']
                }, function (response) {
                    if (response.error.code === 0) {
                        flashMessage = $filter("translate")("Unfollowed successfully");
                        flash.set(flashMessage, 'success', false);
                        $scope.followBtn = "Follow";
                        $scope.getProjectDetails();
                    } else {
                        flashMessage = $filter("translate")("Could not unfollow");
                        flash.set(flashMessage, 'error', false);
                    }
                })
            } else {
                FollowUser.post({
                    foreign_id: $scope.project.user_id,
                    class: "User"
                }, function (response) {
                    if (response.error.code === 0) {
                        flashMessage = $filter("translate")("Followed successfully.");
                        flash.set(flashMessage, 'success', false);
                        $scope.getProjectDetails();
                        $scope.followBtn = "Unfollow";
                    } else {
                        flashMessage = $filter("translate")(response.error.message);
                        flash.set(flashMessage, 'error', false);
                    }
                });
            }
        };
        /* For show the follow button only the freelancer if they awarded the bid */
        $scope.$on('is_show_follow', function (event, data) {
            if (data === 'showfollow') {
                $scope.followBtn = "Follow";
                if (Object.keys($scope.project.user.follower)
                    .length > 0) {
                    $scope.followBtn = "Unfollow";
                }
                $scope.is_show_follow = true;
            }
        });
    })
    .controller('MyProjectsCtrl', function ($scope, $rootScope, $state, $filter, flash, MyProjects, SweetAlert, DelProject, ProjectStatus, ProjectStatusConstant, ProjectStatusUpdate) {
        $scope.projectConstant = ProjectStatusConstant;
        /* Project Status Get Function*/
        $scope.index = function () {
            $scope.GetProjectStatus();
        }
        $scope.GetProjectStatus = function () {
            ProjectStatus.get(function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projectStatus = response.data;
                }
            }, function (error) {
                console.log(error);
            });
        };
        $scope.getProjects = function (tabType) {
            if (tabType === 2) {
                if ($state.params.status === undefined || $state.params.status !== 'payment_pending') {
                    $state.go('Bid_MeProjects', {
                        status: 'payment_pending'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 1) {
                if ($state.params.status === undefined || $state.params.status !== 'draft') {
                    $state.go('Bid_MeProjects', {
                        status: 'draft'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 3) {
                if ($state.params.status === undefined || $state.params.status !== 'pending_approval') {
                    $state.go('Bid_MeProjects', {
                        status: 'pending_approval'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 4) {
                if ($state.params.status === undefined || $state.params.status !== 'open_bidding') {
                    $state.go('Bid_MeProjects', {
                        status: 'open_bidding'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 5) {
                if ($state.params.status === undefined || $state.params.status !== 'close_expiry') {
                    $state.go('Bid_MeProjects', {
                        status: 'close_expiry'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 6) {
                if ($state.params.status === undefined || $state.params.status !== 'winner_selected') {
                    $state.go('Bid_MeProjects', {
                        status: 'winner_selected'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 11) {
                if ($state.params.status === undefined || $state.params.status !== 'under_development') {
                    $state.go('Bid_MeProjects', {
                        status: 'under_development'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 14) {
                if ($state.params.status === undefined || $state.params.status !== 'final_review') {
                    $state.go('Bid_MeProjects', {
                        status: 'final_review'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 16) {
                if ($state.params.status === undefined || $state.params.status !== 'closed') {
                    $state.go('Bid_MeProjects', {
                        status: 'closed'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 13) {
                if ($state.params.status === undefined || $state.params.status !== 'admin_cancel') {
                    $state.go('Bid_MeProjects', {
                        status: 'admin_cancel'
                    }, {
                            notify: false
                        });
                }
            } else if (tabType === 12) {
                if ($state.params.status === undefined || $state.params.status !== 'cancel') {
                    $state.go('Bid_MeProjects', {
                        status: 'cancel'
                    }, {
                            notify: false
                        });
                }
            } else {
                if ($state.params.status === undefined || $state.params.status !== 'payment_pending') {
                    $state.go('Bid_MeProjects', {
                        status: 'payment_pending'
                    }, {
                            notify: false
                        });
                }
            }
            if (parseInt(tabType) === 1) {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Open Project");
            } else if (parseInt(tabType) === 2) {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Work in Progress");
            } else {
                $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Past Project");
            }
            $scope.params = {
                project_status_id: tabType
            };
            $scope.StatusFilter = function (id) {
                $scope.params = {
                    project_status_id: id
                }
            }
            MyProjects.get($scope.params, function (response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.projects = response.data;
                }
            }, function (error) {
                console.log(error);
            });
        };
        if ($state.params.status) {
            if ($state.params.status === 'draft') {
                $scope.activeStatus = 1;
                $scope.getProjects(1);
            } else if ($state.params.status === 'pending_approval') {
                $scope.activeStatus = 2;
                $scope.getProjects(3);
            } else if ($state.params.status === 'open_bidding') {
                $scope.activeStatus = 3;
                $scope.getProjects(4);
            } else if ($state.params.status === 'close_expiry') {
                $scope.activeStatus = 4;
                $scope.getProjects(5);
            } else if ($state.params.status === 'winner_selected') {
                $scope.activeStatus = 5;
                $scope.getProjects(6);
            } else if ($state.params.status === 'under_development') {
                $scope.activeStatus = 6;
                $scope.getProjects(11);
            } else if ($state.params.status === 'final_review') {
                $scope.activeStatus = 7;
                $scope.getProjects(14);
            } else if ($state.params.status === 'closed') {
                $scope.activeStatus = 8;
                $scope.getProjects(16);
            } else if ($state.params.status === 'admin_cancel') {
                $scope.activeStatus = 9;
                $scope.getProjects(13);
            } else if ($state.params.status === 'cancel') {
                $scope.activeStatus = 10;
                $scope.getProjects(10);
            } else {
                $scope.activeStatus = 0;
                $scope.getProjects(2);
            }
        } else {
            $scope.getProjects(2);
        }
        $scope.deleteProject = function (project_id) {
            SweetAlert.swal({
                title: $filter("translate")("Are you sure you want to delete?"),
                text: "",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel!",
                closeOnConfirm: true,
                animation: false,
            }, function (isConfirm) {
                DelProject.delete({
                    id: project_id
                }, function (response) {
                    if (response.error.code === 0) {
                        flashMessage = $filter("translate")("Your project has been deleted successfully.");
                        flash.set(flashMessage, 'success', false);
                        $state.reload();
                    } else {
                        flashMessage = $filter("translate")("Your project couldn't deleted. Please try again.");
                        flash.set(flashMessage, 'error', false);
                        $state.reload();
                    }
                });
            });
        };
        $scope.cancelProject = function (project_id) {
            SweetAlert.swal({
                title: $filter("translate")("Are you sure you want to cancel this project?"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                closeOnConfirm: true,
                animation: false,
            }, function (isConfirm) {
                ProjectStatusUpdate.put({
                    id: project_id,
                    project_status_id: $scope.projectConstant.EmployerCanceled
                }, function (response) {
                    if (response.error.code === 0) {
                        flashMessage = $filter("translate")("Your project has been cancelled successfully.");
                        flash.set(flashMessage, 'success', false);
                        $state.reload();
                    } else {
                        flashMessage = $filter("translate")("Your project couldn't cancelled. Please try again.");
                        flash.set(flashMessage, 'error', false);
                        $state.reload();
                    }
                });
            });
        };
        $scope.index();
    })    