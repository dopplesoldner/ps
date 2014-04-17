angular.module('searchController', [])
.controller('searchController', function($scope, $http, $location) {

  $scope.entities = [];

  $http.get('js/entities.json')
  .success(function(res){
    angular.forEach(res.index, function(item){
      $scope.entities.push(item);
    });
  });
  
  $scope.getSentiments = function () {
    if ($scope.searchInfo.keyword.length > 0) {
      $location.search($scope.searchInfo);
      $location.path('/results');
    }
  }
});