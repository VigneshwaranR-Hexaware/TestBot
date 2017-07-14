var LineReader = require('linereader');
var appConfig = require('../config/appConfig.js');
var lr = new LineReader(appConfig.expectedOutputFile);
const responseMap = new Map();

function checkForIOError() {
  lr.on('error', function (err) {
    console.log(err);
    lr.close();
    return true;
  });
  return false;
}

function main() {
    //checkForIOError
    if(!checkForIOError()) {
      var responseName = null;
      lr.on('line', function (lineno, line) {
          if(line.match("StaticResponse")) {
              responseName = null;
              var tempStr = line.split("::");
              if(tempStr && tempStr.length <= 2) {
                  responseName = tempStr[1];
              }
          } else if (responseName) {
                var responseArray = responseMap.get(responseName);
                if(!responseArray) {
                    responseArray = [];
                    responseMap.set(responseName, responseArray);
                }
                responseArray.push(line);
          }
      });

      lr.on('end', function () {
        console.log("Resposne file has been pushed into memory");
        var tst = checkResponse("WelcomeIntent", "Welcome, How could I assist you?");
        console.log(tst);
      });
    } else {
      console.log("IO Error occured while reading "+appConfig.expectedOutputFile);
    }


}

function checkResponse(tcName, responseLine) {
    var responseArray = responseMap.get(tcName);
    if(responseArray) {
        return (responseArray.indexOf(responseLine) > -1);
    }
    return false;
}

main();
