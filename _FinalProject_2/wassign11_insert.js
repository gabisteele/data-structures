var http = require('http');
var pg = require('pg');

// supply connection string through an environment variable
var conString = "postgres://gabisteele:gabi3000@data-structures.cdp3q92nnmui.us-west-2.rds.amazonaws.com:5432/postgres";

var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var sensor = new five.Sensor("A0");
  
  // Scale the sensor's data from 0-1023 to 0-10 and log changes
  sensor.scale(0, 1000).on("change", function() {
    console.log(this.value);
  });
});

// insert when pressure is applied
        client.query("INSERT INTO sensorData maxSensorVal (numeric);", function(err, result) {

        done();

        if(err) {
          return console.error('error running query', err);
        }
        console.log(result);
      });
      
