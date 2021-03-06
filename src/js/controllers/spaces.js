angular.module('finalProject')
.controller('SpacesIndexController', SpacesIndexController)
.controller('SpacesNewController', SpacesNewController)
.controller('SpacesShowController', SpacesShowController)
.controller('SpacesEditController', SpacesEditController);

SpacesIndexController.$inject = ['Space'];
function SpacesIndexController(Space) {
  const spacesIndex = this;

  spacesIndex.all = Space.query();
}

SpacesNewController.$inject = ['Space', '$state', '$auth'];
function SpacesNewController(Space, $state, $auth) {
  const spacesNew = this;

  spacesNew.spaces = {};
  spacesNew.spaces.user_id = $auth.getPayload().id;

  function create() {
    Space.save(spacesNew.spaces, () => {
      $state.go('spacesIndex');
    });
  }

  spacesNew.create = create;
}

SpacesShowController.$inject = ['Space', 'User', '$state', '$auth'];
function SpacesShowController(Space, User, $state , $auth) {
  const spacesShow = this;

  spacesShow.user = User.get({id: $auth.getPayload().id});

  function deleteSpace(space) {
    Space.remove({id: space.id}, () => {
      $state.reload();
    });
  }

  spacesShow.delete = deleteSpace;
  spacesShow.isLoggedIn = $auth.isAuthenticated;
}

SpacesEditController.$inject = ['Space', '$state'];
function SpacesEditController(Space, $state) {
  const spacesEdit = this;

  spacesEdit.space = Space.get($state.params);

  function update() {
    spacesEdit.space.$update(() => {
      $state.go('spacesShow');
    });
  }

  this.update = update;

}
