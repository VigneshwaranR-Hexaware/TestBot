const express = require('express');
const https= require('https');
var http = require('http');
var apiai = require('apiai');
const bodyParser = require('body-parser');
var request = require("request");

const JSONbig = require('json-bigint');
const assert = require('assert');
const appConfig= require('../config/appConfig.js');

//Function Call
//function preparingResponse(){
// var response=queryProcessing('Hi',appConfig.developerAccessToken);
//
//}

//Processing Query Parameter
function queryProcessing(queryParameter, handleResp){
  console.log(handleResp);
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
 request(options,handleResp.getMessage);
}

module.exports.queryProcessing=queryProcessing;
