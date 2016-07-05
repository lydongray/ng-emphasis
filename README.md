# ng-emphasis

[![Build Status](https://travis-ci.org/lydongray/ng-emphasis.svg?branch=master)](https://travis-ci.org/lydongray/ng-emphasis)

An [AngularJS](https://github.com/angular/angular.js) directive that puts emphasis on words within a string of text give one or more search terms. Simply include ng-emphasis in your HTML element and watch the magic happen.

Install
=======

### Bower

```bash
bower install ng-emphasis
```

[//]: # (Todo: add npm, nuget, cdnjs and jsDeliver options)

Usage
=====

### Require ng-emphasis in your application

```javascript
angular.module('myApp', [
    'ng-emphasis'
]);
```

### Style up ng-emphasis however you like
```html
<style>
    .ng-emphasis { font-weight: bold; }
</style>
```

### Add an HTML element that uses ng-emphasis
```html
<p ng-emphasis="some is">Here is some text</p>
```

### You'll get this inside your DOM
```html
<p ng-emphasis="some is">Here <span class="ng-emphasis">is</span> <span class="ng-emphasis">some</span> text</p>
```

### Bind it to a list of items in the scope

```javascript
angular.module('myApp')
.controller('MainCtrl', function() {
    var vm = this;

    vm.search = 'Sara Jo';
    vm.users = [
        'John',
        'Sara',
        'Mel',
        'Jo'
    ];
});
```
```html
<p ng-repeat="user in users" ng-emphasis="search">{{ user }}</p>
```

### See it in action | [Demo](http://plnkr.co/edit/vuHu4Ps1f4p4Si5MCOm9?p=preview)

Guide
=====

