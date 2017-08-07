var apiResponsePOJO=require('../config/apiResponsePOJO.js');
var responseType = require('../util/respType.js');
const logger= require('../service/logService.js');

var lookupResp=function(error,response,body){

  var responceObject=[];
  var obj=(body.result.fulfillment.messages.length);
  for(i=0;i<=obj;i++){
   var platform_msg = body.result.fulfillment.messages[i];
   if(platform_msg) {
       var platform_compare=platform_msg.platform;
       logMsg("PLATFORM:::"+platform_compare);
       if(platform_compare){
           if (platform_compare=="facebook")
           {
               var typeOf = body.result.fulfillment.messages[i].type;

               switch(typeOf){

                  case 0:// text response
                       if(!error && response.statusCode === 200) {
                       var apiRespObj = new apiResponsePOJO.apiResponseObject();
                       apiRespObj.speech=JSON.stringify(platform_msg.speech).replace(/"/g, "");
                       logMsg("SPEECH FB:::"+apiRespObj.speech);
                       //  return apiRespObj;
                       apiRespObj.respType=responseType.SPEECH;
                       responceObject.push(apiRespObj);
                     }
                     break;

                   case 1:// card
                        if(!error && response.statusCode === 200) {
                        var apiRespObj = new apiResponsePOJO.apiResponseObject();
                        apiRespObj.title=platform_msg.title;
                        apiRespObj.subtitle=platform_msg.subtitle;
                        apiRespObj.imageUrl=platform_msg.imageUrl;
                        logMsg("card FB:::"+apiRespObj.title);
                        //return apiRespObj;
                        apiRespObj.respType=responseType.CAROUSEL;
                        responceObject.push(apiRespObj);
                     }
                     break;

                   case 2:// queck repl
                        if(!error && response.statusCode === 200) {
                        var apiRespObj = new apiResponsePOJO.apiResponseObject();
                        apiRespObj.title=platform_msg.title;
                        logMsg("quest repl: FB::"+apiRespObj.title);
                        //return apiRespObj;
                        apiRespObj.respType=responseType.QUICKREPLY;
                        responceObject.push(apiRespObj);
                      }
                      break;

                  case 3://imageUrl
                       if(!error && response.statusCode === 200) {
                       var apiRespObj = new apiResponsePOJO.apiResponseObject();
                       apiRespObj.imageUrl=platform_msg.imageUrl;
                       logMsg("imageUrl:::"+apiRespObj.imageUrl);
                       apiRespObj.respType=responseType.IMAGE;
                        //return apiRespObj;
                      responceObject.push(apiRespObj);
                      }
                      break;

                  case 4:// custome
                        if(!error && response.statusCode === 200) {
                        var apiRespObj = new apiResponsePOJO.apiResponseObject();
                      //  apiRespObj.payload=platform_msg.payload;
                        apiRespObj.speech=platform_msg.payload.facebook.text;
                        logMsg("customer speech:::"+platform_msg.payload.facebook.text);
                        var titlearray=[];
                        if(platform_msg.payload.facebook.quick_replies){
                        for(i=0;i<platform_msg.payload.facebook.quick_replies.length;i++){
                          titlearray.push(platform_msg.payload.facebook.quick_replies[i].title);
                        }
                      }
                        //return apiRespObj;
                        apiRespObj.custPayloadTitle=titlearray;
                      //  logMsg("customer title:::"+apiRespObj.custPayloadTitle);
                        apiRespObj.respType=responseType.PAYLOAD;
                        responceObject.push(apiRespObj);
                       }
                       break;
                       default:
                       break;
                       }
                  }
                }
              }
            }
            logMsg("TO PRINT THE RSP OBJ"+JSON.stringify(responceObject));
            if(!(responceObject.length>0)){
              logMsg("INSIDE DEFAULT");
              var apiRespObj = new apiResponsePOJO.apiResponseObject();
              apiRespObj.speech=body.result.fulfillment.messages[0].speech.replace(/"/g, "");
              logMsg("SPEECH FB DFAULT:::"+apiRespObj.speech);
               apiRespObj.respType=responseType.SPEECH;
              //  return apiRespObj;
              responceObject.push(apiRespObj);
            }


            return responceObject;
           }

var logMsg = function(str) {
  //  logger.traceData(str);
  console.log(str);
}


module.exports.lookupResp= lookupResp;
