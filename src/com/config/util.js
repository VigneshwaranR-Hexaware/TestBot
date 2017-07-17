
var getMessage = function getMessageResponse (error, response, body) {
   if (error) throw new Error(error);
   console.log(body);
   console.log("Body Message" + body.result.fulfillment.speech);
    var message=JSON.stringify(body.result.fulfillment.speech);
    console.log("message" + message);
    if (!error && response.statusCode === 200) {
      var message=JSON.stringify(body.result.fulfillment.speech);
        return message;
   }
    return null;
}

module.exports.getMsgFromResp=getMessage;