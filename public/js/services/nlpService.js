angular.module('nlpService', [])
.factory('Nlp', function($http) {
	return {
      get : function(params) {
  //       return $http.get('/api/nlp', {
		// 	params: params
		// });
		return $http.get('js/sample2.json');
      }
	}
});