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

SpacesNewController.$inject = ['Space', '$state'];
function SpacesNewController(Space, $state) {
  const spacesNew = this;

  spacesNew.space = {};

  function create() {
    Space.save(spacesNew.space, () => {
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
    // console.log('I\'m trying to delete a space...');
    spacesShow.space.$remove(() => {
      $state.go('spacesIndex');
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
      $state.go('spacesShow', $state.params);
    });
  }

  this.update = update;

}
