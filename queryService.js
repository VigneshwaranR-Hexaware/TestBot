
/*var logger = require('./src/com/service/logService');
logger.logOnFile("Hi I am ok");
logger.logOnFile("Hi I am ok");
logger.logOnFile("Hi I am ok");*/


var test = new Array();
var tempArr = new Array();

for(var i=0; i<35; i++) {
    test.push(i);
}
console.log(test);
var i=10;
var j=0;
while(i <= test.length) {
    tempArr.push(test.slice(j, i));
    j += 10;
    i += 10;
}

if(j <= test.length) {
    tempArr.push(test.slice(j, test.length));
}

console.log(tempArr);

/*const express = require('express');
const https= require('https');
var http = require('http');
var apiai = require('apiai');
const bodyParser = require('body-parser');
var request = require("request");
const JSONbig = require('json-bigint');
const assert = require('assert');
const developerAccesstoken= require('./config/config.js');


//Function Call

 sendQuery('Hi',developerAccesstoken);

//Processing Query Parameter
function sendQuery(queryParameter,accessToken){
console.log(queryParameter);
    console.log("Hi I am Developer access token"+developerAccesstoken);
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
    //return message;
      callback(message);
});

}*/
