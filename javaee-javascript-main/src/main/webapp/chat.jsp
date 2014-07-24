<!DOCTYPE html>
<html lang="en" ng-app="chatApplication">
    <head>
        <title>Chat</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/chat/application.css">
        <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-sanitize.min.js"></script>
        <link rel="stylesheet" href="css/lib/angular-growl.min.css">
        <script src="javascript/lib/angular-growl.min.js"></script>
        <script type="text/javascript">
            var principal = '${pageContext.request.userPrincipal.name}';
        </script>
        <script src="javascript/chat/controllers.js"></script>
        <script src="javascript/chat/services.js"></script>
        <script src="javascript/chat/directives.js"></script>
        <script src="javascript/chat/application.js"></script>
    </head>
    <body ng-controller="ChatController">
        <div style="float: right" growl></div>
        <div id="chat-panel">
            <label class="chat-label">Welcome to the Chat, {{user}}</label>
            <div class="chat-box" auto-scroll="messages.length">
                <table class="message-list">
                    <tr class="mesage-panel" ng-repeat="message in messages">
                        <td class="timestamp-column">{{message.timestamp}}</td>
                        <td class="user-column">{{message.user}}</td>
                        <td class="message-column">{{message.message}}</td>
                    </tr>
                </table>
            </div>
            <span class="message-count-label">
                <strong>{{messages.length}}</strong> <ng-pluralize count="messages.length" when="{ one: 'message', other: 'messages' }"></ng-pluralize> in chat
            </span>
            <form ng-submit="send()">
                <input class="textbox" placeholder="Hello there!"
                       ng-model="newMessage" autofocus required>
            </form>
        </div>
</html>