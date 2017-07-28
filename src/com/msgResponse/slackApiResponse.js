var apiResponsePOJO=require('../config/apiResponsePOJO.js');
var response = require("response");
var lookupResp=function(body){
  var type=[];
  var obj=(body.result.fulfillment.messages.length);
  for(i=0;i<=obj;i++){
   var typeOf = body.result.fulfillment.messages[i].type;
   var  apiRespObj = new apiResponsePOJO.apiResponseObject(); 
   switch(typeOf){
       
        case 0:// text response
        
          if ( response.statusCode === 200) {
             apiRespObj.speech=JSON.stringify(body.result.fulfillment.speech);
             console.log("SPEECH:::"+apiRespObj.speech);
             return apiRespObj;
          }
           break;
        case 1:// card
               
          if ( response.statusCode === 200) {
            apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
            apiRespObj.subtitle=JSON.stringify(body.result.fulfillment.subtitle);
            apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
            console.log("TITLE:::"+apiRespObj.title);
             return apiRespObj;
          }
                 break;
        case 2:// quickreply
        
            if ( response.statusCode === 200) {
                apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
            return apiRespObj;
          }
                 break;
        case 3://imageUrl
            
                if (response.statusCode === 200) {
                    apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
                return apiRespObj;
            }
                 break;
        case 4:// custome payload
            
                    if ( response.statusCode === 200) {
                        apiRespObj.payload=JSON.stringify(body.result.fulfillment.payload);
                    return apiRespObj;
                }
                break;
       default:

           break;
     }

}

//module.exports.fbResp= lookupResp; 

}

module.exports.lookupResp=lookupResp;