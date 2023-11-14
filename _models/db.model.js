// a. Importation du module Sequelize pour gérer la base de données
const { Sequelize } = require('sequelize');

// b. Récupération des variables d'environnement nécessaires à la connexion à la base de données
const { NAME_LOGING, PASSWORD, NAME_DATABASE} = process.env;

// Initilisation une nouvelle instance de l'object avec SQLite en paramètre

if(process.env.NODE_ENV === 'test')
 {let sequelize;
      sequelize = new Sequelize('sqlite::memory:',{// disable logging; default: console.log
        logging: false});   
// d. Crée l'objet "db" pour stocker les modèles de base de données
const db = {};

// e. Associe l'instance Sequelize à "sequelize" et le module Sequelize à "Sequelize" pour une utilisation ultérieure
db.sequelize = sequelize;
db.Sequelize = Sequelize;   

// Importe un modèle spécifique de la base de données à partir d'un fichier externe
db.Utilisateur = require('./utilisateur.model')(sequelize);
db.Contenu = require('./constenu.model')(sequelize)
db.Message = require('./message.model')(sequelize)

module.exports = db;
}











// c. Crée une nouvelle instance de l'objet Sequelize pour se connecter à MSSQL
if(process.env.NODE_ENV === 'development'){
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
db.Contenu = require('./constenu.model')(sequelize)
db.Message = require('./message.model')(sequelize)

db.Utilisateur.hasMany(db.Contenu,{foreignKey:'idUtilisateur'})
db.Contenu.belongsTo(db.Utilisateur,{foreignKey:'idUtilisateur'})

// db.Utilisateur.hasMany(db.Message,{foreignKey:'idUtilisateur'})
// Par exemple, si vous souhaitez associer les messages aux utilisateurs :
db.Message.belongsTo(db.Utilisateur, { foreignKey: 'idDestinataire', as: 'Destinataire' });
db.Message.belongsTo(db.Utilisateur, { foreignKey: 'idExpediteur', as: 'Expediteur' });

module.exports = db;
}



