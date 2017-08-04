const express = require('express');
const https= require('https');
var apiai = require('apiai');
var request = require("request");
const assert = require('assert');

var arrayequals = require('array-equal');

var arry1=['a','d','c'];
var arry2=['a','b','c'];
var testpayloadtitleResult = checkPayloadResponse(arry1, arry2);
console.log("result::"+testpayloadtitleResult);

function checkPayloadResponse(responseFromApi,expectedResponse ){
      console.log("API::"+responseFromApi+"EXPECTED::"+expectedResponse);

      if(responseFromApi && expectedResponse) {
        console.log(arrayequals(responseFromApi, expectedResponse));
        return (arrayequals(responseFromApi, expectedResponse)) ;
          }

      return false;

}

//queryService.preparingResponse();
