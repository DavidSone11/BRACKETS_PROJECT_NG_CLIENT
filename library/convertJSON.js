
var fs = require('fs')
var jsonfile = require('jsonfile')
var utf8 = require('utf8');
var encoding= require("encoding");


var readJSON = function (URI) {
    var s = "";
    if (URI) {
        fs.readFile(URI, function read(err, results) {
            if (err) {throw err;}
            if(results){
                s += results.toString('utf8');
              console.log(s.length);
            }
            

        });
    }



}

var conObj = {
    readJSON: readJSON
}
module.exports = conObj;