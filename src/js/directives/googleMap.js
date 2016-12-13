angular.module('finalProject')
.directive('googleMap', googleMap)
.directive('googleplace', googleplace);


googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      spaces: '='
    },
    link: function($scope, element) {
      const map = new $window.google.maps.Map(element[0], {
        center: {
          lat: 51.508530,
          lng: -0.076132
        },
        zoom: 10,
        scrollwheel: false
      });

      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
      }

      $scope.$watch('spaces', () => {
        clearMarkers();
        if($scope.spaces.$resolved) {
          $scope.spaces.forEach((space) => {
            // console.log(space);
            if(space.lat && space.lng) {
              const marker = new
              $window.google.maps.Marker({
                position: { lat: space.lat, lng: space.lng },
                map: map,
                animation: $window.google.maps.Animation.DROP
              });
              markers.push(marker);
            }
          });
        }
      }, true);
    }
  };
}


// marker.addListener('click', () => {
//   infoWindow.open(map, marker);
//   markers.push(marker);
//
// const contentString = `
// <p>Value: ${space.image}</p>
// <p>Earliest Pickup: ${userEdit.user.email}</p>
// `;
// const infoWindow = new $window.google.maps.InfoWindow({
//   content: contentString
// });


// Autocomplete BELOW
googleplace.$inject = ['$window'];
function googleplace($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      spaces: '='
    },
    link: function(scope, element, attrs, model) {
      const options = {
        types: [],
        componentRestrictions: {}
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const latlng = place.geometry.location.toJSON();

        scope.spaces.lat = latlng.lat;
        scope.spaces.lng = latlng.lng;

        console.log(place);
        model.$setViewValue(element.val());
      });
    }
  };
}
// Autocomplete ends
