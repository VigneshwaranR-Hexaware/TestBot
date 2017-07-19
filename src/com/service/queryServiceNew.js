const express = require('express');
const https= require('https');
var http = require('http');
var apiai = require('apiai');
const bodyParser = require('body-parser');
var request = require("request");

const JSONbig = require('json-bigint');
const assert = require('assert');
const appConfig= require('../config/appConfig.js');
const logger= require('./logService.js');
var util=require('../config/util.js');

var expectedResponse=[];
var tcPassCount=0;
var tcFailCount=0;

//Processing Query Parameter
function QueryProcessor(responseMap,questArray) {
  var processCompleted = false;
  if(questArray.length > 0 ) {
    var questAndLine = questArray.shift().split("::");
    var options = {
    method: 'POST',
    url: 'https://api.api.ai/v1/query',
    qs: { v: '20150910' },
    headers:
     {
       'cache-control': 'no-cache',
       'content-type': 'application/json',
       authorization: appConfig.vfsAccessToken
     },
    body: {
        query: [questAndLine[1]], lang: 'en', sessionId: '1234567'
    },
    json: true
  };

  var handleResp = function(error,response, body){
         var message= util.getMsgFromResp(error, response, body);
          logMsg("RESP MAP SIZE IN in query servixce::"+responseMap.size);
          responseMap.forEach(function(value, key) {
          });
          var linetempno=questAndLine[0];
          expectedResponse= responseMap.get(parseInt(linetempno));
        var result=assert.equal(message,expectedResponse.toString().trim());
        console.log("expected response="+ expectedResponse)
        console.log("expected response Type="+ typeof(expectedResponse));
        console.log("assertResult ="+ result);
        var status = "failed";
        if(result) {
            status = "Passed";
        }
          logger.logConvResult(linetempno, questAndLine[1], expectedResponse, message, status);
          QueryProcessor(responseMap, questArray);
  }
      request(options,handleResp);
  }

}

function checkResponse(responseFromApi,expectedResponse ){
      logMsg("API::"+responseFromApi+"EXPECTED::"+expectedResponse);
    if(expectedResponse && expectedResponse.indexOf(responseFromApi) > -1) {
      logMsg("test case passed");
      return true;
    }
    else{
    logMsg("test case failed");
    return false;
}
}

var logMsg = function(str) {}

module.exports.QueryProcessor=QueryProcessor;
