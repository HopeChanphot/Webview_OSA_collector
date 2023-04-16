// db-chart.js
// Draw chart for dB values
function drawDbChart(data) {
    var chartData = [['Time', 'dB']];
    for (var key in data) {
      var dbValue = parseFloat(data[key].db.split(' ')[0]);
      chartData.push([data[key].time, dbValue]);
    }
  
    var options = {
      title: 'dB Values',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
  
    var chart = new google.visualization.LineChart(document.getElementById('db-chart'));
    chart.draw(google.visualization.arrayToDataTable(chartData), options);
  }

  function plotValues(chart, timestamp, value) {
  var x = new Date(timestamp).getTime();
  var y = 0;

  if (chart.title.textStr === 'dB Readings') {
    y = parseFloat(value);
  } else if (chart.title.textStr === 'Blood Oxygen Readings') {
    y = parseInt(value.replace('blood oxygen:', ''));
  }

  if (chart.series[0].data.length > 40) {
    chart.series[0].addPoint([x, y], true, true, true);
  } else {
    chart.series[0].addPoint([x, y], true, false, true);
  }
}