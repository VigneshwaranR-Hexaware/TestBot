


var getMessage = function getMessageResponse (error, response, body,platformType) {
   if (error) throw new Error(error);
    console.log("Messages"+ obj);
    if(platformType == "facebook"){
      reaponseMessage(body);
    }
}

// function reaponseMessage(body){
//   var type=[];
//   var obj=(body.result.fulfillment.messages.length);
//   for(i=0;i<=obj;i++){
//     //type.push(body.result.fulfillment.messages[i].type);
//     if(Json.stringify(body.result.fulfillment.messages[i].type) == 0){
//       var message=JSON.stringify(body.result.fulfillment.speech);
//       if (!error && response.statusCode === 200) {
//          var message=JSON.stringify(body.result.fulfillment.speech).replace(/"/g, "");
//          return message;
//       }
//     }
//     else if(Json.stringify(body.result.fulfillment.messages[i].type) == 1){

//     }
//   }
// }



module.exports.getMsgFromResp=getMessage;
