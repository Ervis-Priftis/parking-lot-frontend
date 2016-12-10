angular.module('finalProject')
  .controller('UserProfileController', UserProfileController)
  .controller('UserEditController', UserEditController);

UserProfileController.$inject = ['User', '$state', '$auth'];
function UserProfileController(User, $state , $auth) {
  const userProfile = this;

  userProfile.user = User.get({id: $auth.getPayload().id});

  function deleteUser() {
    // console.log('I\'m trying to delete a user...');
    userProfile.user.$remove(() => {
      $state.go('home');
    });
  }

  userProfile.delete = deleteUser;
  userProfile.isLoggedIn = $auth.isAuthenticated;
}

UserEditController.$inject = ['User', '$state'];
function UserEditController(User, $state) {
  const userEdit = this;

  userEdit.user = User.get($state.params);

  function update() {
    userEdit.user.$update(() => {
      $state.go('userProfile', $state.params);
    });
  }

  this.update = update;

}
