// angular.module('finalProject')
// .directive('googleMap', googleMap);
//
// googleMap.$inject = ['$window'];
// function googleMap($window) {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="google-map">Google Map HERE</div>',
//     link: function ($scope, $element) {
//
//     }
//   };
// }

// angular.module('finalProject')
// .directive('googleMap', googleMap)
// .directive('googleplace', googleplace);
//
// // Autocomplete BELOW
// googleplace.$inject = ['$window'];
// function googleplace($window) {
//   return {
//     restrict: 'A',
//     require: 'ngModel',
//     scope: {
//       location: '='
//     },
//     link: function(scope, element, attrs, model) {
//       const options = {
//         types: [],
//         componentRestrictions: {}
//       };
//
//       const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);
//
//       autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();
//         scope.location = place.geometry.location.toJSON();
//         model.$setViewValue(element.val());
//       });
//     }
//   };
// }
// // Autocomplete ends
//
// googleMap.$inject = ['$window'];
// function googleMap($window) {
//
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="google-map">Google Map HERE</div>',
//     scope: {
//       element: '='
//     },
//     link: function(scope, element) {
//       scope.$watch('element', () => {
//         if(scope.element) {
//
//           const map = new $window.google.maps.Map(element[0], {
//             center: scope.element,
//             zoom: 6,
//             scrollwheel: false
//           });
//
//           new $window.google.maps.Marker({
//             position: scope.element,
//             map: map,
//             animation: $window.google.maps.Animation.DROP
//           });
//         }
//       });
//
//     }
//   };
// }
