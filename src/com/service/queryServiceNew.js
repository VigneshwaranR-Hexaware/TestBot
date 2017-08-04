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
var responseType = require('../util/respType.js');

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
        var platform=appConfig.platform;
          var respObjArrTemp=[];
         respObjArrTemp = switchRespose.getApiResp(error, response, body,platform);
           console.log("RESPONSE RECEIVED FROM SLACK IN QUERYSERVICE:::"+JSON.stringify(respObjArrTemp));

          logMsg("RESP MAP SIZE IN in query servixce::"+responseMap.size);
          var linetempno=questAndLine[0];

          expectedResponse= responseMap.get(parseInt(linetempno));

            logMsg("RESPONSE RECEIVED FROM File :::"+JSON.stringify(expectedResponse));
            var result=checkResponse(0, linetempno, questAndLine[1], respObjArrTemp, expectedResponse);

            var status = "failed";
            if(result) {
                status = "Passed";
            }
        //  logger.logConvResult(linetempno, questAndLine[1], expectedResponse, apiRespToCompare, status);
          QueryProcessor(responseMap, questArray);
  }
      request(options,handleResp);
  }

}

function checkResponse(testUnitInd, lineNo, custSays, botResponse, expectedResp) {
      var tcResp = logger.getTCHeader(testUnitInd, lineNo, custSays);
      var expectedRespCount = expectedResp.length;
      var botRespCount = botResponse.length;
     if(expectedRespCount == botRespCount) {

          for(var i=0; i < expectedRespCount; i++) {
              var processingExpResp = expectedResp[i];
              var processingBotResp = botResponse[i];


              if(processingExpResp && processingBotResp) {
                  tcResp = tcResp + logger.getRespHeader(i+1);

                  switch (processingBotResp.respType) {
                    case responseType.SPEECH:
                        var testResult = checkSpeechResponse(processingBotResp.speech, processingExpResp.expectedSpeech);
                        tcResp = tcResp + logger.getConvResult(processingExpResp.expectedSpeech, processingBotResp.speech, testResult);
                      break;

                      case responseType.CAROUSEL:
                          var testTitleResult = checkCarouselResponse(processingBotResp.title, processingExpResp.title);
                          var testSubtitleResult = checkCarouselResponse(processingBotResp.subtitle, processingExpResp.subtitle);
                          tcResp = tcResp + logger.getCarouselResult(processingExpResp.title,processingBotResp.title,processingExpResp.subtitle,processingBotResp.subtitle,testTitleResult,testSubtitleResult);
                        break;

                        case responseType.PAYLOAD:
                            var testTextResult = checkSpeechResponse(processingBotResp.speech, processingExpResp.expectedSpeech);
                            var testpayloadtitleResult = checkCarouselResponse(processingBotResp.custPayloadTitle, processingExpResp.custPayloadTitle);
                            tcResp = tcResp + logger.getCarouselResult(processingBotResp.speech,processingExpResp.expectedSpeech,processingBotResp.custPayloadTitle,processingExpResp.custPayloadTitle,testTitleResult,testSubtitleResult);
                          break;

                    default:
                        logMsg("Response type not found "+processingBotResp.respType)
                      break;
                  }
              }

          }

      } else{
          tcResp = "\nExpected Response does not match with Bot responses. Expected Responses is / are "+expectedRespCount
                    +" where recevied bot responses is / are "+botRespCount + "\n";
      }

      tcResp = tcResp + logger.getTCFooter();
      logger.logOnConsole(tcResp);

}


function checkSpeechResponse(responseFromApi,expectedResponse ){
      logMsg("API::"+responseFromApi+"EXPECTED::"+expectedResponse);

      if(responseFromApi && expectedResponse) {
        var bstMatch = stringSimilarity.findBestMatch(responseFromApi, expectedResponse);
        logMsg("RESULT COMPARE:"+bstMatch.bestMatch.rating );
        return (bstMatch.bestMatch.rating > 0.75);
      }

      return false;

}

function checkCarouselResponse(responseFromApi,expectedResponse ){
      logMsg("API::"+responseFromApi+"EXPECTED::"+expectedResponse);

      if(responseFromApi && expectedResponse) {
        var bstMatchRating = stringSimilarity.compareTwoStrings(responseFromApi, expectedResponse);
        logMsg("RESULT COMPARE:"+bstMatchRating );
        return (bstMatchRating > 0.75);
      }

      return false;

}

var logMsg = function(str) {
  logger.traceData(str);
}

module.exports.QueryProcessor=QueryProcessor;
