var http = require("http");
var Q = require("q");

var host = "localhost";
var port = "8006";
var http_serv = http.createServer(handleHTTP);
var node_static = require("node-static");
var static_files = new node_static.Server(__dirname);
var io = require("socket.io")(http_serv);



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

function handleIo(socket){

    function disconnect() {
        console.log('client disconnected');
    }
    socket.on("disconnect", disconnect);

    console.log('client connected');
    setInterval(() => {
        socket.emit("hello", Math.random());
    }, 1000);


    socket.on('message', function (msg) {
        console.log('Incoming message: ' + msg);
        socket.broadcast.emit("message", msg);
        socket.emit('message', "Ack : " + new Date().getTime() );
    });
};


http_serv.listen(port, host);

io.on('connection', handleIo);



