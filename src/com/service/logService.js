var http = require('http');
var fs = require('fs');
var path = require('path');
var appConfig = require('../config/appConfig.js');
//TestFunction
//logResponse("Passed 1","0 Failed","8th Line");

function logResponse(passcount,failcount,linenumber){
var str= "TestCases"+" "+"Passed =" + passcount + ','+ "Failed =" + failcount + ',' + "linenumber" + linenumber;
logResult(str);
}

function logConvResult(lineNo, quest, expResult, recResult, status) {
  var strformat="Line Number :: "+lineNo
        +"\n       Custumer Asks     : " + quest
        +"\n       Bot Response      : " + recResult
        +"\n       Expected Response : " + expResult
        +"\n       Test Case Status  : " + status
        +"\n_____________________________________________________";

    logOnConsole("Line Number :: "+lineNo
          +"\n       Custumer Asks     : " + quest
          +"\n       Bot Response      : " + recResult
          +"\n       Expected Response : " + expResult
          +"\n       Test Case Status  : " + status
          +"\n_____________________________________________________");
    logResult(strformat);
}

function logOnConsole(str) {
    console.log(str);
}

function logResult(str){
    if(!(fs.existsSync(appConfig.inputfile))){
        fs.writeFile(appConfig.inputfile,str, function(err) {
        if(err) {
            console.log(err);
        }
            console.log("The file was saved!");
        });
    }
    else{
        fs.appendFile('logfile.txt', '\n' + str, function (err) {
        if (err) throw err;
        console.log('Saved!');
        });
    }
}

module.exports.logResponse=logResponse;

module.exports.logConvResult=logConvResult;
