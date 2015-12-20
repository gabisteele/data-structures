// --------------------------------------------------------
//
//  All meetings Mongo Insert
//
// --------------------------------------------------------

var fs = require('fs');
var collName = 'ManhattanMeetings';
var url = 'mongodb://localhost:27017/aa';
var meetingObjectArray = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/ASSIGNMENTS/ManhattanCleaned+geocodes.txt'));


var MongoClient = require('mongodb').MongoClient;

function mongoIt () {
    MongoClient.connect(url, function(err, db) {
        
        if (err) {return console.dir(err);}
    
        var collection = db.collection(collName);
    
            // WRITE TO MONGO
            collection.insert(meetingObjectArray);
    
        db.close();
    
    }); //MongoClient.connect
}

setTimeout(mongoIt, 200);