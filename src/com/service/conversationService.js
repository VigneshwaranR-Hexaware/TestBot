//var inputfile = require('../data/VFSComplaintRequest.txt');
var LineReader = require('linereader');

var jsUtil=require('util');

var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var queryService=require('./queryService');
var util=require('../config/util.js');

const responseMap = new Map();


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
var custLineNo = -1;
  rl.on('line',function(lineno,line) {
    currentLine=line;

        var prefix=currentLine.split(":");

        if(prefix[0]=='Cust'){
                //var queryServ = new queryProcessing(prefix[1]);
                custLineNo = lineno;
                console.log("CUST LINE NO"+custLineNo+"QUERY TO API::"+prefix[1]);
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


function pushToMap(lineNumber, respString) {

    var respArray = responseMap.get(lineNumber);
    if(!respArray) {
        respArray = new Array();
        responseMap.set(lineNumber, respArray);
            }
    respArray.push(respString);
}
