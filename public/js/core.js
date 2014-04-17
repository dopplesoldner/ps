var publicSentiment = angular.module('publicSentiment', [
  'ngRoute',
  'searchController',
  'resultController',
  'aboutController',
  'nlpService',
  'googlechart',
  'ngTable',
  'ngProgress',
  'ui.bootstrap'
]);

publicSentiment.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/search.html',
        controller: 'searchController'
    }).
    when('/results', {
        templateUrl: 'partials/results.html',
        controller: 'resultController'
    }).
    when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'aboutController'
    }).
	  when('/services', {
      templateUrl: 'partials/services.html',
      controller: 'aboutController'
    }).
    otherwise({
        redirectTo: '/'
    });   
    $locationProvider.html5Mode(true);
}]);