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
        minZoom: 6, // Minimum zoom level allowed (0-20)
        maxZoom: 17, // Maximum soom level allowed (0-20)
        scrollwheel: false,
        mapTypeControl: false,
        styles: [
          {
            'elementType': 'geometry',
            'stylers': [
              {
                'hue': '#ff4400'
              },
              {
                'saturation': -68
              },
              {
                'lightness': -4
              },
              {
                'gamma': 0.72
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.icon'
          },
          {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry',
            'stylers': [
              {
                'hue': '#0077ff'
              },
              {
                'gamma': 3.1
              }
            ]
          },
          {
            'featureType': 'water',
            'stylers': [
              {
                'hue': '#00ccff'
              },
              {
                'gamma': 0.44
              },
              {
                'saturation': -33
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'stylers': [
              {
                'hue': '#44ff00'
              },
              {
                'saturation': -23
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'hue': '#007fff'
              },
              {
                'gamma': 0.77
              },
              {
                'saturation': 65
              },
              {
                'lightness': 99
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'gamma': 0.11
              },
              {
                'weight': 5.6
              },
              {
                'saturation': 99
              },
              {
                'hue': '#0091ff'
              },
              {
                'lightness': -86
              }
            ]
          },
          {
            'featureType': 'transit.line',
            'elementType': 'geometry',
            'stylers': [
              {
                'lightness': -48
              },
              {
                'hue': '#ff5e00'
              },
              {
                'gamma': 1.2
              },
              {
                'saturation': -23
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'saturation': -64
              },
              {
                'hue': '#ff9100'
              },
              {
                'lightness': 16
              },
              {
                'gamma': 0.47
              },
              {
                'weight': 2.7
              }
            ]
          }
        ]
      });

      let markers = [];
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
                <div class="infoWindow">
                <h4 class="contact">Contact: <a href="mailto:${space.user.email}?subject=Query about your parking space">${space.user.email}</a></h4>
                <h4 class="details">${space.details}</h4>
                <h4 class="diameters">Width: ${space.width} m<br>
                Length: ${space.length} m</h4>
                <img class="parking-photo" src=${space.image} alt="Parking image missing">
                </div>`;

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
