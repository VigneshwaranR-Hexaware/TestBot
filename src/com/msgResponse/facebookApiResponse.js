var lookupResp=function(body){

  var type=[];
  var obj=(body.result.fulfillment.messages.length);
  for(i=0;i<=obj;i++){
   var typeOf = body.result.fulfillment.messages[i].type;
   var apiRespObj = new apiResponsePOJO.apiResponseObject();
   switch(typeOf){

        case 0:// text response
                 if(!error && response.statusCode === 200) {
                  apiRespObj.speech=JSON.stringify(body.result.fulfillment.speech).replace(/"/g, "");
                  console.log("SPEECH:::"+apiRespObj.speech);
                  //  return apiRespObj;
             }
              break;

        case 1:// card
                if(!error && response.statusCode === 200) {
                apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
                apiRespObj.subtitle=JSON.stringify(body.result.fulfillment.subtitle);
                apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
                console.log("card:::"+apiRespObj.title);
                //return apiRespObj;
                }
                 break;

        case 2:// queck repl
              if(!error && response.statusCode === 200) {
                apiRespObj.title=JSON.stringify(body.result.fulfillment.title);
                console.log("quest repl:::"+apiRespObj.title);
               //return apiRespObj;
               }
                 break;

        case 3://imageUrl
               if(!error && response.statusCode === 200) {
               apiRespObj.imageUrl=JSON.stringify(body.result.fulfillment.imageUrl);
               console.log("imageUrl:::"+apiRespObj.imageUrl);
              //return apiRespObj;
                }
               break;

        case 4:// custome
                if(!error && response.statusCode === 200) {
                apiRespObj.payload=JSON.stringify(body.result.fulfillment.payload);
                console.log("custome:::"+apiRespObj.payload);
                //return apiRespObj;
              }

          break;

       default:

           break;
     }

}
return apiRespObj;
};
module.exports.fbResp= lookupResp;
