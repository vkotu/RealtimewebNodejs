var http = require("http");

var host = "localhost";
var port = "8006";


function handleHTTP(req, res) {
    if (req.method === "GET") {
        console.log(req.url);
        if (req.url === "/") { 
            res.writeHead(200, {"content-type": "text/plain"});
            res.write("Hello world:");
            res.end("There you go!!" + Math.random());
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