let fbResp= require("./facebookApiResponse.js");
let gAResp= require("./googleApiResponse.js");
let slackResp= require("./slackApiResponse.js");

function getApiResp(error,response,body,platform){
  if(platform == "facebook"){
    return fbResp.getFbResp(error,response,body);
  }
  else if(platform == "google"){
    return gAResp.getGaResp(error,response,body);
  }
  else{
     return slackResp.lookupResp(error,response,body);
  }
}

module.exports.getApiResp=getApiResp;
