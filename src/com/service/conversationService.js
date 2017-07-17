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
  console.log(appConfig.inputfile);
fs.readFileSync(appConfig.inputfile).toString().split('\n').forEach(function (lineno,line) { 
    console.log(line);
    console.log(lineno);
  
  
  var prefix=lineno.toString().split(":");
  console.log("Prefix"+""+prefix);
  if(prefix[0]=='Cust'){
      queryService.queryProcessing(prefix[1],appConfig.vfsAccessToken,function(err,responseFromApi){
        console.log('RESPONSE FROM API :'+responseFromApi);
      });
  }
    fs.appendFileSync("./output.txt", line.toString() + "\n");
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
