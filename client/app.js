const socket = io('http://10.0.0.2:5000/');
const button = document.getElementById('btn');

button.addEventListener('click', (e) => {
	console.log("ff");
	const chatForm = document.getElementById('msg');
	socket.emit('test1', chatForm.value);
	console.log("yo");
	e.preventDefault();
})

socket.on('chat', msg => {
	const content = document.getElementById('content')
	content.innerHTML += `<p> • ${msg}</p>`
	console.log(msg);
})

//sending msg to server, in the 'haha' channel
socket.emit('test1', 'hehe');