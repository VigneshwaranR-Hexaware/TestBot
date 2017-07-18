var LineReader = require('linereader');
var appConfig = require('./appConfig.js');
var queryService=require('./queryService.js');
var async=require('async');
//var util=require('../config/util.js');
//var logService=require('./logService');
console.log('to call function')
processRequest();

function processRequest(){
const fs = require('fs');
var currentLine=null;
var expectedResponse=[];
var failedLines=[];
var responseFromApi=null;
var tcPassCount=0;
var tcFailCount=0;
  console.log(appConfig.inputfile);
  var rl="";
async.waterfall([
 rl = new LineReader(appConfig.inputfile);
  rl.on('line',function(lineno,line) {
    currentLine=line;
      var custLineNo = -1;
        var prefix=currentLine.split(":");

        if(prefix[0]=='Cust'){
                //var queryServ = new queryProcessing(prefix[1]);
                custLineNo = lineno;
                console.log("LINE NO"+custLineNo);
                queryService.queryProcessing(prefix[1], lineno, responseMap);
                expectedResponse=new Array();
          }else if (prefix[0]=='Bot') {
              console.log("LINE NO in bot"+custLineNo);
                pushToMap(custLineNo, prefix[1]);
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
