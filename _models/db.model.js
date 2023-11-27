// _____________________________// Importation du module Sequelize pour gérer la base de données
const { Sequelize } = require('sequelize');

// Récupération des variables d'environnement nécessaires à la connexion à la base de données
const { NAME_LOGING, PASSWORD, NAME_DATABASE } = process.env;

// Initialisation d'une nouvelle instance de l'objet avec SQLite en paramètre
if (process.env.NODE_ENV === 'test') {
  let sequelize;
  sequelize = new Sequelize('sqlite::memory:', {
    // disable logging; default: console.log
    logging: false
  });

  // Crée l'objet "db" pour stocker les modèles de base de données
  const db = {};

  // Associe l'instance Sequelize à "sequelize" et le module Sequelize à "Sequelize" pour une utilisation ultérieure
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // Importe un modèle spécifique de la base de données à partir d'un fichier externe
  db.Utilisateur = require('./utilisateur.model')(sequelize);
  db.Contenu = require('./constenu.model')(sequelize)
  db.Message = require('./message.model')(sequelize)

  module.exports = db;
}

// _______________Development_____________________________________________________________

// Crée une nouvelle instance de l'objet Sequelize pour se connecter à MSSQL
if (process.env.NODE_ENV === 'development') {
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

  // Crée l'objet "db" pour stocker les modèles de base de données
  const db = {};

  // Associe l'instance Sequelize à "sequelize" et le module Sequelize à "Sequelize" pour une utilisation ultérieure
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  // Import des modèles spécifiques depuis des fichiers externes
  db.Utilisateur = require('./utilisateur.model')(sequelize);
  db.Contenu = require('./constenu.model')(sequelize);
  db.Groupe = require('./groupe.model')(sequelize);
  db.UserGroup = require('./userGroupe.model')(sequelize);
  db.Message = require('./message.model')(sequelize);
  db.Evenement = require('./evenement.model')(sequelize);
  db.Annonce = require('./annonces.model')(sequelize)
  db.AnnonceContenu = require('./annonce&Contenus.model')(sequelize);
  db.Produit = require('./produit.model')(sequelize);
  db.Panier = require('./panier.model')(sequelize)
  db.Commande = require('./commande.model')(sequelize)

  // Définition des associations entre les modèles
  db.Utilisateur.hasMany(db.Contenu, { foreignKey: 'idUtilisateur' });
  db.Contenu.belongsTo(db.Utilisateur, { foreignKey: 'idUtilisateur' });

  db.Message.belongsTo(db.Utilisateur, { foreignKey: 'idExpediteur', as: 'Expediteur' });
  db.Message.belongsTo(db.UserGroup, { foreignKey: 'idConversation', as: 'Conversation' });

  db.Utilisateur.belongsToMany(db.Groupe, { through: db.UserGroup, foreignKey: 'idUtilisateur' });
  db.Groupe.belongsToMany(db.Utilisateur, { through: db.UserGroup, foreignKey: 'idGroupe' });

  db.Utilisateur.hasMany(db.Evenement, { foreignKey: 'idCreateur', as: 'Createur' });
  db.Evenement.belongsTo(db.Utilisateur, { foreignKey: 'idCreateur', as: 'Createur' });

  db.Groupe.hasMany(db.Evenement, { foreignKey: 'idGroupe', as: 'Evenements' });
  db.Evenement.belongsTo(db.Groupe, { foreignKey: 'idGroupe', as: 'Groupe' });

  db.Annonce.belongsToMany(db.Contenu, { through: db.AnnonceContenu, foreignKey: 'idAnnonce' });
  db.Contenu.belongsToMany(db.Annonce, { through: db.AnnonceContenu, foreignKey: 'idContenu' });

  // Relations pour les Commandes et Paniers
  db.Panier.belongsTo(db.Utilisateur, { foreignKey: 'idUtilisateur' });
  db.Commande.belongsTo(db.Panier, { foreignKey: 'idPanier' });
  db.Commande.belongsTo(db.Utilisateur, { foreignKey: 'idUtilisateur' });

  module.exports = db;
}
