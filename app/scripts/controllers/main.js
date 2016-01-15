'use strict';

/**
 * @ngdoc function
 * @name angFireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angFireApp
 */
angular.module('angFireApp')
  .controller('MainCtrl', function ($scope, $firebaseArray) {
    var URL = "https://o-cares.firebaseio.com/";
    var list = $firebaseArray(new Firebase(URL));
    $scope.users = list;
    console.log("Firebase Data", $scope.users);
  });
