// -----------------------------------
// Data Structures - Assignment 6
//
// Gabi Steele
// -----------------------------------


var fs  = require("fs"); // npm install fs
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var apiKey = 'AIzaSyBYGjnFKccZsi4XbW_lbNaz8O7Me29FXEE'; 
var meetingsData = []; // make empty array for data results
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var meetingAddress;

// grab cleaned array of addresses 
var addresses = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/ManhattanCleaned.txt'));

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.meetingAddress.split(' ').join('+') + '&key=' + apiKey; 
    var thisMeeting = value;
    // console.log(apiRequest)
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        if (JSON.parse(body).status != "ZERO_RESULTS") {
            thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        }
        else {console.log(apiRequest);}
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);

}, function() {
    fs.writeFile('ManhattanCleaned+geocodes.txt', JSON.stringify(meetingsData, null, '\t'), function (err) { 
        if (err) 
        return console.log('Error');
        console.log('Wrote ' + meetingsData.length + ' entries to file ' + 'ManhattanCleaned+geocodes.txt');
        
    });
});