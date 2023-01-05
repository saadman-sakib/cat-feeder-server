const socket = io('http://192.168.0.228:3001/');
const button = document.getElementById('btn');

button.addEventListener('click', (e) => {
	console.log("ff");
	const chatForm = document.getElementById('msg');
	socket.emit('feed', chatForm.value);
	console.log("yo");
	e.preventDefault();
})

socket.on('feed', msg => {
	const content = document.getElementById('content')
	content.innerHTML += `<p> • ${msg}</p>`
	console.log(msg);
})

//sending msg to server, in the 'haha' channel
socket.emit('test1', 'hehe');