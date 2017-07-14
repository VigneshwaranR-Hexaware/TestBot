var http = require('http');
var fs = require('fs');
var path = require('path'); 
var str="WelcomeCase" + "," + "2" +"," + "3Failed";

logResult(str);

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