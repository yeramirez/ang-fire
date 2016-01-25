'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module('angFireApp')
  .controller('AccountCtrl', function ($scope, user, Auth, Ref, $firebaseObject) {

    $scope.user = user;
    $scope.logout = function() { Auth.$unauth(); };
    var profile = $firebaseObject(Ref.child('users/'+user.uid));
    profile.$bindTo($scope, 'profile');

  });
