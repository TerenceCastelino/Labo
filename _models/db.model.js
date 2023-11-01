// a. Importation du module Sequelize pour gérer la base de données
const { Sequelize } = require('sequelize');

// b. Récupération des variables d'environnement nécessaires à la connexion à la base de données
const { NAME_LOGING, PASSWORD, NAME_DATABASE} = process.env;

// c. Crée une nouvelle instance de l'objet Sequelize pour se connecter à MSSQL
const sequelize = new Sequelize(NAME_DATABASE, NAME_LOGING, PASSWORD, {
  host: 'localhost', // Spécifie l'adresse du serveur de base de données
  dialect: 'mssql', // Utilisez le dialecte 'mssql' pour SQL Server
  logging: false, // Désactive la sortie des requêtes SQL
  dialectOptions: {
    options: {
      trustServerCertificate: true, // Activez cette option si vous utilisez un certificat auto-signé
    },
  },
});

// d. Crée l'objet "db" pour stocker les modèles de base de données
const db = {};

// e. Associe l'instance Sequelize à "sequelize" et le module Sequelize à "Sequelize" pour une utilisation ultérieure
db.sequelize = sequelize;
db.Sequelize = Sequelize;
// Importe un modèle spécifique de la base de données à partir d'un fichier externe
db.Utilisateur = require('./utilisateur.model')(sequelize);


module.exports = db;
