var LineReader = require('linereader');
var jsUtil=require('util');
var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var QueryService=require('./queryServiceNew');
var appConfig=require('../config/appConfig');
var appConst = require('../util/appConstants.js');
var expectedRespObj = require('../config/apiResponsePOJO.js');

function processRequest() {
    const fs = require('fs');

    var utterances = new Array();;


    var reader = new LineReader(appConfig.YWSinputfile);

    var quest = new Array();
      reader.on('line',function(lineno,line) {
            utterances.push(line);
      });

      reader.on('end', function () {
            var failedUtterances = new Array();;
            var tcPassedCount = 0;
            var tcFailedCount = 0;
            var totalTC = 0;
            var queryServ = new QueryService.QueryProcessor(responseMap, quest);
      });

      reader.on('error',function(err){
            logMsg(err);
      });
}

var logMsg = function(str) {
    logger.traceData(str);
}

function checkUtterances(utterances, failedUtterances, tcPassedCount, tcFailedCount, totalTC) {
    var processCompleted = false;
    if(utterances.length > 0 ) {
          totalTC ++;
          var utteranceToTest = questArray.shift();
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
                  query: [utteranceToTest], lang: 'en', sessionId: '1234567'
              },
              json: true
          };

     var handleResp = function(error, response, body){

          var failed = false;

          //Logic to check the intent should come here
          var respObj = switchRespose.getApiResp(error, response, body, appConfig.PLATFORM_INTENT);

             if(respObj.intentName != appConfig.TEST_INTENT_NAME || error) {
                 failedUtterances.push(utteranceToTest);
                 tcFailedCount++;
             } else {
                 tcPassCount ++;
             }

          checkUtterances(utterances, failedUtterances, tcPassedCount, tcFailedCount, totalTC);
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
