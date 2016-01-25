'use strict';
/**
 * @ngdoc function
 * @name angFireApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('angFireApp')
  .controller('LoginCtrl', function (Firebase, $scope, Auth, $rootScope, $location, $q, Ref, $timeout, $firebaseAuth, $firebaseArray) {

    var ref = new Firebase('https://o-cares.firebaseio.com/users');
    $scope.users = $firebaseArray(ref);
    console.log('Firebase Data', $scope.users);

    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
    };

    function redirect(authData) {
      console.log('CURRENT USER: ', $rootScope.currentUser);
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }

    $scope.logout = function() { Auth.$unauth(); };
  });
