// -----------------------------------
// Data Structures - Assignment 2
//
// Gabi Steele
// -----------------------------------


// before running you must install cheerio
// "npm install request"
// "npm install cheerio"

var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/data/meetinginfo.txt');

var $ = cheerio.load(content);

$('table').children('tr').each(function() {
    if ($(elem).attr("cellpadding") == "5") {
        

    var text = $(this).text();
    if(parsedResults[i] == undefined){
        parsedResults[i] = {};
    };
    
    parsedResults[i].address = text.trim().replace(/^\s+|\s+$/gm,' ');
    
    
    console.log(parsedResults[i]);

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,' ');
}



        
  
    


    


