angular.module('finalProject')
  .controller('UserProfileController', UserProfileController)
  .controller('UserEditController', UserEditController);

UserProfileController.$inject = ['User', '$state', '$auth', 'Space'];
function UserProfileController(User, $state , $auth, Space) {
  const userProfile = this;

  // userProfile.spaces = [];
  // userProfile.space = User.get({id: $auth.getPayload().id}), ((user) => {
  //   user.space_ids.forEach((space) =>{
  //     userProfile.spaces.push(space);
  //   });
  //   userProfile.spaces = user;
  //
  // });
  // userProfile.space_ids = User.get({id: $auth.getPayload().id});

  // userProfile.space = Space.get({id: $auth.getPayload().id});
  userProfile.user = User.get({id: $auth.getPayload().id});

  function deleteUser() {
    // console.log('I\'m trying to delete a user...');
    userProfile.user.$remove(() => {
      $state.go('home');
    });
  }
  // userProfile.spaces = userProfile.user.space_ids;
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
