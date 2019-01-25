'use strict';
/**
 * @ngdoc  service
 * @name getlancerApp.examController
 * @description
 * # ExamListCtrl
 * Factory in the  getlancerApp
 */
angular.module('getlancerApp.Bidding.Exam')
    /*Exam list controller */
    .controller('ExamListCtrl', function($scope, $rootScope, $state, $filter, $location, flash, Exams, md5) {
        $rootScope.header = $rootScope.settings.SITE_NAME + ' | ' + $filter("translate")("Skills Lab");
        $scope.params = {};
        if ($state.params.q !== undefined) {
            $scope.params.q = $state.params.q;
        }
        $scope.index = function() {
            $scope.loader = true;
            $scope.params.limit = 21;
            $scope.params.page = $scope.currentPage;
            Exams.get($scope.params, function(response) {
                if (parseInt(response.error.code) === 0) {
                    if (angular.isDefined(response._metadata)) {
                        $scope.currentPage = response._metadata.current_page;
                        $scope.totalItems = response._metadata.total;
                        $scope.itemsPerPage = response._metadata.per_page;
                        $scope.noOfPages = response._metadata.last_page;
                    }
                    if (angular.isDefined(response.data)) {
                        $scope.exams = response.data;
						/* Here need to check the attachment single or multiple concept */
						angular.forEach($scope.exams, function(value) {
							if (angular.isDefined(value.attachment) && value.attachment != null) {
									value.logo_url = 'images/small_normal_thumb/' + value.attachment.class + '/' + value.attachment.foreign_id + '.' + md5.createHash(value.attachment.class + value.attachment.foreign_id + 'png' + 'small_normal_thumb') + '.png';
								} else {
									value.logo_url = 'images/no-image.png';
							} 
                        });

                    } else {
                        $scope.exams = "";
                        $scope.errorMessage = "";
                        if (angular.isDefined(response.error)) {
                            $scope.errorMessage = response.error.message;
                        }
                        $scope.currentPage = 0;
                        $scope.totalItems = 0;
                        $scope.itemsPerPage = 0;
                        $scope.noOfPages = 0;
                    }
                }
            }, function(error) {
                console.log('Exam Get', error);
            })
            $scope.loader = false;
        };
        $scope.refinesearch = function(qVal) {
            if (qVal) {
                $scope.params.q = qVal;
                $state.go('Exam', {
                    q: qVal
                });
            } else {
                $state.go('Exam');
            }
        }
        $scope.paginate = function() {
            $scope.currentPage = parseInt($scope.currentPage);
            $scope.index();
        };
        $scope.index();
    })
    /*Exam View Controller*/

    .controller('ExamViewCtrl', function($scope, $rootScope, $state, $filter, $location, flash, ExamsView, PerDayExam, ExamStatus, ExamUser, md5, $cookies) {
        $scope.PerDayLimit = PerDayExam.NumOfTime;
		$scope.ExamStatus = ExamStatus;
		var flashMessage = "";
		var params = {};
        ExamsView.get({
            id: $state.params.id
        }, function(response) {
            if (parseInt(response.error.code) === 0) {
                 $scope.show_response_page = true;
                $scope.examValue = response.data;
                $scope.str = $scope.examValue.instructions.replace("##QUESTION_COUNT##", $scope.examValue.exams_question_count)
                    .replace("##EXAM_DURATION##", $scope.examValue.duration);
                $scope.topics_covered = $scope.examValue.topics_covered;                    
                    if (angular.isDefined($scope.examValue.attachment)) {
                    if ($scope.examValue.attachment !== null) {
                        $scope.examValue.logo_url = 'images/big_thumb/'+ $scope.examValue.attachment.class + '/'+ $scope.examValue.attachment.foreign_id + '.' + md5.createHash($scope.examValue.attachment.class + $scope.examValue.attachment.foreign_id + 'png' + 'big_thumb') + '.png';
                    } else {
                        $scope.examValue.logo_url = 'images/no-image.png';
                    }
                } 

				/*exam users count*/
				var noAttempt = 0;
				var passedCount = 0;
				var Inprogress = 0;
				var Incomplete = 0;
				var FeePaidOrNotStarted = 0;
				var SuspendedDueToTakingOvertime = 0;
				var Failed = 0;
				angular.forEach($scope.examValue.ExamsUser, function (value) {
						noAttempt += value.no_of_times;
						if (value.exam_status_id == ExamStatus.Passed) {
							passedCount += 1;
						} else if (value.exam_status_id == ExamStatus.Inprogress) {
							Inprogress += 1;
						} else if (value.exam_status_id == ExamStatus.Incomplete) {
							Incomplete += 1;
						} else if (value.exam_status_id == ExamStatus.FeePaidOrNotStarted) {
							FeePaidOrNotStarted += 1;
						} else if (value.exam_status_id == ExamStatus.SuspendedDueToTakingOvertime) {
							SuspendedDueToTakingOvertime += 1;
						} else if (value.exam_status_id == ExamStatus.Failed) {
							Failed += 1;
						}
					
				});
				$scope.passedCount = passedCount;
				$scope.Inprogress = Inprogress;
				$scope.Incomplete = Incomplete;
				$scope.FeePaidOrNotStarted = FeePaidOrNotStarted;
				$scope.SuspendedDueToTakingOvertime = SuspendedDueToTakingOvertime;
				$scope.Failed = Failed;
				$scope.examAttempts = noAttempt;
				
				/*parent exam users count*/
				var parentpassCount = 0;
                    if($scope.examValue.parent.length !== 0)
                    {
                        angular.forEach($scope.examValue.parent[0].parent_exams_users, function (parentvalue) {
                            if (parentvalue.exam_status_id == ExamStatus.Passed) {
                                    parentpassCount += 1;
                                } 
                        });
                        $scope.parentpassCount = parentpassCount;
                    }  
		    }
        }, function(error) {});
		/*
		-Exam Users function
		-Exam id as param
		*/
		$scope.exam_users = function(value) {
            params.exam_id = value;
            $cookies.put('exam_id', JSON.stringify(value));
			ExamUser.post(params, function(response) {
				if (response.error.code === 0) {
					if(response.data.exam_status_id == ExamStatus.ExamFeePaymentPending) {
						$rootScope.exam_id = response.data.exam_id;
						$state.go('Exam_Payment',{id:response.data.id},{reload:true});
					} else if(response.data.exam_status_id == ExamStatus.FeePaidOrNotStarted) {
						$state.go('ExamStart',{id:response.data.id},{reload:true});
					}
				} else {
					flashMessage = $filter("translate")(response.error.message);
					flash.set(flashMessage, 'error', false);
				}
           });
		};
    })
   /* Exam View Controller End*/

    /*Exam start Controller*/
    .controller('ExamStartController', function($scope, $rootScope, $state, $filter, $location, flash, ExamStart, $window) {
        ExamStart.get({
            id: $state.params.id
        }, function(response) {
            if (parseInt(response.error.code) === 0) {
                $scope.exam_start = response.data;
                $scope.str = $scope.exam_start.exam.splash_content.replace("##QUESTION_COUNT##", $scope.exam_start.exam.exams_question_count)
                    .replace("##EXAM_DURATION##", $scope.exam_start.exam.duration);
            }
        }, function(error) {});
        $scope.examStart = function(examId) {
            $state.go('OnlineTest', {
                id: examId
            });
        }
    })
    
    /* My Exam Controller*/
    .controller('MyExamController', function($scope, $rootScope, $state, $filter, $location, flash, MyExam, $window) {
        function index() {
            $scope.id = $state.current.name == 'MyExams' ? 4 : 3;
            MyExam.get({
                exam_status_id: $scope.id
            }, function(response) {
                if (parseInt(response.error.code) === 0) {
                    $scope.myExams = response.data;
                }
            }, function(error) {});
        }
        index();
        $scope.filter = function(value) {
            if (parseInt(value) === 3) {
                $state.go('ExamCertified');
            } else {
                $state.go('MyExams');
            }
        }
    })
    /* Exam online Test controller*/
    .controller('ExamOnlineTestCtrl', function($scope, $rootScope, $state, $filter, $location, flash, ExamStart, $cookies, QuestionAnswer, $timeout, $interval, $window) {
        var params = {};
		$scope.startautoCall = 0;
		$scope.stopautoCall = 0;
        $scope.questionAnswer = [];
        $scope.tmp_skills = [];
        var flashMessage = "";
        $scope.milisecondsDiff = 0;
        $scope.currentPage = ($cookies.get('exampage') !== undefined) ? parseInt($cookies.get('exampage')) : 0;
        if ($scope.currentPage === 0) {
            $cookies.put('exampage', 0, {
                path: '/'
            });
        } else {
            $scope.is_show_previous = true;
        }
        /* For assing the temp values from cookies */
        if ($cookies.get('examValue') !== undefined) {
            $scope.tmp_skills = JSON.parse($cookies.get('examValue'));
        }
        if (parseInt($scope.currentPage) < 9) {
            $scope.is_show_next = true;
        } else {
            $scope.is_show_next = false;
        }
        ExamStart.get({
            id: $state.params.id,
            is_exam_started: 1
        }, function(response) {
            if (parseInt(response.error.code) === 0) {
                $scope.exam_data = response.data;
                $timeout(function() {
                    $scope.accessTimeOut = true;
                }, 1000);
                $scope.intervalFunction();
                $scope.callfailure = false;
                var suffleindex = [];
		        $scope.questionArray = shuffle($scope.exam_data.Question);
            }else{
                flashMessage = $filter("translate")(response.error.message);
                flash.set(flashMessage, 'error', false);
                $state.go('Exam');
            }

            function shuffle(array) {
               if($scope.exam_data)
                {
                if ($scope.exam_data.exam_status_id === 1) {
                    var currentIndex = array.length,
                        temporaryValue, randomIndex;
					// While there remain elements to shuffle...
                    while (0 !== currentIndex) {
                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;
                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                } else {
                    var currentIndex = array.length,
                        temporaryValue;
					while (0 !== currentIndex) {
                        randomIndex = Math.floor(currentIndex);
                        currentIndex -= 0;
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }
                    return array;
                }
                }
			
            }
            if($scope.exam_data)
            {
                if ($scope.exam_data.exam_status_id === 1) {
                    //$scope.milisecondsDiff = $scope.exam_data.allow_duration * 60000;
                    $scope.milisecondsDiff = ($scope.exam_data.allow_duration-$scope.exam_data.taken_time) * 60000;
                } else {
                    $scope.milisecondsDiff = $window.localStorage.getTime;
                    $window.localStorage.removeItem('getTime');
                }
            }
            
            $timeout(function() {
                $scope.timerStop = false;
                if ($scope.timerStop === true) {
                    flashMessage = $filter("translate")("Your time is out");
                    flash.set(flashMessage, 'success', false);
                  }
                    $scope.answercall = {};
                    $scope.answercall.user_answer =  $scope.user_answer;
                    $scope.answercall.exams_user_id = parseInt($state.params.id);
                    $scope.answercall.is_exam_completed = 1;
                QuestionAnswer.post($scope.answercall, function(response) {
                    if (response.error.code === 0) {
                        flashMessage = $filter("translate")("Your exam is successfully completed");
                        flash.set(flashMessage, 'success', false);
						$scope.stopautoCall = 1;
                        $state.go('ExamResult', {
                            id: $state.params.id
                        });
                    } else {
                        flashMessage = $filter("translate")(response.error.message);
                        flash.set(flashMessage, 'error', false);
                    }
                });
            }, $scope.milisecondsDiff);
            $scope.timerStop = true;
            $scope.timerId = $interval(function() {
                if ($scope.timerStop === true) {
                    if ($scope.milisecondsDiff <= 0) {
                        //clearTimeout($scope.timerId);
                    } else {
                        $scope.timeLeft = $scope.getRemainTimeFormat($scope.milisecondsDiff);
                        $('.js-time-display')
                            .html($scope.timeLeft + '');
                        $scope.milisecondsDiff = $scope.milisecondsDiff - 1000;
                    }
                }
            }, 1000);
        }, function(error) {
            console.log(error);
        });
        /* Reload Page Function*/
        // window.onbeforeunload = function(event) {
        //     var message = 'Sure you want to leave?';
        //     if (typeof event == 'undefined') {
        //         event = window.event;
        //     }
        //     if (event) {
        //         event.returnValue = message;
        //     }
        //     return message;
        // }
        window.onbeforeunload = function(event) {
            var hms = $scope.timeLeft;
            var a = hms.split(':');
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            $scope.timevalue = seconds * 1000;
            $scope.reloadresponse = $scope.timevalue;
            var message = 'Sure you want to leave?';
            if (typeof event == 'undefined') {
                event = window.event;
            }
            if (event) {
                event.returnValue = message;
            }
            return message;
        }
    
        /* Prev next */
        $scope.prevQuestion = function() {
            if (Object.keys($scope.questionArray)
                .length > 0) {
                $scope.currentPage = (parseInt($scope.currentPage) - 1 === 0) ? 0 : parseInt($scope.currentPage) - 1;
                $cookies.put('exampage', $scope.currentPage, {
                    path: '/'
                });
                if (parseInt($scope.currentPage) === 0) {
                    $scope.is_show_previous = false;
                    $scope.is_show_next = true;
                } else {
                    $scope.is_show_next = true;
                    $scope.is_show_previous = true;
                }
            }
        };
        $scope.nextQuestion = function() {
            if (Object.keys($scope.questionArray)
                .length > 0) {
                $scope.currentPage = (parseInt($scope.currentPage) + 1 > Object.keys($scope.questionArray)
                        .length) ? Object.keys($scope.questionArray)
                    .length - 1 : $scope.currentPage + 1;
                $cookies.put('exampage', $scope.currentPage, {
                    path: '/'
                });
                if (Object.keys($scope.questionArray)
                    .length === $scope.currentPage + 1) {
                    $scope.is_show_next = false;
                } else {
                    $scope.is_show_next = true;
                    $scope.is_show_previous = true;
                }
            }
        };
        $scope.user_answer = [];
		$scope.choosedAnswer = function(qid, ansvalue, $index) {
                   $scope.exams_user_id = parseInt($state.params.id);
                   $scope.answer = {question_id: qid,answer: ansvalue};
                 /*  $scope.user_answer.push($scope.answer);*/
                   if($scope.user_answer.length !== 0)
                   {
                     angular.forEach($scope.user_answer, function(value,key) {
                        if (parseInt(value.question_id) === parseInt(qid)) {
                            $scope.user_answer.splice(key, 1);

                        } else{
                            $scope.pushvalue = true;
                        }
                        });
                   }
                 else {
                        $scope.user_answer.push($scope.answer);  
                    }
                    if($scope.pushvalue === true)
                    {
                        $scope.user_answer.push($scope.answer);
                    }
                     $scope.autoCallanswer();
        };		
        $scope.submit = function() {
            swal({ //jshint ignore:line
                title: $filter("translate")("Are you sure you want to complete this exam?"),
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                closeOnConfirm: true,
                animation:false,
            }).then(function (isConfirm) {
                if (isConfirm) {
                    $scope.timerStop = true;
                    $scope.answercall = {};
                    $scope.answercall.user_answer =  $scope.user_answer;
                    $scope.answercall.exams_user_id = parseInt($state.params.id);
                    $scope.answercall.is_exam_completed = 1;
                    QuestionAnswer.post($scope.answercall, function(response) {
                        if (response.error.code === 0) {
                            flashMessage = $filter("translate")("Your exam is successfully completed");
							$scope.stopautoCall = 1;
                            flash.set(flashMessage, 'success', false);
                            $state.go('ExamResult', {
                                id: $state.params.id
                            });
                        } else {
                            flashMessage = $filter("translate")(response.error.message);
                            flash.set(flashMessage, 'error', false);
                        }
                    });
		        }
            });
        }
		$scope.autoCallanswer = function () {
			$scope.answercall = {};
			$scope.answercall.user_answer =  $scope.user_answer;
			$scope.answercall.exams_user_id = parseInt($state.params.id);
			QuestionAnswer.post($scope.answercall, function(response) {
				if (response.error.code === 0) {
                /*    $scope.callfailure = false;*/
				/*   console.log('post success');*/
				} else {
                   /* $scope.callfailure = true;*/
				/*	console.log('post failure');*/
				}
			});
		};
        $scope.autoCallanswers = function () {
			$scope.answercall = {};
            $scope.user_answers = [];
			$scope.answercall.user_answer =  $scope.user_answers;
			$scope.answercall.exams_user_id = parseInt($state.params.id || 0);
            if($scope.answercall.exams_user_id !== 0)
            {
                QuestionAnswer.post($scope.answercall, function(response) {
                    if (response.error.code === 0) {
                        $scope.callfailure = false;
                        $scope.intervalFunction();
                    console.log('Auto call success');
                    } else {
                        $scope.callfailure = true;
                        console.log('Auto call failure');
                    }
                });
            }
		};
		$scope.intervalFunction = function () {
			$timeout(function() {
                if($scope.callfailure === false && $scope.callfailure !== undefined) {
                    if ($scope.stopautoCall === 0) {    
                          $scope.autoCallanswers();
                      /*  $scope.intervalFunction();*/
                    }
                }
			}, 5000);
		};
	
		$scope.getRemainTimeFormat = function($milisecondsDiff) {
            return Math.floor($milisecondsDiff / (1000 * 60 * 60))
                .toLocaleString(undefined, {
                    minimumIntegerDigits: 2
                }) + ":" + (Math.floor($milisecondsDiff / (1000 * 60)) % 60)
                .toLocaleString(undefined, {
                    minimumIntegerDigits: 2
                }) + ":" + (Math.floor($milisecondsDiff / 1000) % 60)
                .toLocaleString(undefined, {
                    minimumIntegerDigits: 2
                });
        };
    })
     /*Exam result Controller*/
    .controller('ExamResultController', function($scope, $rootScope, $state, $filter, $location, flash, ExamStart, $window, $timeout) {
            function examStart() {
                ExamStart.get({
                    id: $state.params.id,
                }, function(response) {
                    if (parseInt(response.error.code) === 0) {
                        $scope.exam_data = response.data;
                        $timeout(function() {
                            $scope.accessTimeOut = true;
                              }, 1000);
                    }
                }, function(error) {
                    console.log(error);
                });
            };
            examStart();
        })
    /*Exam result Controller*/