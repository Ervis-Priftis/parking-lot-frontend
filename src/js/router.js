angular.module('finalProject')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/templates/landingPage.html'
  })
  .state('userProfile', {
    url: '/profile',
    templateUrl: '/templates/userProfile.html',
    controller: 'UserProfileController as userProfile'
  })
  .state('usersEdit', {
    url: '/profile/edit',
    templateUrl: '/templates/userEdit.html',
    controller: 'UserEditController as userEdit'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/templates/register.html',
    controller: 'RegisterController as register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/templates/login.html',
    controller: 'LoginController as login'
  })
  .state('spacesIndex', {
    url: '/spaces',
    templateUrl: '/templates/spacesIndex.html',
    controller: 'SpacesIndexController as spacesIndex'
  })
  .state('spacesAdd', {
    url: '/spaces/add',
    templateUrl: '/templates/spacesAdd.html',
    controller: 'SpacesNewController as spacesNew'
  })
  .state('spacesEdit', {
    url: '/spaces/:id/edit',
    templateUrl: '/templates/spacesEdit.html',
    controller: 'SpacesEditController as spacesEdit'
  })
  .state('spacesShow', {
    url: '/spaces/Show',
    templateUrl: '/templates/spacesShow.html',
    controller: 'UserProfileController as userProfile'
  });

  $urlRouterProvider.otherwise('/');
}
