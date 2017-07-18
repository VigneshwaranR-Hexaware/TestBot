var http = require('http');
var fs = require('fs');
var path = require('path');

logResponse("Passed 1","0 Failed","8th Line");

function logResponse(passcount,failcount,linenumber){
var str= "TestCases"+" "+"Passed =" + passcount + ','+ "Failed =" + failcount + ',' + "linenumber" + linenumber;
logResult(str);
}

function logConvResult(lineNo, question, expResult, recResult, status) {
    logResult("Line Number "+lineNo+" status is "+status);
}

function logOnConsole(str) {
    console.log(str);
}

function logResult(str){
    if(!(fs.existsSync('logfile.txt'))){
        fs.writeFile("logfile.txt",str, function(err) {
        if(err) {
        return logMsg(err);
        }
            logMsg("The file was saved!");
        });
    }
    else{
        fs.appendFile('logfile.txt', '\n' + str, function (err) {
        if (err) throw err;
        logMsg('Saved!');
        });
    }
}

var logMsg = function(str) {
    console.log(str);
}


module.exports.logResponse=logResponse;

module.exports.logConvResult=logConvResult;
