let fbResp= require("./facebookApiResponse.js");
let gAResp= require("./googleApiResponse.js");
let slackResp= require("./slackApiResponse.js");
<<<<<<< HEAD
let apiRespose=require("./apiAiResponse.js")
=======
let apiaiResp= require("./apiAiResponse.js");
>>>>>>> ba2429a3c040f04b7bfcfbb9e287259e6f79f0c3

function getApiResp(error,response,body,platform){
  if(platform == "facebook"){
    return fbResp.getFbResp(error,response,body);
  }
  else if(platform == "google"){
    return gAResp.getGaResp(error,response,body);
  }
  else if(platform == "slack"){
     return slackResp.lookupResp(error,response,body);
  }
  else{
    return apiaiResp.getApiResp(error,response,body);
  }
}

module.exports.getApiResp=getApiResp;
