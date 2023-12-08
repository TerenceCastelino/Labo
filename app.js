require('dotenv').config()
const db = require("./_models/db.model");
const express = require('express')
require('express-async-errors');
const app = express();

// Ajout de Socket.io
const server = require('http').createServer(app);
const { join } = require('node:path');
const { Server } = require('socket.io');
const io = new Server(server);
const socketIo = require('./socket.io')
socketIo(server)

// const cors = require('cors');


// app.use(cors({
//     origin: 'http://localhost:4200', // Remplacez par votre URL front-end
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }));

app.use(express.json());

const route = require('./_routes/base.route')

const { PORT, NODE_ENV } = process.env

const configureCors = require('./corsConfig'); // Importation de la configuration CORS

db.sequelize.authenticate()
    .then(() => console.log('Connection à la DB réussie'))
    .catch((error) => console.log(`Connection à la DB ratée : ${error}`));
if (NODE_ENV === 'development') {
    db.sequelize.sync({ alter: { drop: false } });
};

// Chargement de la configuration CORS depuis le fichier séparé
configureCors(app);

// ________________________________________________________________________
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});


// ________________________________________________________________________
app.use('/api', route)


server.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

module.exports = app;

