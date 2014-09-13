'use strict';

var chatServices = angular.module('chatServices', []);

chatServices.factory('Chat', [function() {
        return new function() {
            var websocket = new WebSocket('wss://localhost:8181/javaee-javascript/chat');
            this.send = function(sender, value) {
                websocket.send(JSON.stringify({user: sender, message: value}));
            };
            this.setListener = function(messageListener, errorListener) {
                websocket.onmessage = function(message) {
                    var parsedMessage = JSON.parse(message.data);
                    
                    if (!parsedMessage.error) {
                        messageListener(parsedMessage);
                    } else {
                        errorListener(parsedMessage.error);
                    }
                };
            };
        };
    }]);