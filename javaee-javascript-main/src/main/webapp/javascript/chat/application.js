'use strict';

var chatApplication = angular.module('chatApplication', ['chatControllers',
    'chatServices', 'chatDirectives', 'angular-growl']);

chatApplication.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(2000);
}]);