angular.module('firebase.config', [])
  .constant('FBURL', 'https://vivid-torch-3858.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook','google','twitter','github'])

  .constant('loginRedirectPath', '/login');
