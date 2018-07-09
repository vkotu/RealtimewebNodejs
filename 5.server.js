var http = require("http");
var Q = require("q");

var host = "localhost";
var port = "8006";

var delay = function delay (num) {
    var deferred = Q.defer();
    setTimeout(() => {
        deferred.resolve();
    }, num);
    return deferred.promise;
}

function handleHTTP(req, res) {
    if (req.method === "GET") {
        console.log(req.url);
        if (req.url === "/") { 
            var ran, msg;
            console.log('first');
            ran = Math.random();
            delay(1000)
            .then(function () {
                console.log('second');
                msg = "Hello world: " + ran;
                return delay(1000);
            }).then(function () {
                console.log('third');
                setTimeout(function () {
                    res.writeHead(200, {"content-type": "text/plain"});
                    res.end(msg);
                }, 1000);
            });
        } else {
            res.writeHead(403);
            res.write("Get outta here buddy: ");
            res.end();
        }
    } else {
        res.writeHead(403, {"content-type": "text/plain"});
        res.write("Get outta here: ");
        res.end();
    }
} 

var http_serv = http.createServer(handleHTTP);

http_serv.listen(port, host);