var http = require('http');
var fs = require('fs');
var path = require('path');
//TestFunction
//logResponse("Passed 1","0 Failed","8th Line");

function logResponse(passcount,failcount,linenumber){
var str= "TestCases"+" "+"Passed =" + passcount + ','+ "Failed =" + failcount + ',' + "linenumber" + linenumber;
logResult(str);
}


moduel.exports.getTCHeader = function(testUnitNum, lineNo, quest) {
    return "Test Unit Index  :: "+testUnitNum
                +"\n  Line Number  :: "+lineNo
                +"\n  Custumer Asks : " + quest;
}

module.exports.getRespHeader = function(responseIndex) {
    return "\n\n  Response Index :: " + responseIndex
}

module.exports.getConvResult = function(expResult, recResult, status) {
    return "\n       Bot Response      : " + recResult
          +"\n       Expected Response : " + expResult
          +"\n       Test Case Status  : " + status;
}

module.exports.getTCFooter() {
    return "\n_____________________________________________________";
}

module.exports.logOnConsole = function(str) {
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

module.exports.traceData = function(str) {
    console.log(str);
}

module.exports.logResponse=logResponse;
