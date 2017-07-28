var apiResponsePOJO=require('../config/apiResponsePOJO.js');

var lookupResp=function(error,response,body){
  var type=[];
  var obj=(body.result.fulfillment.messages.length);
  for(i=0;i<=obj;i++){
   var typeOf = body.result.fulfillment.messages[i].type;
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
         //   apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
         //  image.url
              apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.image.url);
           
            console.log("TITLE:::"+apiRespObj.title);
             return apiRespObj;
          }
                 break;
        case 2:// suggestion chips
        
            if (!error && response.statusCode === 200) {
                apiRespObj.subtitle=JSON.stringify(body.result.fulfillment.title);
                  apiRespObj.title=JSON.stringify(body.result.fulfillment.suggestions[i].title);
            apiRespObj.subtitle=JSON.stringify(body.result.fulfillment.subtitle);
         //   apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
         //  image.url
              apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.image.url);
           
            return apiRespObj;
          }
                 break;
        case 3://link_out_chip
            
                if (!error &&response.statusCode === 200) {
             //       apiRespObj.type=JSON.stringify(body.result.fulfillment.type);
             //       apiRespObj.platform=JSON.stringify(body.result.fulfillment.platform);
                     apiRespObj.destinationName=JSON.stringify(body.result.fulfillment.destinationName);
                        apiRespObj.imageurl=JSON.stringify(body.result.fulfillment.url);
           
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
