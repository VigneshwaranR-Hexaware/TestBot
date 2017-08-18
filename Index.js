const express = require('express');
const https= require('https');
var apiai = require('apiai');
var request = require("request");
const assert = require('assert');
var arrayequals = require('array-equal');
var queryService=require('./src/com/service/conversationServiceNew.js');



queryService.processRequest();



