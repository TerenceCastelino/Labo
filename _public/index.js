const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

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

// _____________________

// const socket = io();

// const form = document.getElementById('form');
// const input = document.getElementById('input');
// const messages = document.getElementById('messages');

// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     if (input.value) {
//         const idUtilisateur = 1/* Obtenez l'ID de l'utilisateur ici */;
//         console.log(idUtilisateur);
//         socket.emit('chat message', { idUtilisateur, message: input.value });
//         input.value = '';
//     }
// });

// socket.on('chat message', (data) => {
//     const { userName, message } = data;
//     const item = document.createElement('li');
//     messages.appendChild(item);
//     item.textContent = `${userName}: ${message}`;
//     window.scrollTo(0, document.body.scrollHeight);
// });

// const toggleButton = document.getElementById('toggle-btn');

// toggleButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     if (socket.connected) {
//         toggleButton.innerText = 'Connect';
//         socket.disconnect();
//     } else {
//         toggleButton.innerText = 'Disconnect';
//         socket.connect();
//     }
// });
