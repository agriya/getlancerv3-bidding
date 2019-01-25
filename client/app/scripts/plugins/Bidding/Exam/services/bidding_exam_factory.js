'use strict';
angular.module('getlancerApp.Bidding.Exam')
    .factory('Exams', ['$resource', function($resource) {
        return $resource('/api/v1/exams', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ExamsView', ['$resource', function($resource) {
        return $resource('/api/v1/exams/:id', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('ExamsPayment', ['$resource', function($resource) {
        return $resource('/api/v1/order', {}, {
            create: {
                method: 'POST'
            }
        });
  }])
    .factory('ExamStart', ['$resource', function($resource) {
        return $resource('/api/v1/exams_users/:id', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('MyExam', ['$resource', function($resource) {
        return $resource('/api/v1/me/exams_users', {}, {
            get: {
                method: 'GET'
            }
        });
  }])
    .factory('QuestionAnswer', ['$resource', function($resource) {
        return $resource('/api/v1/exam_answers', {}, {
            post: {
                method: 'POST'
            }
        });
  }])
	.factory('ExamUser', ['$resource', function($resource) {
        return $resource('/api/v1/exams_users', {}, {
            post: {
                method: 'POST'
            }
        });
  }])