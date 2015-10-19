// -----------------------------------
// Data Structures - Assignment 5
//
// Gabi Steele
// -----------------------------------

// Reorganizing the Data -- IDEAL FINAL FORMAT

// {
// meetingName: ....,
// meetingAddress: ....,
// meetingTime: { day: .....,
//                start time: ....,
//                type: .....,
//              }
// special interest: ....
// accessibility: ....,
// meetingNotes: ....,
// }


// parsing meetingAddress && cleaning it
var fs = require('fs');
var cheerio = require('cheerio'); // npm install cheerio 
var addresses = [];
var meetingNames = [];
var days = [];
var times = [];
var specialInfo = [];
var accessibility = [];
var meetingNotes = [];

var content = fs.readFileSync('/home/ubuntu/workspace/data/meetinginfo.txt');

var $ = cheerio.load(content);

// cleaning Meeting addresses
// adding 'New York'

function addressClean (dirtyAddress) {
    var cleanAddress = dirtyAddress; 
    
    cleanAddress = cleanAddress.substring(0, cleanAddress.indexOf(',')) + ", New York, NY"
    cleanAddress = cleanAddress.toUpperCase();
    
    return cleanAddress; 
}

// cleaning Meeting Names
// Remove all characters AFTER '-' if they are same/similar to prior characters

function nameClean(dirtyNames) {
    
    var cleanNames;
    
    var second = dirtyNames.substr(dirtyNames.indexOf('-') + 2);
    var first = dirtyNames.substr(0, dirtyNames.indexOf('-') - 1);
    
    if (first == second.toUpperCase()) {
        cleanNames = first;
    } else if (second == "") {
        cleanNames = first;
    } else {
        cleanNames = second.toUpperCase();
    }
     return cleanNames;
    }

// still need to clean: special info 

var table = $('tbody');
// creating a varable address to parse the table to find the rows and creating the each function
 $(table).find('tr').each(function(i, elem) {
    $(elem).find('td').eq(0).each(function(i,elem){
        var obj = new Object; 
        
        // grabbing all the data and pushing it into a single object
         
        obj.meetingName = nameClean($(elem).find('b').eq(0).text().replace(/\s+/g,' ').trim()); 
        obj.locationName = $(elem).find('h4').eq(0).text().replace(/\s+/g,' ').trim();
        obj.meetingAddress = addressClean($(elem).html().split("<br>")[2].trim());
        obj.times = $(elem).find('td').eq(1).text(); 
        obj.days = $(elem).find('td').next('td').find('b').eq(0).html();
        obj.type = $(elem).find('td').eq(1).text();
        obj.accessible = $(elem).find('span').eq(0).text().trim();
        obj.specialInfo = $(elem).find('.detailsBox').eq(0).text().trim(); 
        obj.directions =  $(elem).find('.GetDirections').eq(0).html();
        
        // had trouble grabbing info on: days, meeting type, times
        // had trouble pushing times into separate object with separate arrays (day, start time, type)
    
        addresses.push(obj);
        
    });
    console.log(addresses);
});



