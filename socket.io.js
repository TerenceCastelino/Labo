const socketIO = require('socket.io');
const user = require('./_controllers/utilisateur.controller')

module.exports = (server) => {
    const io = socketIO(server, {
        connectionStateRecovery: {} // Ajoutez ici vos options de configuration pour Socket.io
    }                               //! la recuperation des message emit lors de la deconnection ne sont parsu
    );

    io.on('connection', (socket) => {

        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


        // socket.on('chat message', (msg) => {
        //     console.log('message: ' + msg);
        //     const id = 1

        //     io.emit('chat message', `  ${msg}`);// Émettre le message à tous les clients connectés
        // });

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            const id = 1;//trouver un moyen de le recuperer autrement

            fetch('http://localhost:3000/api/utilisateur/' + id)
                .then(response => response.json())
                .then(user => {
                    // Utilisez les données de l'utilisateur reçues ici
                    console.log(user.nom);
                    io.emit('chat message', `${user.prenom} :  ${msg}`);
                })
                .catch(error => {
                    console.error('Erreur lors de la requête :', error);
                });
        });


    });
};




// const socketIO = require('socket.io');
// const userController = require('./_controllers/utilisateur.controller');

// module.exports = (server) => {
//     const io = socketIO(server, {
//         connectionStateRecovery: {} // Ajoutez ici vos options de configuration pour Socket.io
//     });

//     io.on('connection', (socket) => {
//         console.log('a user connected');

//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//         });

//         socket.on('chat message', async (data) => {
//             const { idUtilisateur, message } = data;
//             console.log('iiiiiiiiiiiiiiiicccccccccccccccccciiiiiiiiiiiiiiiii');
//             console.log(data);
//             try {
//                 console.log('iiiiiiiiiiiiiiiicccccccccccccccccciiiiiiiiiiiiiiiii22222222');
//                 // Récupérer les informations de l'utilisateur à partir de son ID
//                 const user = await userController.getById(idUtilisateur);
//                 console.log('iiiiiiiiiiiiiiiicccccccccccccccccciiiiiiiiiiiiiiiii3333333');

//                 // Vérifier si l'utilisateur existe et a un nom défini
//                 if (user && user.nom) {
//                     const userName = user.nom;

//                     // Émettre le message avec le nom de l'utilisateur
//                     io.emit('chat message', `${userName}: ${message}`);
//                 } else {
//                     // Gérer le cas où l'utilisateur n'existe pas ou n'a pas de nom défini
//                     io.emit('chat message', `Utilisateur inconnu: ${message}`);
//                 }
//             } catch (error) {
//                 // Gérer les erreurs potentielles lors de la récupération des données de l'utilisateur
//                 console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
//                 io.emit('chat message', `Erreur de récupération des données de l'utilisateur: ${message}`);
//             }
//         });
//     });
// };






// const socketIO = require('socket.io');
// const userController = require('./_controllers/utilisateur.controller');

// module.exports = (server) => {
//     const io = socketIO(server, {
//         connectionStateRecovery: {} // Vos options de configuration pour Socket.io
//     });

//     io.on('connection', (socket) => {
//         console.log('a user connected');

//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//         });

//         socket.on('chat message', async (data) => {
//             const message = data;
//             const id = 1
//             try {
//                 const user = await userController.getByIdSocket(id);

//                 if (user && user.nom) {
//                     const userName = user.nom;
//                     io.emit('chat message', { userName, message });
//                 } else {
//                     io.emit('chat message', { userName: 'Utilisateur inconnu', message });
//                 }
//             } catch (error) {
//                 console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
//                 io.emit('chat message', { userName: 'Erreur', message });
//             }
//         });
//     });
// };

