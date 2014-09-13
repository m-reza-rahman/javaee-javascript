'use strict';

var todoDirectives = angular.module('todoDirectives', []);

/**
 * Applies the expression passed in via the attribute when the escape key is pressed
 */
todoDirectives.directive('onEscape', function() {
    var ESCAPE_KEY = 27;
    return function(scope, element, attributes) {
        element.bind('keydown', function(event) {
            if (event.keyCode === ESCAPE_KEY) {
                scope.$apply(attributes.onEscape);
            }
        });
    };
});

/**
 * Gets focus to the element when the expression passed in via the attribute becomes true
 */
todoDirectives.directive('focusWhen', function($timeout) {
    return function(scope, element, attributes) {
        scope.$watch(attributes.focusWhen, function(watchedValue) {
            if (watchedValue) {
                $timeout(function() {
                    element[0].focus();
                }, 0, false);
            }
        });
    };
});