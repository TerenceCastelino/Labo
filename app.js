require('dotenv').config()          // Chargement des variables d'environnement depuis un fichier .env
const express = require('express')  // Framework web pour Node.js
require('express-async-errors');    // Gestion des erreurs asynchrones
const app = express();              // Création d'une instance d'application Express
// Ajout de Socket.io
const server = require('http').createServer(app); // Création d'un serveur HTTP
const socketIo = require('./socket.io')           // Importation du module socket.io
socketIo(server)
const path = require('path');

//Import_____Des_____Configue_______________________

const configureCors = require('./_configue/corsConfig');    // Importation de la configuration CORS
const connectToDatabase = require('./_configue/dbConfig');  // Importation de la configuration de la base de données
const sendEmail = require('./_configue/_mail/mailBaseConfig');//! utiliser dans un controlleur pour envois de mail

// fonction des import de configue
connectToDatabase();// Connexion à la base de données
configureCors(app);// Chargement de la configuration CORS depuis le fichier séparé
//! voici la fonction de l envois de mail
// console.log('ici on teste la fonction sendmail', sendEmail('terence30prof@hotmal.com ', 'Sujet de l e-mail : mots de passe perdu', 'Contenu de l e-mail: le lien qui autologera et redirigera l utilisateur pour modifier son mdp'));
sendEmail('terence30prof@hotmal.com ', 'Sujet de l e-mail : mots de passe perdu', 'Contenu de l e-mail: le lien qui autologera et redirigera l utilisateur pour modifier son mdp');


// Utilisation d'Express pour servir des fichiers statiques depuis le répertoire '_public' lorsque des requêtes sont faites vers '/api'
// afin de tester les sockets
app.use('/api', express.static(path.join(__dirname, '_public')));


app.use(express.json());                                    // Activation de l'analyse des données JSON

const route = require('./_routes/base.route')               // Importation des routes
app.use('/api', route) // Utilisation des routes pour '/api'


// Le serveur écoute sur le port spécifié dans les variables d'environnement
server.listen(process.env.PORT, () => {
    console.log(`Web server running on port ${process.env.PORT}`);
});

module.exports = app;// Exportation de l'application Express


