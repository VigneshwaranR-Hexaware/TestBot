const express = require('express');
const https= require('https');
var http = require('http');
var apiai = require('apiai');
const bodyParser = require('body-parser');
var request = require("request");
const JSONbig = require('json-bigint');
const assert = require('assert');
const appConfig= require('../config/appConfig.js');

//preparingResponse();
//Function Call
function preparingResponse(){
 var response=queryProcessing('I am quite annoyed with VFS',appConfig.developerAccessToken,null);
}

//Processing Query Parameter
function queryProcessing(queryParameter,accessToken,callback){
 console.log("Query Parameter  ",queryParameter);
  var options = {
  method: 'POST',
  url: 'https://api.api.ai/v1/query',
  qs: { v: '20150910' },
  headers:
   {
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: accessToken
   },
  body: {
      query: [queryParameter], lang: 'en', sessionId: '1234567'
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
   console.log("Body Message" + body.result.fulfillment.speech);
    var message=JSON.stringify(body.result.fulfillment.speech);
    console.log("message" + message);
    if (!error && response.statusCode === 200) {
      // some code    
      callback(message); 
   }
  //return message;
  
});

}
module.exports.queryProcessing=queryProcessing;
