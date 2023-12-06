const http = require('http');
const socketIO = require('socket.io');
const db = require("./_models/db.model");
//cree un dotenv
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
const webSocketRoute = require('./_routes/webSocket.route')
db.sequelize.authenticate()
    .then(() => console.log('Connection à la DB réussie'))
    .catch((error) => console.log(`Connection à la DB ratée : ${error}`));
// Migration de la base de données (s'exécute uniquement en mode de développement)
if (NODE_ENV === 'development') {
    db.sequelize.sync({ alter: { drop: false } });
};

app.use('/websocket', webSocketRoute)

const PORT = process.env.WEBSOCKET_PORT || 3001;
server.listen(PORT, () => {
    console.log(`Serveur WebSocket en écoute sur le port ${PORT}`);
});

module.exports = io;
