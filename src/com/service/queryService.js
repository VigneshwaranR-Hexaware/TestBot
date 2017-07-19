const express = require('express');
const https= require('https');
var http = require('http');
var apiai = require('apiai');
const bodyParser = require('body-parser');
var request = require("request");

const JSONbig = require('json-bigint');
const assert = require('assert');
const appConfig= require('../config/appConfig.js');
var util=require('../config/util.js');
var expectedResponse=[];



//Function Call
//function preparingResponse(){
// var response=queryProcessing('Hi',appConfig.developerAccessToken);
//
//}

//Processing Query Parameter
function queryProcessing(queryParameter, lineNumber, responseMap){
console.log("QUERY TO API in query servixce::"+queryParameter);
  var options = {
  method: 'POST',
  url: 'https://api.api.ai/v1/query',
  qs: { v: '20150910' },
  headers:
   {
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: appConfig.vfsAccessToken
   },
  body: {
      query: [queryParameter], lang: 'en', sessionId: '1234567'
  },
  json: true
};

var handleResp = function(error,response, body){
   var message= util.getMsgFromResp(error, response, body);
    console.log("FROM API MSG:::"+message+" lin nu for cust is::: "+lineNumber);


    console.log("RESP MAP SIZE IN in query servixce::"+responseMap.size);
    responseMap.forEach(function(value, key) {
    //console.log(key + " : " + value);
});
 expectedResponse= responseMap.get(lineNumber).toString();

var result=checkResponse(message,expectedResponse);


}

 request(options,handleResp);
}


function checkResponse(responseFromApi,expectedResponse ){
  console.log("API::"+responseFromApi+"EXPECTED::"+expectedResponse);
if(expectedResponse.indexOf(responseFromApi) > -1) {
  console.log("test case passed");
  return true;
}
else{
console.log("test case failed");
return false;
}
}


module.exports.queryProcessing=queryProcessing;
