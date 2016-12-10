angular.module('finalProject')
.controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('home');
    });
  }
  // Ask Mike for seccont explanation
  // -------------------------------->
  const unprotectedStates = ['home', 'register', 'login'];
  let attemptedRoute = null;

  function secureState(e, toState, toParams, fromState) {
    main.message = null;

    if($auth.isAuthenticated() && attemptedRoute === 'spacesIndex' && toState.name === 'userProfile') {
      e.preventDefault();
      $state.go(attemptedRoute);
      // console.log(attemptedRoute);
      attemptedRoute = null;
    }

    if(!$auth.isAuthenticated() && !unprotectedStates.includes(toState.name)) {

      if(fromState.name === 'home') attemptedRoute = toState.name;
      // console.log(attemptedRoute);

      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there!';
    }
  }
// <-----------------------------------
  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
