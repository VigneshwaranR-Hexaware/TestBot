var apiResponsePOJO=require('../config/apiResponsePOJO.js');
const logger= require('../service/logService.js');
var responseType = require('../util/respType.js');

var lookupResp=function(error,response,body){
    logMsg("INSIDE SLACK FILE");
    var respObjArr=[];
    var obj=(body.result.fulfillment.messages.length);
    logMsg("INSIDE SLACK FILE--MESSAGE LENGTH::"+obj);

    for(i=0;i<=obj;i++){
        logMsg("INSIDE SLACK FILE--MESSAGE::"+JSON.stringify(body.result.fulfillment.messages[i]));
        var platform_msg = body.result.fulfillment.messages[i];
        if(platform_msg) {
            var platform_compare=platform_msg.platform;
            logMsg("PLATFORM:::"+platform_compare);
            if(platform_compare){
                if (platform_compare=="slack")
                {
                    var typeOf = body.result.fulfillment.messages[i].type;
                    logMsg("INSIDE SLACK FILE--TYPE::"+typeOf);
                    //var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                    switch(typeOf){
                        case 0:// text response
                            if (!error && response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.speech=JSON.stringify(platform_msg.speech);
                                 apiRespObj.respType=responseType.SPEECH;
                                logMsg("SPEECH:::"+apiRespObj.speech);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 1:// card
                            if ( !error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.title = platform_msg.title;
                                apiRespObj.subtitle = platform_msg.subtitle;
                                apiRespObj.imageUrl = platform_msg.imageUrl;
                                  apiRespObj.respType=responseType.CAROUSEL;
                                respObjArr.push(apiRespObj);
                                logMsg("TITLE:::"+apiRespObj.title);
                            }
                        break;
                        case 2:// quickreply
                            if (!error && response.statusCode === 200) {

                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.title=JSON.stringify(platform_msg.title);
                                  apiRespObj.respType=responseType.QUICKREPLY;
                                logMsg("TITLEwwww:::"+apiRespObj.title);
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 3://imageUrl
                            if (!error &&response.statusCode === 200) {
                                var  apiRespObj = new apiResponsePOJO.apiResponseObject();
                                apiRespObj.imageUrl=JSON.stringify(platform_msg.imageUrl);
                                 apiRespObj.respType=responseType.IMAGE;
                                respObjArr.push(apiRespObj);
                            }
                        break;
                        case 4:// custome payload
                                if (!error && response.statusCode === 200) {
                                  var apiRespObj = new apiResponsePOJO.apiResponseObject();
                                //  apiRespObj.payload=platform_msg.payload;
                                  apiRespObj.speech=platform_msg.payload.facebook.text;
                                  logMsg("customer speech:::"+platform_msg.payload.facebook.text);
                                  var titlearray=[];
                                  for(i=0;i<platform_msg.payload.facebook.quick_replies.length;i++){
                                    titlearray.push(platform_msg.payload.facebook.quick_replies[i].title);
                                  }
                                  //return apiRespObj;
                                  apiRespObj.custPayloadTitle=titlearray;
                                  logMsg("customer title:::"+apiRespObj.custPayloadTitle);
                                  apiRespObj.respType=responseType.PAYLOAD;
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

logMsg("TO PRINT THE RSP OBJ"+JSON.stringify(respObjArr));
if(!(respObjArr.length>0)){
  logMsg("INSIDE DEFAULT");
  var apiRespObj = new apiResponsePOJO.apiResponseObject();
  apiRespObj.speech=body.result.fulfillment.messages[0].speech.replace(/"/g, "");
  logMsg("SPEECH FB DFAULT:::"+apiRespObj.speech);
   apiRespObj.respType=responseType.SPEECH;
  //  return apiRespObj;
  respObjArr.push(apiRespObj);
}

  return respObjArr;
}

var logMsg = function(str) {
  logger.traceData(str);
}


module.exports.lookupResp=lookupResp;
