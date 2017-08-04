var LineReader = require('linereader');
var jsUtil=require('util');
var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var QueryService=require('./queryServiceNew');
var util=require('../config/util.js');
var appConst = require('../util/appConstants.js');
var expectedRespObj = require('../config/apiResponsePOJO.js');

const responseMap = new Map();

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
  responseMap.forEach(function(value, key) {
  console.log(key + ' = ' + JSON.stringify(value));
});
  var queryServ = new QueryService.QueryProcessor(responseMap, quest);
  });

rl.on('error',function(err){
    logMsg(err);
});
}



function pushToMap(lineNumber, respString) {

    if(respString) {
      var respPOJOArray = responseMap.get(lineNumber);
      if(!respPOJOArray) {
          respPOJOArray = new Array();
          responseMap.set(lineNumber, respPOJOArray);
      }

      var expRespObj = parseExpectedResp(respString);


      respPOJOArray.push(expRespObj);
    }
}

var logMsg = function(str) {
    logger.traceData(str);
}

var parseExpectedResp = function(respString) {
    var expRespObj = new expectedRespObj.apiResponseObject();
    if(respString.startsWith(appConst.IMAGE_TOKEN)) {
        var imageTokens = respString.split(appConst.RESPONSE_SPLITER);
        if(imageTokens.length > 1) {
            if(imageTokens.length == 2) {
                if(imageTokens[1].indexOf('//') >= 0) {
                    expRespObj.imageUrl = imageTokens[1];
                } else {
                    expRespObj.title = imageTokens[1];
                }
            } else {
                expRespObj.title = imageTokens[1];
                expRespObj.subtitle = imageTokens[2];
            }
        } else if(respString === appConst.IMAGE_TOKEN) {
            expRespObj.printImage = true;
        } else {
            expRespObj.expectedSpeech = respString.split(appConst.RESPONSE_SPLITER);
        }

    } else {
          expRespObj.expectedSpeech = respString.split(appConst.RESPONSE_SPLITER);
    }
    return expRespObj;
}

processRequest();
