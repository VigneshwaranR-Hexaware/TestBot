

//var inputfile = require('../data/VFSComplaintRequest.txt');
var LineReader = require('linereader');
var appConfig = require('../config/appConfig.js');
var logService=require('./logService');
var queryService=require('./queryService');
//var lr = new LineReader(appConfig.expectedOutputFile);
console.log('to call function')
processRequest();

function processRequest(){
//  const readline = require('readline');
  const fs = require('fs');
var currentLine=null;
var expectedResponse=[];
var failedLines=[];
var responseFromApi=null;
var tcPassCount=0;
var tcFailCount=0;
  /*const rl = readline.createInterface({
    input: fs.createReadStream(inputfile)
  });*/
  console.log(appConfig.inputfile);
var rl = new LineReader(appConfig.inputfile);
  rl.on('line',function(lineno,line) {
    currentLine=line;
  //  console.log(`Line from file: `+ currentLine);
        var prefix=currentLine.split(":");


          if(prefix[0]=='Cust'){
          //console.log(prefix[1]);
// to send to processquery function and get result from api
responseFromApi=queryService.queryProcessing(prefix[1],appConfig.vfsAccessToken);
              /*  if(prefix[1]=='Hi'){
                  responseFromApi='How can i help you today?'
                }else if(prefix[1]=='I am quite annoyed with VFS'){
                  responseFromApi='Sorry for the incovenience caused to youuuuu.'
                }*/
console.log('RESPONSE FROM API :'+responseFromApi);
            expectedResponse=new Array();

          }else if (prefix[0]=='Bot') {
          //  console.log(prefix[1]);
            expectedResponse.push(prefix[1]);
          //  console.log(expectedResponse);
          }

if(expectedResponse.length>0){

var result=checkResponse(responseFromApi,expectedResponse);

  if(result){
    tcPassCount++;
  }else{
    failedLines.push(lineno);
    tcFailCount++;
  }

}


  });

  rl.on('end', function () {
    console.log("DATA to log the result");
  console.log("RESULT IS::"+tcPassCount+"FAIL::"+tcFailCount+"FAILED LINES"+failedLines);
  logService.logResponse(tcPassCount,tcFailCount,failedLines);
  console.log("DATA LOGGED");
  });


}

function checkResponse(responseFromApi,expectedResponse ){
  console.log("API::"+responseFromApi+"EXPECTED::"+expectedResponse);
if(expectedResponse.indexOf(responseFromApi) > -1) {
  console.log("test case passed");
  return true;
}
else{
console.log("test case failed");
return false;
}
}
