'use strict';

var chatServices = angular.module('chatServices', []);

chatServices.factory('Chat', [function() {
        return new function() {
            var websocket = new WebSocket('wss://localhost:8181/javaee-javascript-main/chat');
            this.send = function(sender, value) {
                websocket.send(JSON.stringify({user: sender, message: value}));
            };
            this.setListener = function(listener) {
                websocket.onmessage = function(message) {
                    listener(JSON.parse(message.data));
                };
            };
        };
    }]);