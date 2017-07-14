const express = require('express');
const https= require('https');
var apiai = require('apiai');
var request = require("request");
const assert = require('assert');
const appConfig= require('../config/appConfig.js');
const queryService=require('../service/queryService');
const logService=require('../service/logService');

queryService.preparingResponse();