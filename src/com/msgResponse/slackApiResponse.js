var apiResponsePOJO=require('../config/apiResponsePOJO.js');

var lookupResp=function(error,response,body){
     console.log("INSIDE SLACK FILE");
  var type=[];
  var obj=(body.result.fulfillment.messages.length);
   console.log("INSIDE SLACK FILE--MESSAGE LENGTH::"+obj);
    console.log("INSIDE SLACK FILE--MESSAGE::"+JSON.stringify(body.result.fulfillment.messages[0])); 
    console.log("INSIDE SLACK FILE--MESSAGE::"+JSON.stringify(body.result.fulfillment.messages[1]));   
    console.log("INSIDE SLACK FILE--MESSAGE::"+JSON.stringify(body.result.fulfillment.messages[2]));  
  for(i=0;i<=obj;i++){
     

   var typeOf = body.result.fulfillment.messages[i].type;
   console.log("INSIDE SLACK FILE--TYPE::"+typeOf);
   var  apiRespObj = new apiResponsePOJO.apiResponseObject(); 
   switch(typeOf){
       
        case 0:// text response
        
          if (!error && response.statusCode === 200) {
             apiRespObj.speech=JSON.stringify(body.result.fulfillment.speech);
             console.log("SPEECH:::"+apiRespObj.speech);
             return apiRespObj;
          }
           break;
        case 1:// card
               
          if ( !error &&response.statusCode === 200) {
            apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
            apiRespObj.subtitle=JSON.stringify(body.result.fulfillment.subtitle);
            apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
            console.log("TITLE:::"+apiRespObj.title);
             return apiRespObj;
          }
                 break;
        case 2:// quickreply
        
            if (!error && response.statusCode === 200) {
                apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
                 console.log("TITLEwwww:::"+apiRespObj.title);
            return apiRespObj;
          }
                 break;
        case 3://imageUrl
            
                if (!error &&response.statusCode === 200) {
                    apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
                return apiRespObj;
            }
                 break;
        case 4:// custome payload
            
                    if (!error && response.statusCode === 200) {
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