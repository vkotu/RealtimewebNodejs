
var args = require("minimist")(process.argv.slice(2), { string: "name" });

function printHelp() {
    console.log("2.js  (c) kotu");
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

var hello = require("./helloworld2.js");

hello.say(args.file).val(function(contents) {
    console.log(contents.toString());
})
.or(function(err){
    console.log(err);
})