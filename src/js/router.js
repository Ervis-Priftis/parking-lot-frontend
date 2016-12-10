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
    templateUrl: '/templates/usersEdit.html',
    controller: 'UsersEditController as usersEdit'
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
  .state('spacesShow', {
    url: '/spaces/:id',
    templateUrl: '/templates/spacesShow.html',
    controller: 'SpacesShowController as show'
  })
  .state('spacesEdit', {
    url: '/spaces/:id/edit',
    templateUrl: '/templates/spacesEdit.html',
    controller: 'SpacesEditController as spacesEdit'
  });

  $urlRouterProvider.otherwise('/');
}
