'use strict';

var chatControllers = angular.module('chatControllers', []);

chatControllers.controller('ChatController', ['$scope', 'Chat',
    function($scope, Chat) {
        $scope.user = principal;
        $scope.messages = [];
        $scope.newMessage = '';

        Chat.setListener(function(message) {
            $scope.messages.push(message);
            $scope.$apply();
        });

        $scope.send = function() {
            Chat.send(principal, $scope.newMessage);
            $scope.newMessage = '';
        };
    }]);