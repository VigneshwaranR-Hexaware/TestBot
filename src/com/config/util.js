
var getMessage = function getMessageResponse (error, response, body) {
   if (error) throw new Error(error);
   var type=[];
   var obj=(body.result.fulfillment.messages.length);
  //  obj.forEach(function(element) {
  //    console.log("element=" + element);
  //  }, this);
  // for(i=0;i<=mes)
   
    console.log("Messages"+ obj);
    var message=JSON.stringify(body.result.fulfillment.speech);
    //console.log(JSON.stringify(body.result));
    if (!error && response.statusCode === 200) {
      var message=JSON.stringify(body.result.fulfillment.speech).replace(/"/g, "");
        return message;
   }
    return null;
}



module.exports.getMsgFromResp=getMessage;
