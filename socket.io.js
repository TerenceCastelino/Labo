
// const socketIO = require('socket.io');

// module.exports = (server) => {
//     const io = socketIO(server, {
//         connectionStateRecovery: {} // Ajoutez ici vos options de configuration pour Socket.io
//     });

//     let idFront = null; // Déclarer idFront en dehors des événements pour y accéder globalement

//     io.on('connection', (socket) => {
//         console.log('a user connected');

//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//         });

//         socket.on('user ID', (userID) => {
//             idFront = userID; // Affecter la valeur reçue à la variable globale idFront
//             console.log('userId', userID);
//             console.log('ID utilisateur reçu:', idFront);
//         });

//         socket.on('chat message', (msg) => {
//             console.log('message: ' + msg);
//             console.log('avant idfront:', idFront);

//             // Utiliser idFront dans votre logique de chat
//             if (idFront) {
//                 fetch('http://localhost:3000/api/utilisateur/' + idFront)
//                     .then(response => response.json())
//                     .then(user => {
//                         // Utiliser les données de l'utilisateur reçues ici
//                         console.log(user.nom);
//                         io.emit('chat message', `${user.prenom} :  ${msg}`);
//                     })
//                     .catch(error => {
//                         console.error('Erreur lors de la requête :', error);
//                     });
//             } else {
//                 console.log('ID utilisateur non défini');
//             }
//         });
//     });
// };

const socketIO = require('socket.io');

module.exports = (server) => {
    const io = socketIO(server, {
        connectionStateRecovery: {} // Options de configuration pour Socket.io
    });

    const userSockets = {}; // Mappe les ID utilisateur aux sockets correspondantes

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
            // Supprimer le mapping lorsque l'utilisateur se déconnecte
            const userId = userSockets[socket.id];
            delete userSockets[socket.id];
            console.log(`User ${userId} disconnected`);
        });

        socket.on('user ID', (userID) => {
            userSockets[socket.id] = userID; // Associer l'ID utilisateur à la socket
            console.log('userID:', userID);
            console.log('Socket ID:', socket.id);
        });

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            const userId = userSockets[socket.id];

            // Utiliser userId dans votre logique de chat
            if (userId) {
                fetch('http://localhost:3000/api/utilisateur/' + userId)
                    .then(response => response.json())
                    .then(user => {
                        // Utiliser les données de l'utilisateur reçues ici
                        console.log(user.nom);
                        io.emit('chat message', `${user.prenom} :  ${msg}`);
                    })
                    .catch(error => {
                        console.error('Erreur lors de la requête :', error);
                    });
            } else {
                console.log('ID utilisateur non défini');
            }
        });
    });
};
