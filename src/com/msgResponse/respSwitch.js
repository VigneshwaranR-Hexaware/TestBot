let fbResp= require("./facebookApiResponse.js");
let gAResp= require("./googleApiResponse.js");
let slackResp= require("./slackApiResponse.js");

function getApiResp(error,response,body,platform){
  if(platform == "facebook"){
    return fbResp.getFbResp(body);
  }
  else if(platform == "google"){
    return gAResp.getGaResp(body);
  }
  else{
     return slackResp.getslackResp(body);
  }
}

module.exports.getApiResp=getApiResp;