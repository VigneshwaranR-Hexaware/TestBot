var LineReader = require('linereader');
var jsUtil=require('util');
var appConfig = require('../config/appConfig.js');
var logger=require('./logService');
var QueryService=require('./queryServiceNew');
var appConfig=require('../config/appConfig');
var appConst = require('../util/appConstants.js');
var expectedRespObj = require('../config/apiResponsePOJO.js');
var request = require("request");
var responsePojo=require('../config/apiResponsePOJO.js');
var switchRespose=require('../msgResponse/respSwitch.js');
var responseType = require('../util/respType.js');


function processRequest(expIndentName, dataFile) {
    const fs = require('fs');

    var utterances = new Array();;

    var reader = new LineReader(dataFile);

    var quest = new Array();
      reader.on('line',function(lineno,line) {
          var lineDetails = {
              "lineNo" : lineno,
              "line" : line,
              "expectedIndent" : "",
              "APIsIndent" : ""
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
    var utteranceLen = utterances.length;
    if(utteranceLen / 100 == 0) {
        console.log("processing.... Lines to process "+utteranceLen);
    }
    if(utteranceLen > 0 ) {
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

//console.log("INTENT FROM API:"+respObj.intentName+"EXPECTED:::"+appConfig.TEST_INTENT_NAME);
             if((respObj.intentName != expectedIndent) || error) {

                utteranceToTest.expectedIndent = expectedIndent;
                utteranceToTest.APIsIndent = respObj.intentName;

                 failedUtterances.push(utteranceToTest);
                 tcFailedCount++;
                 //logger.logOnFile(utteranceToTest.lineNo+ ":::INTENT FROM API: "+respObj.intentName+" EXPECTED::: "+expectedIndent);
             } else {
                 tcPassedCount ++;
             }

          checkUtterances(utterances, failedUtterances, tcPassedCount, tcFailedCount, totalTC, expectedIndent);
     }

      request(options,handleResp);
  } else {

          console.log("      Failed utterances are as follows ");
              for(var i=0; i < failedUtterances.length; i++) {
                  var lineDetail = failedUtterances[i];
                  console.log(lineDetail.lineNo +" Expected "+lineDetail.expectedIndent+" API's "+lineDetail.APIsIndent);
              }

          console.log("Testing has been completed. Please find the summary"
                          +"\n   Total TC Count     :: "+totalTC
                          +"\n   Passed TC Count    :: "+tcPassedCount
                          +"\n   Failed TC Count    :: "+tcFailedCount);

          var passPercentage=(tcPassedCount/totalTC)*100;
          console.log("\n  PASS PERCENTAGE    :: "+passPercentage+"%");

  }

}

processRequest(process.argv[2], appConfig.INDENT_VERIFY_PATH+process.argv[3]);
