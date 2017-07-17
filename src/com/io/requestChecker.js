var LineReader = require('linereader');

var appConfig = require('../config/appConfig.js');

	var lr = new LineReader(appConfig.tcInputfile);

main();

function checkForIOError() {
  lr.on('error', function (err) {
    console.log(err);
    lr.close();
    return true;
  });
  return false;
}


function main() {


  if(!checkForIOError()) {
    var tcName = null;
    var questCount = 0;
    var passedTC = 0;
    var failedTC = 0;
    var prefixHit = null;
    var responseName = null;

    lr.on('line', function (lineno, line) {
      if(line.match('StaticReq')) {

      if(tcName) {
          //TCResultLogger.logResult(tcName, questCount, passedTC, failedTC);
      }
        var tempStr = line.split('::');
        if(tempStr.length >= 2) {
            tcName = tempStr[1];
        } else {
            console.log("Error in line number "+lineno+" of input file. Could not parse the file"+line);
            tcName = null;
        }
        console.log(tcName);
        questCount = 0;
        passedTC = 0;
        failedTC = 0;

      } else if (tcName){
        questCount++;

        /*var response = queryService.sendQuery( L );
        if(ResponseChecker.checkResponse(tcName , response) == "true") {
          passedTC ++;
        } else {
          failedTC++;
        }*/
      console.log(line);
    }
    });
  } else {
      console.log("Could not read the give input file");
  }

}
