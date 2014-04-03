 'use strict';

var todoControllers = angular.module('todoControllers', []);

todoControllers.controller('ToDoController', ['$scope', 'ToDo',
    function($scope, ToDo) {
        $scope.user = principal;
        $scope.newToDoDescription = '';
        $scope.itemToEdit = null;

        $scope.items = ToDo.query();

        $scope.addItem = function() {
            var item = new ToDo({description: $scope.newToDoDescription});
            item.$save(function(data) {
                $scope.items.push(data);
            });
            $scope.newToDoDescription = '';
        };

        $scope.editItem = function(item) {
            $scope.itemToEdit = item;
            $scope.itemBackup = angular.extend({}, item);
        };

        $scope.commitEditItem = function(item) {
            ToDo.update(item);
            $scope.itemToEdit = null;
        };

        $scope.revertEditing = function(item) {
            $scope.items[$scope.items.indexOf(item)] = $scope.itemBackup;
            $scope.itemToEdit = null; // Call commit instead?
        };

        $scope.removeItem = function(item) {
            item.$remove(function() {
                $scope.items.splice($scope.items.indexOf(item), 1);
            });
        };
    }]);