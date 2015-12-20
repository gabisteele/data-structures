var request = require('request');
var fs = require('fs');

request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?searchstr=&Search=Search&borough=M&zone=Zone&zipcode=Zip+Code&day=&StartTime=&EndTime=&meetingtype=&SpecialInterest=', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/ManhattanAllInfo.txt', body);
  }
  else {console.error('request failed')}
})

