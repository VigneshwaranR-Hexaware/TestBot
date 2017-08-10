let fbResp= require("./facebookApiResponse.js");
let gAResp= require("./googleApiResponse.js");
let slackResp= require("./slackApiResponse.js");
let apiRespose=require("./apiAiResponse.js")
let intentResp=require("./intentCheckResponse.js")
function getApiResp(error,response,body,platform){
  if(platform == "facebook"){
    console.log("comeing inside");
    return fbResp.lookupResp(error,response,body);
  }
  else if(platform == "google"){
    console.log("comeing inside");
    return gAResp.getGaResp(error,response,body);
  }
  else if(platform == "slack"){
    console.log("comeing inside");
     return slackResp.lookupResp(error,response,body);
  }
  else if(platform=="checkintent"){
    console.log("comeing inside");
    return intentResp.lookupResp(error,response,body);
  }
  else{
    console.log("comeing inside");
    return apiRespose.getApiAiResp(error,response,body);

  }
}

module.exports.getApiResp=getApiResp;
