
var getMessage = function getMessageResponse (error, response, body) {
   if (error) throw new Error(error);

    var message=JSON.stringify(body.result.fulfillment.speech);
    //console.log(JSON.stringify(body.result));
    if (!error && response.statusCode === 200) {
      var message=JSON.stringify(body.result.fulfillment.speech).replace(/"/g, "");
        return message;
   }
    return null;
}

module.exports.getMsgFromResp=getMessage;
