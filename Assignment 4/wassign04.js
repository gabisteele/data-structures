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
  
  // confirm successful connection to server
  console.log("Connected correctly to server");
 
  insertDocuments(db, function() {
    
    // close connection
    db.close();
  });
});

// function to insert info into documents, and documents into collection
var insertDocuments = function(db, callback) {
  // get the documents collection 
  var collection = db.collection('aameetings');
  // insert info from meetingsInfo to document collection
  collection.insert(
    meetingLatLong, function(err, result) {
    assert.equal(err, null);
    assert.equal(meetingLatLong.length, result.result.n);
    assert.equal(meetingLatLong.length, result.ops.length);
    console.log("Inserted " + meetingLatLong.length +" documents into the document collection");
    callback(result);
  });
};
