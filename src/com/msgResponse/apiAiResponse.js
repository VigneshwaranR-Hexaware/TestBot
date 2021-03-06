var apiResponsePOJO=require('../config/apiResponsePOJO.js');
var responseType = require('../util/respType.js');
const logger= require('../service/logService.js');

var getApiResp=function(error,response,body){
var apiRespArray=[];
var obj=(body.result.fulfillment.messages.length);
    for(i=0;i<=obj;i++){
        var typeOf = body.result.fulfillment.messages[i].type;
        logMsg("INSIDE SLACK FILE--TYPE::"+typeOf);
            if(typeOf == 0){
                if (!error && response.statusCode === 200) {
                    var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    apiRespObj.speech=JSON.stringify(body.result.fulfillment.messages[i].speech);
                    logMsg("SPEECH:::"+apiRespObj.speech);
                    apiRespObj.respType=responseType.SPEECH;
                    apiRespArray.push(apiRespObj);
                }
            }
            else{
                if (!error && response.statusCode === 200) {
                    var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    apiRespObj.payload=JSON.stringify(body.result.fulfillment.messages[i].payload);
                    apiRespObj.respType=responseType.PAYLOAD;
                    apiRespArray.push(apiRespObj);
                }
            }
    }
    return apiRespArray;
}

var logMsg = function(str) {
    logger.traceData(str);
}
