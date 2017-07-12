var apiai = require('apiai');
var prompt = require('prompt')
var access_token = "fcc2d12400644c589538c72c41a40955";
var app = apiai(access_token);

var options = {
    sessionId: '567yh8'
};
run_main('hi');

function run_main(query1) {
var request = app.textRequest(query1,options);
//console.log(request);
request.on('response', function(response) {

      console.log("Got response it seems")

});

request.on('error', function(error) {
   console.log(error);
});

request.end()
}

