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

//Function Call
//function preparingResponse(){
// var response=queryProcessing('Hi',appConfig.developerAccessToken);
//
//}

//Processing Query Parameter
function queryProcessing(queryParameter, lineNumber, handleResp){

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
    console.log(message+" lin nu is "+lineNumber);
}

 request(options,handleResp);
}



module.exports.queryProcessing=queryProcessing;
