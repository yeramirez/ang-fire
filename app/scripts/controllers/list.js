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

        $scope.addItem = function (item) {
          var userItems = $firebaseArray(ref);
          console.log('DATA IN ', item);

          userItems.$loaded(
          function(x) {
            x === userItems; // true

            var matched = false;
            var index;
            angular.forEach(userItems, function (value, key) {
              if(value.name === item.name) {
                matched = true;

                var newPrice = item.price + value.price;
                index = key;

                userItems[index].price = newPrice;
                userItems.$save(index);

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
