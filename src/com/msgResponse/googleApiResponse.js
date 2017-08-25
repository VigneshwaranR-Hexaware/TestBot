var apiResponsePOJO=require('../config/apiResponsePOJO.js');
var responseType = require('../util/respType.js');
const logger= require('../service/logService.js');

var lookupResp=function(error,response,body){
    logMsg("INSIDE GOOGLE ACTIONS FILE");
    var respObjArr=[];
    var obj=(body.result.fulfillment.messages.length);
    logMsg("INSIDE GOOGLE ACTIONS FILE--MESSAGE LENGTH::"+obj);

    for(i=0;i<=obj;i++){
        logMsg("INSIDE GOOGLE ACTIONS FILE--MESSAGE::"+JSON.stringify(body.result.fulfillment.messages[i]));
        var platform_msg = body.result.fulfillment.messages[i];
        if(platform_msg) {
            var platform_compare=platform_msg.platform;
            logMsg("PLATFORM:::"+platform_compare);
            if(platform_compare){
                if (platform_compare=="google")
                {
                    var typeOf = body.result.fulfillment.messages[i].type;
                    logMsg("INSIDE GOOGLE ACTIONS FILE--TYPE::"+typeOf);
                    var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    switch(typeOf){
                        case 'simple_response':// simple_response
                            if (!error && response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.speech=JSON.stringify(platform_msg.textToSpeech);
                                logMsg("SPEECH:::"+apiRespObj.speech);
                                 apiRespObj.respType=responseType.SPEECH;
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 1:// basic_card
                            if ( !error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.title = platform_msg.title;
                                apiRespObj.subtitle = platform_msg.subtitle;
                                apiRespObj.imageUrl = platform_msg.imageUrl;
                                respObjArr.push(apiRespObj);
                                  apiRespObj.respType=responseType.CAROUSEL;
                                logMsg("TITLE:::"+apiRespObj.title);
                            }
                        break;
                        case 2:// list
                            if (!error && response.statusCode === 200) {

                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.title=JSON.stringify(platform_msg.title);
                                logMsg("TITLEwwww:::"+apiRespObj.title);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 'suggestion_chips'://suggestion_chips
                            if (!error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                var titlearray=[];
                                if(platform_msg.suggestions){
                                 for(i=0;i<platform_msg.suggestions.length;i++){
                                  titlearray.push(platform_msg.suggestions[i].title);
                                 }
                                }
                                apiRespObj.respType=responseType.PAYLOAD;
                                apiRespObj.custPayloadTitle=titlearray;
                                respObjArr.push(apiRespObj);
                            }
                        break;

                         case 4://link out chip
                            if (!error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.imageUrl=JSON.stringify(platform_msg.imageUrl);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 5:// custom payload
                                if (!error && response.statusCode === 200) {
                                    apiRespObj.payload=JSON.stringify(platform_msg.payload);
                                    respObjArr.push(apiRespObj);
                              }
                        break;
                        default:
                        break;
                    }

            }
        }
    }

}
//  console.log("TO PRINT THE RSP OBJ"+JSON.stringify(respObjArr));
  if(!(respObjArr.length>0)){
    logMsg("INSIDE DEFAULT");
    var apiRespObj = new apiResponsePOJO.apiResponseObject();
    apiRespObj.speech=body.result.fulfillment.speech.replace(/"/g, "");
    logMsg("SPEECH GA DFAULT:::"+apiRespObj.speech);
     apiRespObj.respType=responseType.SPEECH;
    //  return apiRespObj;
    respObjArr.push(apiRespObj);
  }
  return respObjArr;
}

var logMsg = function(str) {
  //logger.traceData(str);
  console.log(str);
}


module.exports.lookupResp=lookupResp;
