
var args = require("minimist")(process.argv.slice(2), { string: "name" });
var file = args.file;

function printHelp() {
    console.log("2Q.js  (c) kotu");
    console.log("");
    console.log("Usage:");
    console.log("--help                   print this help");
    console.log("--file={NAME}            read {name}");
    console.log("");
}

if (args.help || !args.file){
    printHelp();
    process.exit(1);
}

var hello = require("./helloworldQ.js");

var p = hello.say(file)
    .then(function s(contents) {
        console.log(contents.toString());
    })
    .fail(function (e){
        console.log(e);
    });