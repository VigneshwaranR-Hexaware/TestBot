const express = require('express');
var apiai = require('apiai');
const bodyParser = require('body-parser');
const developerAccesstoken='fcc2d12400644c589538c72c41a40955';
const app = apiai(developerAccesstoken);
const https= require('https');
var http = require('http');
var request = require("request");
const JSONbig = require('json-bigint');



var options = { method: 'POST',
  url: 'https://api.api.ai/v1/query',
  qs: { v: '20150910' },
  headers: 
   { 'postman-token': 'e5eba49e-a27c-b135-c064-7c0394e553f0',
     'cache-control': 'no-cache',
     'content-type': 'application/json',
     authorization: 'Bearer fcc2d12400644c589538c72c41a40955' },
  body: { query: [ 'Hi' ], lang: 'en', sessionId: '1234567' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});



//var requestOptions={
//      host:'https://api.api.ai/v1/query?v=20150910',
//      method: 'POST',
//      headers: {
//        'Authorization':'Bearer fcc2d12400644c589538c72c41a40955 ',
//        'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: { 
//         query: [ 'Hi' ], 
//         lang: 'en', 
//         sessionId: '1234567' 
//     }
//};
//console.log(requestOptions);
//var requestObj=https.request(requestOptions,function(response){
//    response.on("data",function(data){
//    console.log("Hi I am Triggered");
//    console.log(req);
//    });
//    response.on("error",function(error){
//        console.log(error);
//    });
//});
//
//requestObj.on("error",function(error){
//        console.log(error);
//    });
