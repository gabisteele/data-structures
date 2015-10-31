//Gabi Steele
// Assignment 3 - Data Structures
// ----------------------------


// .subscript(x, y);
// x is where you start, y is where you end
// "220 West Houston Street, 2nd Floor,"
// .split() - gets rid of spaces
// .join - joins it together using ()
// x3.split('').join('+')v 
// check out the github gist to see how to fix up the addresses so they can be processed on google


var apiKey = process.env.API_KEY; // async.eachSeries(array, functionForValue, callbackFunction)
// var URLtoParse = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY';
// console.log(URLtoParse);
// command called printenv that prints out all the environment variables you have in your linnex installation
// environment variables are named in all camps
// make sure theres no spaces in your env variable

var request = require('request'); // npm install request
var async = require('async'); // npm install async


var fs = require('fs');
var meetingsData = []; // push to array of meetings data

// get addresses from array file
var addresses = JSON.parse(fs.readFileSync("/home/ubuntu/workspace/data/addresses.txt"));

// create an array for the address split up and + New York, NY
var addressSplit = [];
for (var i = 0; i < addresses.length; i++) {
    addressSplit.push(((addresses[i].substring(0, addresses[i].indexOf(','))) + ', New York, NY').split(' ').join('+'));

}
//console.log(addressSplit);}

// fix the messy addresses by replacing "downstairs"
function fixAddresses (oldAddress) {
    var newAddress = oldAddress.substring(0, oldAddress.indexOf(',')) + ", New York, NY";
    return newAddress;

}

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addressSplit, function(value, callback) {
    
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + fixAddresses(value).split(' ').join('+');
    var thisMeeting = new Object;
    thisMeeting.addressSplit = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
}
    });
    setTimeout(callback, 1000);},



function() {
    fs.writeFileSync('/home/ubuntu/workspace/data/meetingdata_geocodes.txt',  JSON.stringify(meetingsData));
    console.log(meetingsData);
});
