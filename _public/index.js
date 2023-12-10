//FRONTEND
const socket = io();


const userID = 3; // L'ID que vous souhaitez transmettre (pour le moment en dur)
socket.emit('user ID', userID);

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

//je veux recuperer le localstorage et l envoyer au back

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

socket.on('chat message', (msg) => {

    const item = document.createElement('li');
    messages.appendChild(item);
    item.textContent = msg;
    window.scrollTo(0, document.body.scrollHeight);
});
const toggleButton = document.getElementById('toggle-btn');

toggleButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (socket.connected) {
        toggleButton.innerText = 'Connect';
        socket.disconnect();
    } else {
        toggleButton.innerText = 'Disconnect';
        socket.connect();
    }
});


