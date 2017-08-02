var apiResponsePOJO=require('../config/apiResponsePOJO.js');

var apiResp=function(error,response,body){
var apiRespArray=[];
var obj=(body.result.fulfillment.messages.length);
    for(i=0;i<=obj;i++){
        var typeOf = body.result.fulfillment.messages[i].type;
        console.log("INSIDE SLACK FILE--TYPE::"+typeOf);
            if(typeOf == 0){
                if (!error && response.statusCode === 200) {
                    var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    apiRespObj.speech=JSON.stringify(body.result.fulfillment.messages[i].speech);
                    console.log("SPEECH:::"+apiRespObj.speech);
                    apiRespArray.push(apiRespObj);
                }
            }
            else{
                if (!error && response.statusCode === 200) {
                    var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    apiRespObj.payload=JSON.stringify(body.result.fulfillment.messages[i].payload);
                    apiRespArray.push(apiRespObj);
                }
            }
    }
    return apiRespArray;
}

module.exports.getApiAiResp=apiResp;
