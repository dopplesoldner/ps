angular.module('resultController', [])
.controller('resultController', function($scope, $http, $location, $filter, ngTableParams, ngProgress, Nlp) {     
  $scope.wait = true;
  $scope.noResults = true;

  $scope.searchInfo = {
    keyword: ($location.search()).keyword
  };
  
  ngProgress.height('3px');
  ngProgress.color('green');
  ngProgress.start(); 
  Nlp.get($scope.searchInfo).success(function(data) {
    ngProgress.complete();
    $scope.sentiments = data;
    if ($scope.sentiments.average.length > 0) {
      fillChartData();
      // loadTable();
      $scope.wait = false;  
    }
    else $scope.noResults = false;
  }); 

  function fillChartData () {
    $scope.sentimentChart = {
      type: 'BarChart',
      options: {
        'height': 450,
        'title': $scope.searchInfo.keyword + ' | ' + 'Average Sentiment: ' + $scope.sentiments.overall,
        'fill': 100,
        // 'width': 800,
        'displayExactValues': true,
        'vAxis': {
          "title": 'Entities',
          "gridlines": {
            "count": 1
          }
        },
        'hAxis': {
          'title': 'Sentiment',
            'ticks': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 
        },
        colors: ['#3498db']
      },
      data: {
        cols: [
          {
            "id": "entity",
            "label": "Score",
            "type": "string",
            "p": {}
          },
          {
            "id": "score",
            "label": "Summary",
            "type": "number",
            "p": {}
          }],
        rows: []
      },
    };

    $scope.sentiments.average.forEach(function (a) {
      if(a.sentiment > 0) {
        $scope.sentimentChart.data.rows.push({
        "c": [
          {"v": a.entity},
          {"v": a.sentiment, "f": 'Samples: ' + a.count + ', Average Sentiment: ' + a.sentiment}]
        });  
      }
    });

    loadTable();
  }

  function loadTable () {
    $scope.tableParams = new ngTableParams({
        page: 1,            
        hideRows: true,
        count: $scope.sentiments.detail.length          
    }, {
        groupBy: 'namedEntity',
        total: $scope.sentiments.detail.length,
        getData: function($defer, params) {
            var orderedData = params.sorting() ?
                    $filter('orderBy')($scope.sentiments.detail, $scope.tableParams.orderBy()) : $scope.sentiments.detail;

            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
  }
});