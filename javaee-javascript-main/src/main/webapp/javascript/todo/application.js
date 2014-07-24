'use strict';

var todoApplication = angular.module('todoApplication',
        ['todoControllers', 'todoServices', 'todoDirectives', 'angular-growl']);
        
todoApplication.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(2000);
}]);        