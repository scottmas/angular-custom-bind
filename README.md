### Angular Custom Bind ###
------------

Angular custom bind is a tool built to allow users to define custom delimiters in
the view that only update on specified broadcasts.

In order to get started, first inject the module into your own

Config
...
angular.module('yourApp', ['customBind', ...)
...

Controller:
...
$scope.foo = 1;
$scope.bar = "Sup dawgs";
customBind.set("[[", "]]", "$routeChangeSuccess");
...

View
...
<div data="[[foo]]">Message: [[bar]]</div>
...

Note: This service currently only supports setting broadcast listeners on the $rootScope