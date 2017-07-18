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

function logResult(str){
    if(!(fs.existsSync('logfile.txt'))){
        fs.writeFile("logfile.txt",str, function(err) {
        if(err) {
        return console.log(err);
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
