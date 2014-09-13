'use strict';

var chatControllers = angular.module('chatControllers', []);

chatControllers.controller('ChatController', ['$scope', 'growl', 'Chat',
    function($scope, growl, Chat) {
        $scope.user = principal;
        $scope.messages = [];
        $scope.newMessage = '';

        Chat.setListener(
                function(message) {
                    $scope.messages.push(message);
                    $scope.newMessage = '';
                    $scope.$apply();
                },
                function(error) {
                    growl.addErrorMessage(error);
                    $scope.$apply();
                });

        $scope.send = function() {
            Chat.send(principal, $scope.newMessage);
        };
    }]);