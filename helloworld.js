function say (filename, cb) {
    return fs.readFile(filename, function (err, contents) {
        if (err) {
            cb(err);
        } else{
            setTimeout(function () {
                cb(null, contents);
            }, 1000);
        }
    });
}
// return promise
function say2 (filename) {
    var pr = new Promise(function (resolve, reject) {
        fs.readFile(filename, function (err, contents) {
            if (err) {
                reject(err);
            } else{
                setTimeout(function () {
                    resolve(contents);
                }, 2000);
            }
        });
    });
    return pr;
}

var fs = require("fs");

module.exports = {
    say,
    say2
};