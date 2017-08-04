const express = require('express');
const https= require('https');
var apiai = require('apiai');
var request = require("request");
const assert = require('assert');

var arrayequals = require('array-equal');

var arry1=['a','c','b','g'];
var arry2=['a','b','g','c'];
var testpayloadtitleResult = checkPayloadResponse(arry1, arry2);
console.log("result::"+testpayloadtitleResult);

function checkPayloadResponse(responseFromApi,expectedResponse ){

for(i=0;i<responseFromApi.length;i++){
  var result;
  if(expectedResponse.indexOf(responseFromApi[i]) > -1) {
      result=true;
  }else{
    result=false;
    break;
      }

}
    /*  if(responseFromApi && expectedResponse) {
        return(arrayequals(responseFromApi, expectedResponse)) ;
      }*/
      return result;

}
//queryService.preparingResponse();
