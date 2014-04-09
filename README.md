### Angular Custom Bind ###
------------

Angular custom bind is a tool built to allow users to define custom delimiters in
the view that only update on specified broadcasts.

This module is still in super early stages of development. 

The biggest issues (which is a huge one) is that once the binding is evaluated once
the html is permanently changed.


In order to get started, first inject the module into your own
Config
```
angular.module('yourApp', ['customBind', ...])
```

Controller:
```
$scope.foo = 1;
$scope.bar = "Sup dawgs";
//Bind double square brackets to evaluate on $routeChangeSuccess
customBind.set("[[", "]]", "$routeChangeSuccess");
```

View
```
<div data="[[foo]]">Message: [[bar]]</div>
```

Rendered view
```
<div data="1">Message: bar</div>
```

Note: This service currently only supports setting broadcast listeners on the $rootScope