// -----------------------------------
// Data Structures - Assignment 5
//
// Gabi Steele
// -----------------------------------

// Reorganizing the Data -- IDEAL FINAL FORMAT

// {
// meetingName: ....,
// locationName: ....,
// meetingAddress:....,
// accessibility: ....,
// meetingDetails: 
//                { day: .....,
//                startTime: ....,
//                endTime: ....,
//                meetingType: .....,
//                specialInterest: ....}
//}



// parsing meetingAddress && cleaning it
var fs = require('fs');
var cheerio = require('cheerio'); // npm install cheerio 
var addresses = [];
var meetingNames = [];
var day = [];
var startTime = [];
var endTime = [];
var specialInterest = [];
var accessibility = [];
var meetingDetails = [];

// put the url in here so you arent working of a txt file
var content = fs.readFileSync('/home/ubuntu/workspace/MTG_HTML/meetinginfoZone2.txt');
 

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

function numberDays(day) {
    if (day == "Sunday" || day == "s") {
        return 0;
    }
    else if (day == "Monday") {
        return 1;
    }
    else if (day == "Tuesday") {
        return 2;
    }
    else if (day == "Wednesday") {
        return 3;
    }
    else if (day == "Thursday") {
        return 4;
    }
    else if (day == "Friday") {
        return 5;
    }
    else if (day == "Saturday") {
        return 6;
    }
}
// still need to clean: special info 


function cleanIt (rawData) {
    var cleanData = {};
    
    // write a loop
    // for ( var i = cleanData; i < cleanData.length; i++) {
    
    
    //CLEAN STARTIME:
    cleanData.startTime = rawData.substr(rawData.indexOf('</b>') + 5, rawData.indexOf('</b>') - rawData.indexOf('<b>'));
    cleanData.startTime = cleanData.startTime.replace('<b>to<', '').trim();
    cleanData.startTime = cleanData.startTime.replace('<b>to', '').trim();
    cleanData.startTime = cleanData.startTime.replace('/b', '').trim();;
    
     //CLEAN ENDTIME:
    cleanData.endTime = rawData.substr(rawData.indexOf('to</b>') + 6, rawData.indexOf('<br>') - rawData.indexOf('</b>'));
    cleanData.endTime = cleanData.endTime.replace('<br><b>Meeting Type</b>', '').trim();
    cleanData.endTime = cleanData.endTime.replace('<br><b>Special Interest', '').trim();
    cleanData.endTime = cleanData.endTime.replace('\r\n\t\t\t \t\t\t<br>', '').trim();
    
    //CLEAN MEETING TYPE:
    cleanData.meetingType = rawData.substr(rawData.indexOf('Type</b> ') + 8, rawData.indexOf('<br>') - rawData.indexOf('</b>'));
    cleanData.meetingType = cleanData.meetingType.replace('<', " ").trim();
    cleanData.meetingType = cleanData.meetingType.replace('\r\n\t\t\t \t\t\t br>', " ").trim();
    cleanData.meetingType = cleanData.meetingType.replace('br><b>Sp', " ").trim();
    
    
    //CLEAN SPECIAL INTEREST
    cleanData.specialInterest = rawData.substr(rawData.indexOf('Interest</b>', '</b>'), rawData.indexOf('<br>')  - rawData.indexOf('</b>'));
    cleanData.specialInterest = cleanData.specialInterest.replace('Interest</b>', "");
    cleanData.specialInterest = cleanData.specialInterest.replace('\r\n\t\t\t \t\t\t<br', "")
    cleanData.specialInterest = cleanData.specialInterest.replace('\r', '');
    cleanData.specialInterest = cleanData.specialInterest.replace('\n', '');
    cleanData.specialInterest = cleanData.specialInterest.replace('\t', '');
    cleanData.specialInterest = cleanData.specialInterest.replace('\t\t \t\t\t<b', '');
    cleanData.specialInterest = cleanData.specialInterest.replace('\t\t \t\t\t<b', "");
    cleanData.specialInterest = cleanData.specialInterest.trim();
   
    // CLEAN DAYS
    cleanData.day = rawData.substr(rawData.indexOf('<b>') - 2, rawData.indexOf('From') - rawData.indexOf('<b>')); 
    cleanData.day = cleanData.day.replace('<b>','').trim();
    // console.log(cleanData.day);
    cleanData.day = numberDays(cleanData.day);
    
    // }
    return cleanData;
}


var table = $('tbody');
// creating a varable address to parse the table to find the rows and creating the each function
 $(table).find('tr').each(function(i, elem) {
        var obj = new Object; 
        
        // grabbing all the data and pushing it into a single object
         
        
        //obj.days = numberDays($(elem).find('td').next('td').find('b').eq(0).html());
        // obj.type = $(elem).find('td').eq(1).text();
        obj.meetingName = nameClean($(elem).find('b').eq(0).text().replace(/\s+/g,' ').trim()); 
        obj.locationName = $(elem).find('h4').eq(0).text().replace(/\s+/g,' ').trim();
        obj.meetingAddress = addressClean($(elem).html().split("<br>")[2].trim());
        obj.accessiblity = $(elem).find('span').eq(0).text().trim();
        //obj.specialInfo = $(elem).find('.detailsBox').eq(0).text().trim(); 
        obj.meetingDetails = cleanIt($(elem).find('td').eq(1).html());
    
        // obj.meetingDetails = $(elem).find('td').eq(1).html(); 
        addresses.push(obj);
        
        var meetingAddress = obj.meetingAddress;
        
    console.log(addresses);
    fs.writeFileSync('/home/ubuntu/workspace/data/zone2_clean.txt', JSON.stringify(addresses));
});

