var apiResponsePOJO=require('../config/apiResponsePOJO.js');
var responseType = require('../util/respType.js');
const logger= require('../service/logService.js');

var lookupResp=function(error,response,body){


 var apiRespObj = new apiResponsePOJO.apiResponseObject();


if((body.result.action)||(body.result.metadata.intentName)){

 apiRespObj.actionName=body.result.action;
 apiRespObj.intentName=body.result.metadata.intentName;
 //console.log("action and intent::::::"+apiRespObj.intentName);
 }

  //console.log("action and intent::"+apiRespObj.actionName+"::::"+apiRespObj.intentName);
return apiRespObj;

}

var logMsg = function(str) {
   logger.traceData(str);
  //console.log(str);
}


module.exports.lookupResp= lookupResp;
