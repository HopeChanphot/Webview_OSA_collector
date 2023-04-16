

var database = firebase.database();












function showchart3() {
  var userId = document.getElementById("charts-range").value;
  var dbRef = firebase.database().ref("BloodOxygenDataUse/" + userId);

  var chartContainer = document.getElementById('chart-container1');
  chartContainer.innerHTML = '';

  var chart = Highcharts.chart(chartContainer, {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Blood Oxygen Readings'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      title: {
        text: '% SpO2'
      }
    },
    series: [{
      name: 'Blood Oxygen',
      data: []
    }]
  });

  var numReadings = document.getElementById('chartst').value;
  dbRef.orderByKey().limitToLast(parseInt(numReadings)).on('child_added', function(snapshot) {
    var data = snapshot.val();
    for (var timestamp in data) {
      var spo2 = parseInt(data[timestamp].spo2.split(':')[1]);
      var time = new Date(data[timestamp].time.replace('_', ' ')).getTime();
      chart.series[0].addPoint([time, spo2]);
    }
  });
}




function showchart() {
  

    var input2 = document.getElementById("chartst");
    var output2 = document.getElementById("user-t");
    //var container = document.getElementById("data-container");

    output2.innerHTML = input2.value;

    
   
    var dbRef = firebase.database().ref("SleepData/"+ "BloodOxygenDataUse/" + userId);




    var chartPath1 = "SleepData/"+ 'BloodOxygenDataUse/' + userId + '/charts/range';
    var chartRef1 = firebase.database().ref(chartPath1);


    var chartRange = document.getElementById("chartst").value;


   var userId = document.getElementById("charts-range").value;


 
 // Get number of readings to plot saved on database (runs when the page first loads and whenever there's a change in the database)
 chartRef1.on('value', snapshot =>{
  input2 = Number(snapshot.val());
  console.log(input2);
  // Delete all data from charts to update with new values when a new range is selected
  chartd.destroy();
  charts.destroy();
  // Render new charts to display new range of data
  chartd = createdb();
  charts = createspo2();
  // Update the charts with the new range
  // Get the latest readings and plot them on charts (the number of plotted readings corresponds to the chartRange value)
  dbRef.orderByKey().limitToLast(parseInt(input2)).on('child_added', snapshot =>{
    var data = snapshot.val();
      for (var timestamp in data) {
        if (data[timestamp] && data[timestamp].db && data[timestamp].spo2 && data[timestamp].time) {
          var db = parseFloat(data[timestamp].db.split(' ')[0]);
          var spo2 = parseInt(data[timestamp].spo2.split(':')[1]);


          var timeString = data[timestamp].time;
          // Convert the time string to a JavaScript Date object
          var time = new Date(timeString.replace(/_/g, ' '));
          // Convert the time to epoch format
          var epochTime = time.getTime();

         // var time = new Date(data[timestamp].time.replace('_', ' ')).getTime();

          console.log("db: " + db + ", spo2: " + spo2 + ", timestamp: " + epochTime);
          plotValues(chartd, epochTime, db);
          plotValues(charts, epochTime, spo2);
        }
      
      }
     
  });


});

chartsRangeInputElement.onchange = () =>{
  chartRef1.set(chartsRangeInputElement.value);
};


}

function showchart1() {
  var input2 = document.getElementById("chartst");
  var output2 = document.getElementById("user-t");

  output2.innerHTML = input2.value;

  var userId = document.getElementById("charts-range").value;
  var dbRef = firebase.database().ref("BloodOxygenDataUse/" + userId);

  var chartRange = parseInt(input2.value);

  // Set up the chart container
  var chartContainer = document.getElementById('chart-container1');
  chartContainer.innerHTML = '';

  // Create the chart
  var chart = Highcharts.chart(chartContainer, {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Blood Oxygen Readings'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time'
      }
    },
    yAxis: {
      title: {
        text: '% SpO2'
      }
    },
    series: [{
      name: 'Blood Oxygen',
      data: []
    }]
  });
  if (chartRange > 0) {

  // Get the latest readings and plot them on the chart (the number of plotted readings corresponds to the chartRange value)
  dbRef.orderByKey().limitToLast(parseInt(chartRange)).on('child_added', function(snapshot) {
    var data = snapshot.val();

    for (var timestamp in data) {
      var db = parseFloat(data[timestamp].db.split(' ')[0]);
      var spo2 = parseInt(data[timestamp].spo2.split(':')[1]);
      var time = new Date(data[timestamp].time.replace('_', ' ')).getTime();

      chart.series[0].addPoint([time, spo2]);
    }
  });
} else {
  console.error('Invalid chart range:', chartRange);
}



}



