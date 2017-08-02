const express = require('express');
const https= require('https');
var http = require('http');
var apiai = require('apiai');
const bodyParser = require('body-parser');
var request = require("request");
var stringSimilarity = require('string-similarity');

const JSONbig = require('json-bigint');
const assert = require('assert');
const appConfig= require('../config/appConfig.js');
const logger= require('./logService.js');
var util=require('../config/util.js');
var responsePojo=require('../config/apiResponsePOJO.js');
var switchRespose=require('../msgResponse/respSwitch.js');

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
       authorization: appConfig.developerAccessToken
     },
    body: {
        query: [questAndLine[1]], lang: 'en', sessionId: '1234567'
    },
    json: true
  };

   var handleResp = function(error,response, body){
    var  apiRespObj = new responsePojo.apiResponseObject();
        var platform="slack";
          var respObjArrTemp=[];
         respObjArrTemp = switchRespose.getApiResp(error, response, body,platform);
         console.log("RESPONSE RECEIVED FROM SLACK IN QUERYSERVICE:::"+JSON.stringify(respObjArrTemp));
         var apiRespToCompare=processObj(apiRespObj);
         console.log("STRING TO BE COMPARED FROM API::;"+apiRespToCompare);
          logMsg("RESP MAP SIZE IN in query servixce::"+responseMap.size);
          var linetempno=questAndLine[0];
          expectedResponse= responseMap.get(parseInt(linetempno));
            var result=checkResponse(apiRespToCompare,expectedResponse);
            var status = "failed";
            if(result) {
                status = "Passed";
            }
          logger.logConvResult(linetempno, questAndLine[1], expectedResponse, apiRespToCompare, status);
          QueryProcessor(responseMap, questArray);
  }
      request(options,handleResp);
  }

}

function processObj(resp){
    console.log(resp);
    var response="";
      if((resp.speech != null) || (resp.speech!=undefined)){
        console.log("Entered into loop");
         response= JSON.stringify(resp.speech);
         console.log("RESPONSE INSIDE PROCESSOBJ SPEEch:::"+response);
      }
      else if((resp.title || resp.subtitle != null)|| (resp.title || resp.subtitle != undefined)){
          response = (resp.title && resp.subtitle != null)?JSON.stringify(resp.title) + JSON.stringify(resp.subtitle):JSON.stringify(resp.title);
          console.log("RESPONSE INSIDE PROCESSOBJ CARD:::"+response);
      }
     else if((resp.imageUrl !=null)||(resp.imageUrl != undefined)){
       response=resp.imageUrl;
       console.log("Image response ="+ response);
     }
    else if((resp.payload !=null)||(resp.payload != undefined)){
        response=resp.payload;
    }

     return response;
}

function checkResponse(botResponse, expectedResp) {

      

}


function checkSpeechResponse(responseFromApi,expectedResponse ){
      logMsg("API::"+responseFromApi+"EXPECTED::"+expectedResponse);

      if(responseFromApi && expectedResponse) {
        var bstMatch = stringSimilarity.findBestMatch(responseFromApi, expectedResponse);
        console.log("RESULT COMPARE:"+bstMatch.bestMatch.rating );
        return (bstMatch.bestMatch.rating > 0.75);
      }

      return false;

}

var logMsg = function(str) {}

module.exports.QueryProcessor=QueryProcessor;
