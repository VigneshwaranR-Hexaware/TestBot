var http = require('http');
var fs = require('fs');
var path = require('path'); 


function logResponse(passcount,failcount,linenumber){
var str= passcount +','+ failcount +','+ linenumber;
logResult(str);
}

function logResult(str){
    if(!(fs.existsSync('logfile.txt'))){
        fs.writeFile("logfile.txt",str, function(err) {
        if(err) {
        return console.log(err);
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