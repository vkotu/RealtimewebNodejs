var Q = require("Q");
var fs = require("fs");


function say (fileName) {
    var deferred = Q.defer();

    var stream = fs.createReadStream(fileName);
    var contents = "";

    stream.pipe( fs.createWriteStream(fileName + ".backup"));

    stream.on("data", function (chunk) {
        console.log("data");
        contents += chunk;
    });
    stream.on("end", function () {
        deferred.resolve(contents);
    });
    return deferred.promise;
}

module.exports.say = say;