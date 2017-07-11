const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https= require('https');
var http = require('http');
const JSONbig = require('json-bigint');
const async = require('async');
const requestPromise = require('request-promise');
const developerAccesstoken='fcc2d12400644c589538c72c41a40955';

var requestOptions={
      host:'https://api.api.ai/v1/query?v=20150910',
      method: 'POST',
      headers: {
        'Authorization':'Bearer fcc2d12400644c589538c72c41a40955 ',
        'Content-Type': 'application/x-www-form-urlencoded',
     },
     body: { 
         query: [ 'Hi' ], 
         lang: 'en', 
         sessionId: '1234567' 
     }
};

var requestObj=https.request(requestOptions,function(req,res){
    console.log("Hi I am Triggered");
    console.log(req);
});