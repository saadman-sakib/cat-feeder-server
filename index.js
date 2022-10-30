var express = require('express');
var app = express();
var http = require('http').createServer(app)
var socket = require('socket.io')
app.use(express.static('public'));

//socket setup
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
	console.log(`made socket connection ${socket.id}`);

	socket.emit('message', 'Welcome to the chat');
	

	socket.on('test1', msg => {
		io.local.emit('chat', "Hello people");
		socket.emit('chat', msg);
		socket.emit('test', "received");
		console.log('haha', msg);
	})

	socket.on('error', (err) => {
		console.error('HTTPS connection error', err);
	});
	socket.on('clientError', (err) => {
		console.error('HTTPS connection client error', err);
	});
	socket.on('tlsClientError', (err) => {
		console.error('HTTPS connection TLS client error', err);
	});
})


io.on('disconnection', (socket) => {
	console.log(  socket.sid +  ' user disconnected');
});

//server started
http.listen(5000, (err) => {
	console.log(`listening on port 5000`);
})