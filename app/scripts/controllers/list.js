'use strict';
/**
 * @ngdoc function
 * @name angFireApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Using crud to create a users list.
 */

angular.module('angFireApp')
  .controller('ListCtrl', function (Firebase, $scope, Auth, $firebaseArray, $location) {
    var items;
    var userItems;

    Auth.$onAuth(function(authData) {
      if (authData) {
        var ref = new Firebase('https://o-cares.firebaseio.com/users/' + authData.auth.uid + '/');
        var ref2 = new Firebase('https://o-cares.firebaseio.com/items');

        $scope.userItems = $firebaseArray(ref);
        $scope.items = $firebaseArray(ref2);

        $scope.addItem = function (item) {
          var userItems = $firebaseArray(ref);
          userItems.$add(item).then(function(ref) {
            var id = ref.key();
            console.log('added record with id ' + id);
            userItems.$indexFor(id); // returns location in the array
          });
        };

        $scope.removeItem = function () {
          userItems.$remove($scope.item).then(function(ref) {
            // data has been deleted locally and in the database
            console.log($scope.item);
          }, function(error) {
            console.log('Error:', error);
          });
        };

      } else {
        $location.path('/login');
        console.log('Logged out');
      }
    });
  });
