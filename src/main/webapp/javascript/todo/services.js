'use strict';

var todoServices = angular.module('todoServices', ['ngResource']);

todoServices.factory('ToDo', ['$resource',
    function($resource) {
        return $resource(
                'https://localhost:8181/javaee-javascript/resources/todo/:userId/:itemId',
                {userId: principal, itemId: '@id'}, {'update': {method: 'PUT'}});
    }]);