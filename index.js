var express = require('express');
var app = express();
var http = require('http').createServer(app)
var socket = require('socket.io')
app.use(express.static('public'));

//socket setup
var io = socket(http, {
	cors: {
		methods: ["GET", "POST"]
	}
});


//server started
http.listen('8080', () => {
	console.log(`listening on port 8080`);

	io.on('connection', (socket) => {
		console.log(`made socket connection ${socket.id}`);
        // socket.broadcast.emit('test', msg);

		socket.on('test1', (msg) => {
			console.log('haha', msg);
			// socket.broadcast.emit('test', msg);
		})		
	})
})