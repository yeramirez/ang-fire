'use strict';

/**
 * @ngdoc function
 * @name angFireApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angFireApp
 */
angular.module('angFireApp')
  .controller('MainCtrl', function ($scope, $rootScope, $firebaseArray) {
    var URL = 'https://o-cares.firebaseio.com/';
    var list = $firebaseArray(new Firebase(URL));
    var ref = new Firebase(URL);
    $scope.users = list;
    console.log('Firebase Data', $scope.users);


    $scope.googsAuth = function () {
      ref.authWithOAuthPopup('google', function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          console.log('Logged in as:', authData);
          $rootScope.currentUser = authData;
        }
      },
      {
        remember: 'sessionOnly'
      });
    };

    $scope.logout = function () {
      ref.$unauth();
    };
  });
