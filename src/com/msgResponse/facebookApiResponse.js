var lookupResp=function(body){

  var responceObject=[];
  var obj=(body.result.fulfillment.messages.length);
  for(i=0;i<=obj;i++){
   var platform_msg = body.result.fulfillment.messages[i];
   if(platform_msg) {
       var platform_compare=platform_msg.platform;
       console.log("PLATFORM:::"+platform_compare);
       if(platform_compare){
           if (platform_compare=="facebook")
           {
               var typeOf = body.result.fulfillment.messages[i].type;

               switch(typeOf){

                 case 0:// text response
                       if(!error && response.statusCode === 200) {
                       var apiRespObj = new apiResponsePOJO.apiResponseObject();
                       apiRespObj.speech=JSON.stringify(body.result.fulfillment.speech).replace(/"/g, "");
                       console.log("SPEECH:::"+apiRespObj.speech);
                       //  return apiRespObj;
                       responceObject.push(apiRespObj);
                     }
                     break;
                case 1:// card
                        if(!error && response.statusCode === 200) {
                        var apiRespObj = new apiResponsePOJO.apiResponseObject();
                        apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
                        apiRespObj.subtitle=JSON.stringify(body.result.fulfillment.subtitle);
                        apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
                        console.log("card:::"+apiRespObj.title);
                        //return apiRespObj;
                        responceObject.push(apiRespObj);
                     }
                     break;

                case 2:// queck repl
                        if(!error && response.statusCode === 200) {
                        var apiRespObj = new apiResponsePOJO.apiResponseObject();
                        apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
                        console.log("quest repl:::"+apiRespObj.title);
                        //return apiRespObj;
                        responceObject.push(apiRespObj);
                      }
                      break;

               case 3://imageUrl
                       if(!error && response.statusCode === 200) {
                       var apiRespObj = new apiResponsePOJO.apiResponseObject();
                       apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
                       console.log("imageUrl:::"+apiRespObj.imageUrl);
                        //return apiRespObj;
                      responceObject.push(apiRespObj);
                      }
                      break;

               case 4:// custome
                        if(!error && response.statusCode === 200) {
                        var apiRespObj = new apiResponsePOJO.apiResponseObject();
                        apiRespObj.payload=JSON.stringify(body.result.fulfillment.payload);
                        console.log("custome:::"+apiRespObj.payload);
                        //return apiRespObj;
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
            return responceObject;
           };
module.exports.fbResp= lookupResp;
