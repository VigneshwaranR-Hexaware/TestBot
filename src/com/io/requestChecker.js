var LineReader = require('linereader');
const responseMap = new Map();
main();
function main() {
  var tcName = null;
	var questCount = 0;
	var passedTC = 0;
	var failedTC = 0;
	var prefixHit = null;
	var responseName = null;
	var lr = new LineReader('inputFile.txt');
	lr.on('line', function (lineno, line) {
	if(line.match('StaticReq::')) {
			tcName = line.split(line, "::" );
			questCount = 0;
			passedTC = 0;
			failedTC = 0;
			if(tcName) {
			//TCResultLogger.logResult(tcName, questCount, passedTC, failedTC);
			}
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
}
