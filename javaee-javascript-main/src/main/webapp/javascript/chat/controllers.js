'use strict';

var chatControllers = angular.module('chatControllers', []);

chatControllers.controller('ChatController', ['$scope', '$window', 'Chat',
    function($scope, $window, Chat) {
        $scope.user = principal;
        $scope.messages = [];
        $scope.newMessage = '';

        Chat.setListener(
                function(message) {
                    $scope.messages.push(message);
                    $scope.$apply();
                },
                function(error) {
                    $window.alert(error);
                });

        $scope.send = function() {
            Chat.send(principal, $scope.newMessage);
            $scope.newMessage = '';
        };
    }]);