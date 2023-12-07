// // 1.Importation et configuration de dotenv
// require('dotenv').config()
// // 2.Module de gestion de la base de données
// const db = require("./_models/db.model");
// // 3.Importation d'express 
// const express = require('express')
// // 4.Importation de la gestion d'async-errors
// require('express-async-errors');
// // 5.Crée une instance d'application Express
// const app = express();
// //tentative avec websocket


// // ??? import cors
// const cors = require('cors');

// app.use(cors({
//     origin: 'http://localhost:4200', // Remplacez par votre URL front-end
//     optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
// }));

// // 6.Active l'analyse des données JSON
// app.use(express.json());

// // 8.Importation du reste, y compris les routes
// const route = require('./_routes/base.route')
// // 9.Récupération des variables d'environnement depuis le fichier .env
// const { PORT, NODE_ENV } = process.env

// // 12.Vérifie la connexion à la base de données
// db.sequelize.authenticate()
//     .then(() => console.log('Connection à la DB réussie'))
//     .catch((error) => console.log(`Connection à la DB ratée : ${error}`));
// // Migration de la base de données (s'exécute uniquement en mode de développement)
// if (NODE_ENV === 'development') {
//     db.sequelize.sync({ alter: { drop: false } });
// };
// // 13.Crée le serveur web (API)
// // Ajoute le routage pour suivre le modèle RESTful en ajoutant '/api' comme route de base
// app.use('/api', route)


// // 14.Met en écoute le serveur sur le port spécifié
// app.listen(PORT, () => {
//     console.log(`Web server running on port ${PORT}`);
// });
// module.exports = app

// 1.Importation et configuration de dotenv
require('dotenv').config()
// 2.Module de gestion de la base de données
const db = require("./_models/db.model");
// 3.Importation d'express 
const express = require('express')
// 4.Importation de la gestion d'async-errors
require('express-async-errors');
// 5.Crée une instance d'application Express
const app = express();
//tentative avec websocket

// ??? import cors
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:4200', // Remplacez par votre URL front-end
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// 6.Active l'analyse des données JSON
app.use(express.json());

// 8.Importation du reste, y compris les routes
const route = require('./_routes/base.route')
// 9.Récupération des variables d'environnement depuis le fichier .env
const { PORT, NODE_ENV } = process.env

// 12.Vérifie la connexion à la base de données
db.sequelize.authenticate()
    .then(() => console.log('Connection à la DB réussie'))
    .catch((error) => console.log(`Connection à la DB ratée : ${error}`));
// Migration de la base de données (s'exécute uniquement en mode de développement)
if (NODE_ENV === 'development') {
    db.sequelize.sync({ alter: { drop: false } });
};

if (NODE_ENV === 'development') {
    db.sequelize.sync({ alter: { drop: false } });
};

app.use('/api', route)


// Ajout de Socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Ajout de la gestion des connexions WebSocket avec Socket.io
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // Ajoutez d'autres événements de chat ou fonctionnalités ici si nécessaire
});

// Mettez votre serveur en écoute avec Socket.io
server.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});
module.exports = app;

