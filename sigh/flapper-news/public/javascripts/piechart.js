var app = angular.module('simple-chart', []);
google.load("visualization", "1", {packages:["corechart"]});

app.controller('MainController', ['$scope', '$http',  function($scope, $http) {
  $http.get('/data').success(function(data){
    
    var dataArray = formatDataForView(data);
    
    console.table(data);
  
    var table = google.visualization.arrayToDataTable(dataArray, false);
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    
    var options = {'title':'Card Types'}
    chart.draw(table, options);

  });
}]);

function formatDataForView(data) {
  
    var dataArray = [], keysArray = [];
    
    for(var prop in data[0]) {
      keysArray.push(prop);
    }
    
    dataArray.push(keysArray);
    
    data.forEach(function(value){
        var dataEntry = [];
        for(var prop in value) {
          dataEntry.push(parseInt(value[prop], 0));
        }
        dataArray.push(dataEntry);
    });
  
    return dataArray;
}