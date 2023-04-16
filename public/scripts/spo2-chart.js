// spo2-chart.js
// Draw chart for SpO2 values
function drawSpo2Chart(data) {
    var chartData = [['Time', 'SpO2']];
    for (var key in data) {
      var spo2Value = parseInt(data[key].spo2.split(':')[1]);
      chartData.push([data[key].time, spo2Value]);
    }
  
    var options = {
      title: 'SpO2 Values',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('spo2-chart'));
    chart.draw(google.visualization.arrayToDataTable(chartData), options);
  }