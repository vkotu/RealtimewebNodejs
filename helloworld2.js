function readFile (filename) {
    var sq = ASQ();

    fs.readFile(filename, sq.errfcb() );

    return sq;
}
function delayMsg(done, contents) {
    setTimeout(function () {
        done(contents)
    }, 1000);
}

function say(filename) {
    return readFile(filename)
        .then(delayMsg);
}

module.exports = {
    say
};

//

var fs = require("fs");
var ASQ = require("asynquence");
require("asynquence-contrib");
