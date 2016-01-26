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

    Auth.$onAuth(function(authData) {
      if (authData) {
        var ref = new Firebase('https://o-cares.firebaseio.com/users/' + authData.auth.uid + '/');
        var ref2 = new Firebase('https://o-cares.firebaseio.com/items');

        $scope.userItems = $firebaseArray(ref);
        $scope.items = $firebaseArray(ref2);

        // $scope.items.$loaded(
        // function(x) {
        //   x === $scope.items; // true
        //   console.log('DATA TWO: ', $scope.items[0].name);
        // }, function(error) {
        //   console.error('Error:', error);
        // });

        $scope.addItem = function (item) {
          var userItems = $firebaseArray(ref);
          console.log('DATA IN ', item);

          userItems.$loaded(
          function(x) {
            x === userItems; // true
            console.log('firebase data ', userItems.length);

            var matched = false;
            angular.forEach(userItems, function (value, key) {
              console.log('looping on', value);
              if(value.name === item.name) {
                console.log('matches', item.name);
                console.log('TRUE');
                matched = true;
              }
            });

            if (!matched) {
              userItems.$add(item).then(function(ref) {
                var id = ref.key();
                console.log('added record with id ' + id);
                userItems.$indexFor(id);
              });
            }

          }, function(error) {
            console.error('Error:', error);
          });
        };

        $scope.removeItem = function (item) {
          $scope.userItems.$remove(item).then(function(ref) {
            ref.key() === item.$id; // true
          });
        };

      } else {
        $location.path('/login');
        console.log('Logged out');
      }
    });
  });
