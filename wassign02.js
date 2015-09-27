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
var addresses = [];

var content = fs.readFileSync('/home/ubuntu/workspace/data/meetinginfo.txt');

var $ = cheerio.load(content);

var table = $('tbody');
// creating a varable address to parse the table to find the rows and creating the each function
 $(table).find('tr').each(function(i, elem) {
    $(elem).find('td').eq(0).each(function(i,elem){
        addresses.push($(elem).html().split("<br>")[2].trim());
    });
});

