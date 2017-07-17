//var inputfile = require('../data/VFSComplaintRequest.txt');
var LineReader = require('linereader');

var jsUtil=require('util');

var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var queryService=require('./queryService');
var util=require('../config/util.js');

processRequest();



function processRequest() {
const fs = require('fs');
var currentLine=null;
var expectedResponse=[];
var failedLines=[];
var responseFromApi=null;
var tcPassCount=0;
var tcFailCount=0;

var rl = new LineReader(appConfig.inputfile);
  rl.on('line',function(lineno,line) {
    currentLine=line;
        var prefix=currentLine.split(":");

        if(prefix[0]=='Cust'){

                queryService.queryProcessing(prefix[1], getMessages);
                expectedResponse=new Array();
          }else if (prefix[0]=='Bot') {
              expectedResponse.push(prefix[1]);
          }
/*if(expectedResponse.length>0){
var result=checkResponse(responseFromApi,expectedResponse);
  if(result){
    tcPassCount++;
  }
  else{
    failedLines.push(lineno);
    tcFailCount++;
  }
}*/


  });

  rl.on('end', function () {


        logService.logResponse(tcPassCount,tcFailCount,failedLines);

  });
rl.on('error',function(err){
    console.log(err);
});



}

function checkResponse(responseFromApi,expectedResponse ){
  console.log("API::"+responseFromApi+"EXPECTED::"+expectedResponse);
if(expectedResponse.indexOf(responseFromApi) > -1) {
  console.log("test case passed");
  return true;
}
else{
console.log("test case failed");
return false;
}
}

function getMessages(error,response, body){
   var message= util.getMsgFromResp(error, response, body);
    console.log(message);
    console.log("Line number is "+lineNumber);
}
