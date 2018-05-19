'use strict';
/**
   * @ngdoc directive
   * @name getlancerApp.Job.downloadFile
   * @param {object} value
   * @description
   * For download the files process (Resumes, Image). 
   *<span download-files attachment={{attachment}} downloadlable="Dowload"> </span>
   */ 
 
 angular.module('getlancerApp')
 .directive('downloadFiles', function (md5, $location) {
    var directive = {
      restrict: 'EA',
      replace: true,
      template: '<a href="{{job_downloadUrl}}" class="cursor" target="_blank"> <i class="fa fa-download"> </i> {{"Download"|translate}} </a>',
      scope: {
        attachment: '@',
        downloadlable: '@'
      },
      link: function (scope) {
        scope.attachment = JSON.parse(scope.attachment);
        var download_file = md5.createHash('JobApply' + scope.attachment + 'docdownload') + '.doc';
        scope.job_downloadUrl = $location.protocol() + '://' + $location.host() + '/download/' + 'JobApply' + '/' + scope.attachment + '/' + download_file;
        /* For check the download label is undeifed or not to fill the default text */
        if (scope.downloadlable === undefined) {
          scope.downloadlable = "Download";
        }
      },
    };
    return directive;
  });