function changeText() {
    var input = document.getElementById("input-p");
    var output = document.getElementById("user-p");
    //var container = document.getElementById("data-container");

    output.innerHTML = input.value;


    var input = document.getElementById("input-p");
    var inputp = document.getElementById("input-p").value;



   var userId = document.getElementById("input-p").value;
   var bloodOxygenDataUseRef = firebase.database().ref("SleepData/"+ "BloodOxygenDataUse/" + userId);
   bloodOxygenDataUseRef.once("value", function(snapshot) {
     var data = snapshot.val();
     var html = "<tr><th>Timestamp</th><th>db</th><th>spo2</th><th>time</th></tr>";
     for (var timestamp in data) {
      var db = parseFloat(data[timestamp].db.split(' ')[0]);
      var spo2 = parseInt(data[timestamp].spo2.split(':')[1]);
      var timeString = data[timestamp].time;
      // Convert the time string to a JavaScript Date object
      var time = new Date(timeString.replace(/_/g, ' '));
      
       html += "<tr><td>" + timestamp + "</td><td>" + db + "</td><td>" + spo2 + "</td><td>" + time + "</td></tr>";
     }
     document.getElementById("data").innerHTML = html;

   });

  
  }


  function exportTableToCSV(filename) {
    var csvContent = "data:text/csv;charset=utf-8,";
    var rows = document.querySelectorAll("#data tr");
  
    // Loop through the table rows and add each cell value to the CSV content
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].querySelectorAll("td, th");
      var row = [];
      for (var j = 0; j < cells.length; j++) {
        row.push(cells[j].innerText);
      }
      csvContent += row.join(",") + "\n";
    }
  
    // Create a download link for the CSV file and click it to trigger download
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  }


 




  function createchart() {

    var input = document.getElementById("charts-range");
    var output = document.getElementById("user-c");
    //var container = document.getElementById("data-container");

    output.innerHTML = input.value;


   var userId = document.getElementById("charts-range").value;
   var bloodOxygenDataUseRef = firebase.database().ref("SleepData/"+ "BloodOxygenDataUse/" + userId);
   bloodOxygenDataUseRef.once("value", function(snapshot) {
     var data = snapshot.val();
     var html = "<tr><th>Timestamp</th><th>db</th><th>spo2</th><th>time</th></tr>";
     for (var timestamp in data) {
       var db = parseFloat(data[timestamp].db.split(' ')[0]);
       var spo2 = parseInt(data[timestamp].spo2.split(':')[1]);
       //var time = new Date(data[timestamp].time.replace('_', ' ')).getTime();
       var time = new Date(data[timestamp].time.replace('_', ' ')).toLocaleString().replace(',', '');

       html += "<tr><td>" + timestamp + "</td><td>" + db + "</td><td>" + spo2 + "</td><td>" + time + "</td></tr>";
     }
     document.getElementById("data1").innerHTML = html;
   });
  
  }


