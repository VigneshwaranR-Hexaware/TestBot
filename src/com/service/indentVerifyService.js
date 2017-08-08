var LineReader = require('linereader');
var jsUtil=require('util');
var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var QueryService=require('./queryServiceNew');
var appConfig=require('../config/appConfig');
var appConst = require('../util/appConstants.js');
var expectedRespObj = require('../config/apiResponsePOJO.js');
var request = require("request");
var responsePojo=require('../config/apiResponsePOJO.js');
var switchRespose=require('../msgResponse/respSwitch.js');
var responseType = require('../util/respType.js');


function processRequest(expIndentName) {
    const fs = require('fs');

    var utterances = new Array();;

    var reader = new LineReader(appConfig.YWSinputfile);

    var quest = new Array();
      reader.on('line',function(lineno,line) {
          var lineDetails = {
              "lineNo" : lineno,
              "line" : line
          };
            utterances.push(lineDetails);
      });

      reader.on('end', function () {
            var failedUtterances = new Array();;
            var tcPassedCount = 0;
            var tcFailedCount = 0;
            var totalTC = 0;

            checkUtterances(utterances, failedUtterances, tcPassedCount, tcFailedCount, totalTC, expIndentName);
      });

      reader.on('error',function(err){
            logMsg(err);
      });
}

var logMsg = function(str) {
    logger.traceData(str);
}

function checkUtterances(utterances, failedUtterances, tcPassedCount, tcFailedCount, totalTC, expectedIndent) {
    var processCompleted = false;
    if(utterances.length > 0 ) {
          totalTC ++;
          var utteranceToTest = utterances.shift();
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
                  query: [utteranceToTest.line], lang: 'en', sessionId: '1234567'
              },
              json: true
          };

     var handleResp = function(error, response, body){

          var failed = false;

          //Logic to check the intent should come here
          var respObj = switchRespose.getApiResp(error, response, body, appConfig.PLATFORM_INTENT);
console.log("INTENT FROM API:"+respObj.intentName+"EXPECTED:::"+expectedIndent);
             if((respObj.intentName != expectedIndent) || error) {
                 failedUtterances.push(utteranceToTest);
                 tcFailedCount++;
             } else {
                 tcPassedCount ++;
             }

          checkUtterances(utterances, failedUtterances, tcPassedCount, tcFailedCount, totalTC, expectedIndent);
     }

      request(options,handleResp);
  } else {
        console.log("Testing has been completed. Please find the summary"
                    +"\n   Total TC Count     :: "+totalTC
                    +"\n   Passed TC Count    :: "+tcPassedCount
                    +"\n   Failed TC Count    :: "+tcFailedCount
                    +"\n   Failed utterances  :: "+failedUtterances);
  }

}



processRequest(process.argv[2]);
