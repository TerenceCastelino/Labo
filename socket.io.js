const socketIO = require('socket.io');
const user = require('./_controllers/utilisateur.controller')

module.exports = (server) => {
    const io = socketIO(server, {
        connectionStateRecovery: {} // Ajoutez ici vos options de configuration pour Socket.io
    }                               //! la recuperation des message emit lors de la deconnection ne sont parsu
    );

    io.on('connection', (socket) => {
        // console.log('je suis ', user.getById(1));
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);// Émettre le message à tous les clients connectés
        });

    });
};

