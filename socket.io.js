const socketIO = require('socket.io')




module.exports = (server) => {
    const io = socketIO(server)

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    io.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // Émettre le message à tous les clients connectés
        io.emit('chat message', msg);
    });
    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });
    });

}