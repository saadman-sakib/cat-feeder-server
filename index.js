var express = require('express');
var app = express();
var http = require('http').createServer(app)
// var socket = require('socket.io')
app.use(express.static('public'));

//socket setup
const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
	console.log(`made socket connection ${socket.id}`);

	socket.emit('test', 'Welcome to the chat');

	socket.on('feed', msg => {
		console.log(msg);
		socket.broadcast.emit('feed', msg);
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


app.get('/', (req, res) => {
	console.log("feeeed");
	io.local.emit("feed", "feed");
	res.send('Hello World!')
})

app.get('/test', (req, res) => {
	console.log("feeeed");
	res.send('testing');
})

//server started
http.listen(3001, '0.0.0.0', (err) => {
	console.log(`listening on port 3001`);
})