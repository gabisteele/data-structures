// --------------------------------------------------------------------
//
// AA Meetings Mongo Query
//
// --------------------------------------------------------------------

var collName = 'ManhattanMeetings';

// get today's date
var currentDate = new Date();
var DayNum = currentDate.getDay();
var currentTime = currentDate.getHours();
//ends at 4am
var endTime = 4;

var nextDayNum = getnextDay(DayNum);

// function to change the day number by adding one -- unless its a 7 then reset to 0
function getnextDay(startDayNum){
    if (DayNum != 7){
        return DayNum+1;
    } else if (DayNum === 7){
        return 0
    }

}

// Connection URL
var url = 'mongodb://localhost:27017/aa';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }

    var collection = db.collection(collName);

    collection.aggregate( [

        { $unwind : "$meetingDetails" },
        
        { $match: {
        
            $or: [{
        
                $and: [{ "eachMeeting.meetingDayNum": DayNum },
                { "eachMeeting.meetingstartTime": { $gt: currentTime, $lt: 25 } } 
                ]},
        
                { $and: [{ "eachMeeting.meetingDayNum": nextDayNum },
                { "eachMeeting.meetingstartTime": { $gt: -1, $lt: endTime } } 
                ]}
            ]}},
        
        { $group : {  _id : { 
            
            meetingName : "$meetingName",
            locationName : "$locationName",
            accessiblity: "$accessiblity",
                meetingDetails: {
                    // you need to push this information... look at mine
                    day:"$DayNum",
                    startTime:"$startTime",
                    endTime:"$endTime",
                    meetingType:"$meetingType",
                    specialInterest:"$specialInterest",
                        latLong:"$latLong"}
        
        }
                    }},
        
        // this is what outputs...
        // { $group : { _id : { latLong : "$_id.latLong" }, 
        //             meetingGroups : { $addToSet : {  meetingGroup : "$_id", 
        //      meetings : {
        //         meetingName : "$meetingName",
        //         locationName : "$locationName",
        //         accessiblity: "$accessiblity",
        //             meetingDetails: {
        //             day:"$DayNum",
        //             startTime:"$startTime",
        //             endTime:"$endTime",
        //             meetingType:"$meetingType",
        //             specialInterest:"$specialInterest"},
        //             latLong:"$latLong"
        //             }}}}}
        
         ]).toArray(function(err, docs) {
        if (err) {console.log(err);}
        else {
            console.log(docs);
            for (var i=0; i < docs.length; i++) {
                console.log(JSON.stringify(docs[i], null, 4));
                console.log('');
            }
        }
        db.close();
        
    });

});