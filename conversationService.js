var LineReader = require('linereader');
var appConfig = require('./appConfig.js');
var queryService=require('./queryService.js');
var async=require('async');
//var util=require('../config/util.js');
//var logService=require('./logService');
console.log('to call function')
processRequest();

function processRequest(){
const fs = require('fs');
var currentLine=null;
var expectedResponse=[];
var failedLines=[];
var responseFromApi=null;
var tcPassCount=0;
var tcFailCount=0;
  console.log(appConfig.inputfile);

fs.readFileSync(appConfig.inputfile).toString().split('\n').forEach(function (line) { 
  var prefix=line.toString().split(":");
  console.log("Prefix"+""+prefix);
  if(prefix[0]=='Cust'){
      queryService.queryProcessing(prefix[1],appConfig.vfsAccessToken,function(responseFromApi){
        console.log('RESPONSE FROM API :'+responseFromApi);
      });
  }
  else if (prefix[0]=='Bot') {
             expectedResponse.push(prefix[1]);
          }
            if(expectedResponse.length>0){
var result=checkResponse(responseFromApi,expectedResponse);
 console.log(result);
 
            }
    //fs.appendFileSync("./output.txt", line.toString() + "\n");
});
  

// var rl = new LineReader(appConfig.inputfile);
//   rl.on('line',function(lineno,line) {
//     currentLine=line;
//         var prefix=currentLine.split(":");
//         if(prefix[0]=='Cust'){
//         queryService.queryProcessing(prefix[1],appConfig.vfsAccessToken,function(err,responseFromApi){
//             console.log('RESPONSE FROM API :'+responseFromApi);
//             });
//           expectedResponse=new Array();
//           }else if (prefix[0]=='Bot') {
//             expectedResponse.push(prefix[1]);
//           }
// if(expectedResponse.length>0){
// var result=checkResponse(responseFromApi,expectedResponse);
//   if(result){
//     tcPassCount++;
//   }
//   else{
//     failedLines.push(lineno);
//     tcFailCount++;
//   }
// }


//   });

 // rl.on('end', function () {
   // console.log("DATA to log the result");
  //console.log("RESULT IS::"+tcPassCount+"FAIL::"+tcFailCount+"FAILED LINES"+failedLines);
  //logService.logResponse(tcPassCount,tcFailCount,failedLines);
  //console.log("DATA LOGGED");
  //});
//rl.on('error',function(err){
  //  console.log(err);
//});
    


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
