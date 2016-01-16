angular.module('firebase.config', [])
  .constant('FBURL', 'https://o-cares.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter','github'])

  .constant('loginRedirectPath', '/login');
