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
                custLineNo = lineno;
                quest.push(lineno+'::'+prefix[1]);
                readQuestiong++;
        }
        else if (prefix[0]=='Bot') {
                pushToMap(custLineNo, prefix[1]);
        }
  });

rl.on('end', function () {
  var queryServ = new QueryService.QueryProcessor(responseMap, quest);
  });

rl.on('error',function(err){
    logMsg(err);
});
}



function pushToMap(lineNumber, respString) {


if(respString)




    var respArray = responseMap.get(lineNumber);
    if(!respArray) {
        respArray = new Array();
        responseMap.set(lineNumber, respArray);
    }
    respArray.push(respString);
}

var logMsg = function(str) {}
