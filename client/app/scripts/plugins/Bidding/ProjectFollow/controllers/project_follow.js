angular.module('getlancerApp.Bidding.ProjectFollow')
    .controller('ProjectFollowController', ['$scope', '$rootScope', '$stateParams', 'flash', '$filter', '$state', 'BookMarkProject', 'md5', '$timeout', function($scope, $rootScope, $stateParams, flash, $filter, $state, BookMarkProject, md5, $timeout) {
		 $scope.$on('showisbook', function (event, data) {
			$scope.is_book = data.isbook;
			$scope.foreignid = data.projectid;
		   });
				$scope.projectBookmark = function () {
					var flashMessage = "";	
					 $timeout(function() {
							BookMarkProject.post({
								foreign_id: $scope.foreignid,
								class: $scope.classname
							}, function (response) {
								if (response.error.code === 0) {
									$rootScope.book_id = response.id;
									$scope.is_book = true;
									flashMessage = $filter("translate")("Project bookmarked successfully");
									flash.set(flashMessage, 'success', false);
								} else {
									flashMessage = $filter("translate")(response.error.message);
									flash.set(flashMessage, 'error', false);
								}
								$state.go('Bid_ProjectView', {}, {
										reload: true
									});
							});
						},1000);
					}
				$scope.projectUnBookmark = function (book_id) {
					var flashMessage = "";
					 $timeout(function() {
						if ($rootScope.user !== null && $rootScope.user !== undefined) {
							var params = {};
							params.id = $rootScope.book_id;
							BookMarkProject.delete({
								id:$rootScope.book_id
							}, function (response) {
								if (response.error.code === 0) {
									$rootScope.book_id = 0;
									$scope.is_book = false;
									flashMessage = $filter("translate")("Project unbookmarked successfully.");
									flash.set(flashMessage, 'success', false);
								} else {
									flashMessage = $filter("translate")(response.error.message);
									flash.set(flashMessage, 'error', false);
								}
								$state.go('Bid_ProjectView', {}, {
									reload: true
								});
							});
						}
					},1000);
		      };
    }]);