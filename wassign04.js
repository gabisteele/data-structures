// Gabi Steele
// Assignment 4


// IN THE MONGO SHELL: 
// db.createCollection("aameetings")
// use aameetings

var request = require('request');
var fs = require("fs");

var url = 'mongodb://localhost:27017/aameetings';

var meetingLatLong = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/meetingsLatLong.txt'));

var MongoClient = require('mongodb').MongoClient, assert = require('assert');
 
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
    
  // if there was an error, print error
  assert.equal(null, err);
  
  var collection =  db.collection('aameetings');
  collection.insert(meetingLatLong);
    db.close();
});

