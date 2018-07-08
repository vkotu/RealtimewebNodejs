var Q = require("Q");
var fs = require("fs");


function say (fName) {
    var deferred = Q.defer();
    fs.readFile(fName, function(err, contents){
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(contents);
        }
    });
    return deferred.promise;
}

module.exports.say = say;