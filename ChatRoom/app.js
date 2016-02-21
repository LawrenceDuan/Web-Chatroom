var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
  
var server = http.createServer(//创建本地服务器
	function(req, res) {
	    res.writeHead(200, {'Content-type': 'text/html'});
	    res.end(fs.readFileSync(__dirname + '/index.html'));
	}).listen(8080, 
		function() {
	    console.log('Listening at: http://localhost:8080');
});
  
socketio.listen(server).on('connection', function (socket) {
	socket.on('join', function(name){//得到用户名字
		socket.nickname = name;
		console.log(socket.nickname + ' connected');
	})

    socket.on('message', function (msg) {//接受发送信息
    	var nickname = socket.nickname;

        console.log('Message Received: ', nickname + ": " + msg);
        socket.broadcast.emit("message", nickname + ": " + msg);
    });
});