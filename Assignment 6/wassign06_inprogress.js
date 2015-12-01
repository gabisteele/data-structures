// -----------------------------------
// Data Structures - Assignment 6
//
// Gabi Steele
// -----------------------------------


var fs  = require("fs"); // npm install fs
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var apiKey = process.env.API_KEY; 
var meetingsData = []; // make empty array for data results
var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// grab cleaned array of addresses 
var addresses = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/meetingsdata.txt'));


function addressClean (dirtyAddress) {
    var cleanAddress = dirtyAddress; 
    
    cleanAddress = cleanAddress.substring(0, cleanAddress.indexOf(',')) + ", New York, NY"
    cleanAddress = cleanAddress.toUpperCase();
    
    return cleanAddress; 
}

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressClean(value).split(' ').join('+') + '&key=' + apiKey; 
    var thisMeeting = new Object;
    thisMeeting.address = addressClean(value);
    thisMeeting.originalAddress = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        if (JSON.parse(body).status != "ZERO_RESULTS") {
            thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        }
        else {console.log(apiRequest);}
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 3000);

// }, function() {
//     fs.writeFile('locationmeetingdata.txt', JSON.stringify(meetingsData), function (err) { 
//         if (err) 
//         return console.log('Error');
//         console.log('Wrote ' + meetingsData.length + ' entries to file ' + 'meetingdata.txt');
        
//     });
});