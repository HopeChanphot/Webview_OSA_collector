// Create the charts when the web page loads
window.addEventListener('load', onload);

function onload(event){
  chartd = createdb();
  charts = createspo2();
}

// Create Temperature Chart
function createdb(){
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:"db-chart",
      type: 'spline' 
    },
    series: [
      {
        name: "db-chart"
      }
    ],
    title: { 
      text: undefined
    },
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br>%H:%M:%S',
        minute: '%Y-%m-%d<br>%H:%M',
        hour: '%Y-%m-%d<br>%H:%M',
        day: '%Y-%m-%d',
        week: '%Y-%m-%d',
        month: '%Y-%m',
        year: '%Y'
      },
    },
    yAxis: {
      title: { 
        text: 'dB' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}

// Create Humidity Chart
function  createspo2(){
  var chart = new Highcharts.Chart({
    chart:{ 
      renderTo:"spo2-chart",
      type: 'spline'  
    },
    series: [{
      name: "spo2-chart"
    }],
    title: { 
      text: undefined
    },    
    plotOptions: {
      line: { 
        animation: false,
        dataLabels: { 
          enabled: true 
        }
      },
      series: { 
        color: '#50b8b4' 
      }
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        second: '%Y-%m-%d<br>%H:%M:%S',
        minute: '%Y-%m-%d<br>%H:%M',
        hour: '%Y-%m-%d<br>%H:%M',
        day: '%Y-%m-%d',
        week: '%Y-%m-%d',
        month: '%Y-%m',
        year: '%Y'
      },
    },
    yAxis: {
      title: { 
        text: '% SpO2' 
      }
    },
    credits: { 
      enabled: false 
    }
  });
  return chart;
}
