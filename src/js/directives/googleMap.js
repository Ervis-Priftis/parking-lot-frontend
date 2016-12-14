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
        zoom: 9,
        scrollwheel: false
      });

      let markers = [];
      // let allInfoWindows = [];
      let infoWindow = null;

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
              marker.addListener('click', () => {
                if(infoWindow) {
                  infoWindow.close();
                }

                const contentString = `
                <p>Contact: <a href="mailto:${space.user.email}?subject=Query about your parking space">${space.user.email}</a></p>
                <p>${space.details}</p>
                <img src=${space.image}>`;

                infoWindow = new $window.google.maps.InfoWindow({
                  content: contentString
                });

                infoWindow.open(map, marker);
                markers.push(marker);
              });
            }
          });
        }
      }, true);
    }
  };
}


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
