angular.module('finalProject')
  .controller('UserProfileController', UserProfileController)
  .controller('UserEditController', UserEditController);

UserProfileController.$inject = ['User', '$state', '$auth'];
function UserProfileController(User, $state , $auth) {
  const userProfile = this;

  userProfile.user = User.get({id: $auth.getPayload().id});

  function deleteUser() {
    userProfile.user.$remove(() => {
      $state.go('home');
    });
  }

  userProfile.delete = deleteUser;
  userProfile.isLoggedIn = $auth.isAuthenticated;
}

UserEditController.$inject = ['User', '$state', '$auth'];
function UserEditController(User, $state, $auth) {
  const userEdit = this;

  userEdit.user = User.get({ id: $auth.getPayload().id });

  function update() {
    userEdit.user.$update(() => {
      $state.go('userProfile', $state.params);
    });
  }

  this.update = update;

}
