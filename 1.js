
var args = require("minimist")(process.argv.slice(2), { string: "name" });
var name = args.name;

function printHelp() {
    console.log("1.js  (c) kotu");
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

var hello = require("./helloworld.js");

hello.say(args.file, function (err, contents) {
    if (err) {
        console.log(err);
    } else {
        console.log(contents.toString()); 
    }
});

//try with promise
hello.say2(args.file)
    .then(function success(contents){
        console.log(contents.toString());
    }, function error(err){
        console.log(err);
    });