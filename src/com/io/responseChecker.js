var LineReader = require('linereader');
var lr = new LineReader('./sampleExpectedResponse.txt');
const responseMap = new Map();

function checkForIOError() {
  lr.on('error', function (err) {
    //console.log(err);
    lr.close();
  });
}

function main() {
    //checkForIOError
    checkForIOError();
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
    });

}

function checkResponse(tcName, responseLine) {
    var responseArray = responseMap.get(tcName);
    if(!responseArray) {
       //return responseArray.indexOf(responseLine);
    }
    return "false";
}

main();
checkResponse("WelcomeIntent", "Welcome, How could I assist you?");
