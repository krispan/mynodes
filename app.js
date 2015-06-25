var express=require('express'),
	app=express(),
	server=require('http').createServer(app),
	io=require('socket.io').listen(server);

server.listen(7000);


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/bower_components'));
io.sockets.on('connection', function(socket){
	socket.on('send msg', function(dd){
		io.sockets.emit('get msg',dd)

	})

	console.log("done");

});