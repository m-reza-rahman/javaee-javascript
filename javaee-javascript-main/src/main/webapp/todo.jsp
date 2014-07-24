<!DOCTYPE html>
<html lang="en" ng-app="todoApplication">
    <head>
        <title>To Do Items</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="https://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/todo/application.css">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-sanitize.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.6/angular-resource.min.js"></script>
        <link rel="stylesheet" href="css/lib/angular-growl.min.css">
        <script src="javascript/lib/angular-growl.min.js"></script>
        <script type="text/javascript">
            var principal = '${pageContext.request.userPrincipal.name}';
        </script>
        <script src="javascript/todo/controllers.js"></script>
        <script src="javascript/todo/services.js"></script>
        <script src="javascript/todo/directives.js"></script>
        <script src="javascript/todo/application.js"></script>
    </head>
    <body ng-controller="ToDoController">
        <div style="float: right" growl></div>
        <div class="center">
            <div id="todo-panel">
                <label class="todo-label" for="add-todo">{{user}}'s To Do List</label>
                <form ng-submit="addItem()">
                    <input id="add-todo" class="textbox"
                           placeholder="Buy milk" ng-model="newToDoDescription"
                           autofocus required>
                </form>
                <div ng-show="items.length">
                    <ul id="todo-list">
                        <li ng-repeat="item in items">
                            <div ng-class="{hidden: item == itemToEdit}">
                                <input type="checkbox" ng-model="item.completed" ng-change="commitEditItem(item)">
                                <span ng-class="{completed: item.completed}" ng-dblclick="editItem(item)">{{item.description}}</span>
                                <a class="todo-item-remove-button"
                                   title="Remove this item"
                                   ng-click="removeItem(item)">
                                    <span class="todo-item-remove-icon"></span>
                                </a>
                            </div>
                            <div ng-class="{hidden: item != itemToEdit}">
                                <form ng-submit="commitEditItem(item)">
                                    <input type="text" class="textbox"
                                           ng-model="item.description"
                                           ng-blur="commitEditItem(item)"
                                           on-escape="revertEditing(item)"
                                           focus-when="item == itemToEdit"
                                           required>
                                </form>
                            </div>
                        </li>
                    </ul>
                    <span class="item-count-label">
                        <strong>{{items.length}}</strong> <ng-pluralize count="items.length" when="{ one: 'item', other: 'items' }"></ng-pluralize> on your list
                    </span>
                </div>
            </div>
        </div>
</html>