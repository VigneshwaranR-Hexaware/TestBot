const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https= require('https');
var http = require('http');
const JSONbig = require('json-bigint');
const async = require('async');
const requestPromise = require('request-promise');
var request=require('request');
const port = process.env.PORT || 3000;
const url='https://api.api.ai/v1/query?v=20150910';

