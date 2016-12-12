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

SpacesShowController.$inject = ['Space', '$state', '$auth'];
function SpacesShowController(Space, $state , $auth) {
  const spacesShow = this;

  spacesShow.space = Space.get($state.params);

  function deleteSpace() {
    spacesShow.space.$remove(() => {
      $state.go('spacesIndex');
    });
  }

  spacesShow.delete = deleteSpace;
  spacesShow.isLoggedIn = $auth.isAuthenticated;
}

SpacesEditController.$inject = ['Space', '$state', '$auth'];
function SpacesEditController(Space, $state, $auth) {
  const spacesEdit = this;

  spacesEdit.spaces = Space.get($state.params);
  spacesEdit.spaces.user_id = $auth.getPayload().id;

  function update() {
    spacesEdit.space.$update(() => {
      $state.go('spacesShow', $state.params);
    });
    // Space.update($state.params, spacesEdit.space, (res) => {
    //   console.log(res);
    // });
  }

  this.update = update;

}
