const express = require('express');
var apiai = require('apiai');
const bodyParser = require('body-parser');
const developerAccesstoken='fcc2d12400644c589538c72c41a40955';
const app = apiai(developerAccesstoken);
const https= require('https');
var http = require('http');
var request = require("request");
const JSONbig = require('json-bigint');
const assert = require('assert');



var options = { method: 'POST',
  url: 'https://api.api.ai/v1/query',
  qs: {
      v: '20150910'
  },
  headers:
   {
     'cache-control': 'no-cache',
     'content-type': 'application/json',
      authorization: 'Bearer fcc2d12400644c589538c72c41a40955'
   },
  body: {
      query: [ 'Hi' ], lang: 'en', sessionId: '1234567',
      result:{
         source:'agent'}


  },
  json: true
 };

request(options, function (error, response, body) {
  if (error){
      throw new Error(error);
  }
else{
    console.log(JSON.stringify(body.result.fulfillment.speech));
    //if(assert.equals("Welcome to Aitel Network how may i assist you"))
    console.log(body);
}
  
});

//console.log(requestOptions);
//var requestObj=https.request(requestOptions,function(response){
//    response.on("data",function(data){
//    console.log("Hi I am Triggered");
//    console.log(req);
//    });
//    response.on("error",function(error){
//        console.log(error);
//    });
//
//});
