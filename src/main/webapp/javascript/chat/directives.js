'use strict';
var chatDirectives = angular.module('chatDirectives', []);

/**
 * Scrolls the element to the bottom when the expression passed in via the
 * attribute becomes true
 */
chatDirectives.directive('autoScroll', function($timeout) {
    return function(scope, element, attributes) {
        scope.$watch(attributes.autoScroll, function() {
            $timeout(function() {
                jQuery(element).animate(
                        {scrollTop: jQuery(element).prop("scrollHeight")}, 'slow');
            }, 0, false);
        });
    };
});