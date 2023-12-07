// 1.Importation et configuration de dotenv
require('dotenv').config()


const http = require('http');
const socketIO = require('socket.io');
const db = require("./_models/db.model");
const server = http.createServer();
const io = socketIO(server);


io.on('connection', (socket) => {
    console.log('Nouvelle connexion WebSocket');

    socket.on('nouveauMessage', (data) => {
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Déconnexion WebSocket');
    });
});





const PORT = process.env.WEBSOCKET_PORT || 3001;
server.listen(PORT, () => {
    console.log(`Serveur WebSocket en écoute sur le port ${PORT}`);
});

module.exports = io;
