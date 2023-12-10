// FRONTEND
const socket = io();

function handleLogin() {
    const email = prompt('Entrez votre adresse e-mail :');
    const password = prompt('Entrez votre mot de passe :');

    if (email && password) {
        // Effectuer la requête fetch vers localhost:3000/api/authentification/login
        fetch('http://localhost:3000/api/authentification/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                emailUtilisateur: email,
                motsDePasse: password,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la connexion');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.idUtilisateur);

                // Stockage dans le sessionStorage
                sessionStorage.setItem('userID', data.idUtilisateur);

                // Utilisation de la valeur userID récupérée du sessionStorage
                const userID = sessionStorage.getItem('userID');

                // Utilisation de userID dans d'autres parties du code
                // Par exemple, pour émettre l'ID utilisateur via le socket
                socket.emit('user ID', userID);

                // Retourner l'ID utilisateur pour une utilisation éventuelle
                return data.idUtilisateur;
            })
            .catch(error => {
                console.error('Erreur :', error);
            });
    }
}


// _____________________________________________________
// const userID = 1; // L'ID que vous souhaitez transmettre (pour le moment en dur)
const userID = handleLogin();
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


