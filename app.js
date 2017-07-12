const express = require('express');
var apiai = require('apiai');
const bodyParser = require('body-parser');
const developerAccesstoken='fcc2d12400644c589538c72c41a40955';
const app = apiai(developerAccesstoken);
const https= require('https');
var http = require('http');
const JSONbig = require('json-bigint');



var requestOptions={
      host:'https://api.api.ai/v1/query?v=20150910',
      method: 'POST',
      headers: {
        'Authorization':'Bearer fcc2d12400644c589538c72c41a40955 ',
        'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: { 
         query: [ 'Hi' ], 
         lang: 'en', 
         sessionId: '1234567' 
     }
};

var requestObj=https.request(requestOptions,function(response){
    response.on("data",function(data){
    console.log("Hi I am Triggered");
    console.log(req);
    });
    response.on("error",function(error){
        console.log(error);
    });
});
