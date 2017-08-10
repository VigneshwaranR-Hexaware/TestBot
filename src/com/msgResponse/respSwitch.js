let fbResp= require("./facebookApiResponse.js");
let gAResp= require("./googleApiResponse.js");
let slackResp= require("./slackApiResponse.js");
let apiRespose=require("./apiAiResponse.js")
let intentResp=require("./intentCheckResponse.js")
function getApiResp(error,response,body,platform){
  if(platform == "facebook"){

    return fbResp.lookupResp(error,response,body);
  }
  else if(platform == "google"){
    return gAResp.getGaResp(error,response,body);
  }
  else if(platform == "slack"){
     return slackResp.lookupResp(error,response,body);
  }
  else if(platform=="checkintent"){
    return intentResp.lookupResp(error,response,body);
  }
  else{
    return apiRespose.getApiAiResp(error,response,body);
  }
}
module.exports.getApiResp=getApiResp;
