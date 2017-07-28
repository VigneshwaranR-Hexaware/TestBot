let fbResp= require("./facebookApiResponse.js");
let gAResp= require("./googleApiResponse.js");
let slackResp= require("./slackApiResponse.js");

function getApiResp(error,response,body,platform){
  if(platform == "facebook"){
     fbResp.getFbResp(body);
  }
  else if(platform == "google"){
     gAResp.getGaResp(body);
  }
  else{
    console.log("inside switchresp")
     slackResp.lookupResp(error,response,body);
  }
}
module.exports.getApiResp=getApiResp;