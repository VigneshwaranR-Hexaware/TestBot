var http = require('http');
var fs = require('fs');
var path = require('path');
//TestFunction
//logResponse("Passed 1","0 Failed","8th Line");

function logResponse(passcount,failcount,linenumber){
var str= "TestCases"+" "+"Passed =" + passcount + ','+ "Failed =" + failcount + ',' + "linenumber" + linenumber;
logResult(str);
}

function logConvResult(lineNo, quest, expResult, recResult, status) {
    logOnConsole("Line Number :: "+lineNo
          +"\n       Custumer Asks     : " + quest
          +"\n       Bot Response      : " + recResult
          +"\n       Expected Response : " + expResult
          +"\n       Test Case Status  : " + status
          +"\n_____________________________________________________");
}

function logOnConsole(str) {
    console.log(str);
}

function logResult(str){
    if(!(fs.existsSync('logfile.txt'))){
        fs.writeFile("logfile.txt",str, function(err) {
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
