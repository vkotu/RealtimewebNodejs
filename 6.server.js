var http = require("http");
var Q = require("q");

var host = "localhost";
var port = "8006";
var http_serv = http.createServer(handleHTTP);
var node_static = require("node-static");
var static_files = new node_static.Server(__dirname);


var delay = function delay (num) {
    var deferred = Q.defer();
    setTimeout(() => {
        deferred.resolve();
    }, num);
    return deferred.promise;
}

function handleHTTP(req, res) {
	if (req.method == "GET") {
		if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
			req.addListener("end",function(){
				req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
				static_files.serve(req,res);
			});
			req.resume();
		}
        else {
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


http_serv.listen(port, host);