function epochToJsDate(epochTime){
    return new Date(epochTime*1000);
  }
  
  function formatTime(timeString) {
    var time = new Date(timeString.replace('_', ' '));
    var dateTime = time.getFullYear() + ":" +
      ("00" + (time.getMonth() + 1)).slice(-2) + ":" +
      ("00" + time.getDate()).slice(-2) + " " +
      ("00" + time.getHours()).slice(-2) + ":" +
      ("00" + time.getMinutes()).slice(-2) + ":" +
      ("00" + time.getSeconds()).slice(-2);
    return dateTime;
  }
  
  // function to plot values on charts
  function plotValues(chart, timeString, value) {
    var x = new Date(formatTime(timeString)).getTime();
    var y = Number(value);
    if (chart.series[0].data.length > 20) {
      chart.series[0].addPoint([x, y], true, true, true);
    } else {
      chart.series[0].addPoint([x, y], true, false, true);
    }
  }

  
  // DOM elements
  const loginElement = document.querySelector('#login-form');
  const contentElement = document.querySelector("#content-sign-in");
  const userDetailsElement = document.querySelector('#user-details');
  const userDetailsElementp = document.querySelector('#user-p');

  const authBarElement = document.querySelector('#authentication-bar');
  const deleteButtonElement = document.getElementById('delete-button');
  const deleteModalElement = document.getElementById('delete-modal');
  const deleteDataFormElement = document.querySelector('#delete-data-form');
  const viewDataButtonElement = document.getElementById('view-data-button');
  const hideDataButtonElement = document.getElementById('hide-data-button');
  const tableContainerElement = document.querySelector('#table-container');
  const chartsRangeInputElement = document.getElementById('chartst');
  const loadDataButtonElement = document.getElementById('load-data');
  const cardsCheckboxElement = document.querySelector('input[name=cards-checkbox]');
  const gaugesCheckboxElement = document.querySelector('input[name=gauges-checkbox]');
  const chartsCheckboxElement = document.querySelector('input[name=charts-checkbox]');
  
  // DOM elements for sensor readings
  const cardsReadingsElement = document.querySelector("#cards-div");
  const gaugesReadingsElement = document.querySelector("#gauges-div");
  const chartsDivElement = document.querySelector('#charts-div');
  const tempElement = document.getElementById("temp");
  const humElement = document.getElementById("hum");
  const presElement = document.getElementById("pres");
  const updateElement = document.getElementById("lastUpdate")
  
  // MANAGE LOGIN/LOGOUT UI
  const setupUI = (user) => {
    if (user) {
      //toggle UI elements
      loginElement.style.display = 'none';
      contentElement.style.display = 'block';
      authBarElement.style.display ='block';
      userDetailsElement.style.display ='block';
      userDetailsElement.innerHTML = user.email;
      userDetailsElementp.style.display ='block';
      userDetailsElementp.innerHTML = user.pt;
    
    
      var input = document.getElementById("input-p");
      var inputp = document.getElementById("input-p").value;

     // var input = document.getElementById("input-p");

      // get user UID to get data from database
      var uid = user.uid;
      console.log(uid);
  
      // Database paths (with user UID)
      //var dbPath = 'UsersData/' + uid.toString() + '/readings';
      //var chartPath = 'UsersData/' + uid.toString() + '/charts/range';
      
      ///var pdbPath = 'SleepData/' + 'BloodOxygenDataUse/' + inputp.toString();
     // var pdbPath = "SleepData/"+ "BloodOxygenDataUse/" + inputp.toString();

      // Database references
      //var dbRef = firebase.database().ref(dbPath);
      //var dbRef = firebase.database().ref(pdbPath);
      //var dbRef = firebase.database().ref("SleepData/"+ "BloodOxygenDataUse/" + inputp);
     // var cRef = firebase.database().ref("SleepData/"+ "BloodOxygenDataUse/" + inputp + '/charts/range');

     // var chartRef = firebase.database().ref(chartPath);
     // var tRef = firebase.database().ref(pdbPath);


     // var numReadings = parseInt(document.getElementById('charts-range').value);

     // var userId = document.getElementById("input-p").value;
      //var bloodOxygenDataUseRef = firebase.database().ref("SleepData/"+ "BloodOxygenDataUse/" + userId);

      //var chartPath1 = "SleepData/"+ 'BloodOxygenDataUse/' + userId.toString() + '/charts/range';
      //var chartRef1 = firebase.database().ref(chartPath1);


     // var chartRange = document.getElementById("charts-range").value;
      // CHARTS
    // Number of readings to plot on charts
    //var chartRange = 10;
    // Get number of readings to plot saved on database (runs when the page first loads and whenever there's a change in the database)
    //chartRef1.on('value', snapshot =>{
     // chartRange = Number(snapshot.val());
      //console.log(chartRange);
      // Delete all data from charts to update with new values when a new range is selected
      //chartd.destroy();
     // charts.destroy();
      // Render new charts to display new range of data
      //chartd = createdb();
     // charts = createspo2();
      // Update the charts with the new range
      // Get the latest readings and plot them on charts (the number of plotted readings corresponds to the chartRange value)
     // dbRef.orderByKey().limitToLast(chartRange).on('child_added', snapshot =>{
        
      //  var readings = snapshot.val();
       

    //  for (var key in readings) {
      //  if (readings.hasOwnProperty(key)) {
        //  var dbValue = parseFloat(readings[key].db.split(' ')[0]); // extract numeric value from db field
        //  var spo2Value = parseInt(readings[key].spo2.split(':')[1]); // extract numeric value from spo2 field
        //  var time = new Date(readings[key].time.replace('_', ' ')).getTime(); // convert time to timestamp (replace underscore with space to match Date constructor format)
          //console.log("db: " + dbValue + ", spo2: " + spo2Value + ", timestamp: " + time);

          // Plot the values on the charts
          
          //plotValues(chartd, time, dbValue);
         // plotValues(charts, time, spo2Value);
      //  }
    //  }

     // });


   // });

    // Update database with new range (input field)
    //chartsRangeInputElement.onchange = () =>{
     // chartRef1.set(chartsRangeInputElement.value);
   // };




      //CHECKBOXES
     
      // Checbox (charta for sensor readings)
      chartsCheckboxElement.addEventListener('change', (e) =>{
        if (chartsCheckboxElement.checked) {
          chartsDivElement.style.display = 'block';
        }
        else{
          chartsDivElement.style.display = 'none';
        }
      });
  
    
      
  
  
  
    
  
      // TABLE
      var lastReadingTimestamp; //saves last timestamp displayed on the table
      // Function that creates the table with the first 100 readings
      function createTable(){
        // append all data to the table
        var firstRun = true;
        dbRef.orderByKey().limitToLast(100).on('child_added', function(snapshot) {
          if (snapshot.exists()) {
            var jsonData = snapshot.toJSON();
            console.log(jsonData);

            var data = snapshot.val();


            for (var timestamp in data) {
              var db = data[timestamp].db;
              var spo2 = data[timestamp].spo2;
              var time = data[timestamp].time;
              var content = '';
              content += '<tr>';
             // content += '<td>' + epochToDateTime(timestamp) + '</td>';
              //content += '<td>' + timestamp + '</td>';
              //content += '<td>' + temperature + '</td>';
             // content += '<td>' + humidity + '</td>';
              content += '<td>' + timestamp + '</td>';
              content += '<td>' + db + '</td>';
              content += '<td>' + spo2 + '</td>';
              content += '<td>' + time + '</td>';
              content += '</tr>';
              $('#tbody').prepend(content);
              // Save lastReadingTimestamp --> corresponds to the first timestamp on the returned snapshot data
              if (firstRun){
                lastReadingTimestamp = timestamp;
                firstRun=false;
                console.log(lastReadingTimestamp);
              }


            }
           
          }
        });
      };
  
      // append readings to table (after pressing More results... button)
      function appendToTable(){
        var dataList = []; // saves list of readings returned by the snapshot (oldest-->newest)
        var reversedList = []; // the same as previous, but reversed (newest--> oldest)
        console.log("APEND");
        dbRef.orderByKey().limitToLast(100).endAt(lastReadingTimestamp).once('value', function(snapshot) {
          // convert the snapshot to JSON
          if (snapshot.exists()) {
            snapshot.forEach(element => {
              var jsonData = element.toJSON();
              dataList.push(jsonData); // create a list with all data
            });
            lastReadingTimestamp = dataList[0].timestamp; //oldest timestamp corresponds to the first on the list (oldest --> newest)
            reversedList = dataList.reverse(); // reverse the order of the list (newest data --> oldest data)
  
            var firstTime = true;
            // loop through all elements of the list and append to table (newest elements first)
            reversedList.forEach(element =>{
              if (firstTime){ // ignore first reading (it's already on the table from the previous query)
                firstTime = false;
              }
              else{
              //  var temperature = element.temperature;
              //  var humidity = element.humidity;
               // var pressure = element.pressure;
              //  var timestamp = element.timestamp;
                var temperature = element.db;
                var humidity = element.spo2;
                var pressure = element.pressure;
        //        var timestamp = element.time;

                for (var timestamp in data) {
                     var db = data[timestamp].db;
                    var spo2 = data[timestamp].spo2;
                    var time = data[timestamp].time;
                   }

                var content = '';
                content += '<tr>';
                ///content += '<td>' + epochToDateTime(timestamp) + '</td>';
              //  content += '<td>' + temperature + '</td>';
              //  content += '<td>' + humidity + '</td>';
              //  content += '<td>' + pressure + '</td>';
//content += '<td>' + epochToDateTime(timestamp) + '</td>';
                content += '<td>' + timestamp + '</td>';
                content += '<td>' + db + '</td>';
                content += '<td>' + spo2 + '</td>';
                content += '<td>' + time + '</td>';
                content += '</tr>';
                $('#tbody').append(content);
              }
            });
          }
        });
      }
  
      viewDataButtonElement.addEventListener('click', (e) =>{
        // Toggle DOM elements
        tableContainerElement.style.display = 'block';
        viewDataButtonElement.style.display ='none';
        hideDataButtonElement.style.display ='inline-block';
        loadDataButtonElement.style.display = 'inline-block'
        createTable();
      });
  
      loadDataButtonElement.addEventListener('click', (e) => {
        appendToTable();
      });
  
      hideDataButtonElement.addEventListener('click', (e) => {
        tableContainerElement.style.display = 'none';
        viewDataButtonElement.style.display = 'inline-block';
        hideDataButtonElement.style.display = 'none';
      });
  
    // IF USER IS LOGGED OUT
    } else{
      // toggle UI elements
      loginElement.style.display = 'block';
      authBarElement.style.display ='none';
      userDetailsElement.style.display ='none';
      contentElement.style.display = 'none';
      userDetailsElementp.style.display ='none';

    }
  }
 