var http = require('http');
var fs = require('fs');
var path = require('path');
//TestFunction
//logResponse("Passed 1","0 Failed","8th Line");

function logResponse(passcount,failcount,linenumber){
var str= "TestCases"+" "+"Passed =" + passcount + ','+ "Failed =" + failcount + ',' + "linenumber" + linenumber;
logResult(str);
}


module.exports.getTCHeader = function(testUnitNum, lineNo, quest) {
    return "Test Unit Index  :: "+testUnitNum
                +"\n  Line Number  :: "+lineNo
                +"\n  Custumer Asks : " + quest;
}

module.exports.getRespHeader = function(responseIndex) {
    return "\n\n  Response Index :: " + responseIndex
}

module.exports.getConvResult = function(expResult, recResult, status) {
    var testResult = "Passed";
    if(!status) {
        testResult = "Failed";
    }
    return "\n       Bot Response      : " + recResult
          +"\n       Expected Response : " + expResult
          +"\n       Test Case Status  : " + testResult;
}

module.exports.getCarouselResult = function(expTitle,botTitle,expSubTitle,BotSubTitle,testTitleResult,testSubtitleResult) {
    var testResult = "Passed";
    if(!(testTitleResult && testSubtitleResult)) {
        testResult = "Failed";
    } else if(testTitleResult && testSubtitleResult) {
        testResult = "Passed";
    } else if(!testTitleResult) {
       testResult="Title Failed";
    } else if(!testSubtitleResult) {
       testResult="SubTitle Failed";
    }
    return "\n       Bot Response      : "
          +"\n            Title        :  "+botTitle
          +"\n            SubTitle     :  "+BotSubTitle
          +"\n       Expected Response : "
          +"\n            Title        :  "+expTitle
          +"\n            SubTitle     :  "+expSubTitle
          +"\n       Test Case Status  : " + testResult;
}

module.exports.getQuickReplyResult = function(expTitle,botTitle,testTitleResult) {
    var testResult = "Passed";
    if(!testTitleResult) {
        testResult = "Failed";
    }
    return "\n       Bot Response      : "
          +"\n            Title        :  "+botTitle
          +"\n       Expected Response : "
          +"\n            Title        :  "+expTitle
          +"\n       Test Case Status  : " + testResult;
}

module.exports.getImageResult = function(expTitle,botTitle,testImageResult) {
    var testResult = "Passed";
    if(!testImageResult) {
        testResult = "Failed";
    }
    return "\n       Bot Response      : "
          +"\n            ImageUrl        :  "+botTitle
          +"\n       Expected Response : "
          +"\n            ImageUrl        :  "+expTitle
          +"\n       Test Case Status  : " + testResult;
}


module.exports.getTCFooter = function() {
    return "\n_____________________________________________________\n\n";
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
    //console.log(str);
}

module.exports.logResponse=logResponse;
