//var inputfile = require('../data/VFSComplaintRequest.txt');
var LineReader = require('linereader');

var jsUtil=require('util');

var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var QueryService=require('./queryServiceNew');
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
var readQuestiong = -1;
var quest = new Array();
  rl.on('line',function(lineno,line) {
    currentLine=line;

        var prefix=currentLine.split(":");



        if(prefix[0]=='Cust'){
                //var queryServ = new queryProcessing(prefix[1]);
                custLineNo = lineno;
                //logMsg("LINE NO"+custLineNo);
                quest.push(lineno+'::'+prefix[1]);

                /*if(readQuestiong == 2) {
                  //logMsg("Giving call "+quest);
                  responseMap.forEach(function(value, key) {
                      logMsg(key + " : " + value);
                  });
                    var queryServ = new QueryService.QueryProcessor(responseMap, lineno, quest);
                }*/
                readQuestiong++;
                //var queryServ = new QueryService.QueryProcessor(prefix[1], lineno);
                //logMsg(queryServ.processCompleted);
                /*

                }*/

                //setTimeout(logMsg("Waiting"), 1000);

                //queryService.queryProcessing(prefix[1], lineno, responseMap);
                expectedResponse=new Array();
          }else if (prefix[0]=='Bot') {
              //logMsg("LINE NO in bot"+custLineNo);
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

var queryServ = new QueryService.QueryProcessor(responseMap, quest);
      //  logService.logResponse(tcPassCount,tcFailCount,failedLines);

  });
rl.on('error',function(err){
    logMsg(err);
});



}

function checkResponse(responseFromApi,expectedResponse ){
  logMsg("API::"+responseFromApi+"EXPECTED::"+expectedResponse);
if(expectedResponse.indexOf(responseFromApi) > -1) {
  logMsg("test case passed");
  return true;
}
else{
logMsg("test case failed");
return false;
}
}

function pushToMap(lineNumber, respString) {
    var respArray = responseMap.get(lineNumber);
    if(!respArray) {
        respArray = new Array();
        responseMap.set(lineNumber, respArray);
    }
    respArray.push(respString);
}

var logMsg = function(str) {
    console.log(str);
}
