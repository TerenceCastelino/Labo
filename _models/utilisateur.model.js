const {Sequelize, DataTypes, ModelStatic } = require('sequelize');

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
 module.exports = (sequelize) => {
    module.exports 
const Utilisateur = sequelize.define('Utilisateur', {
  idUtilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // L'idUtilisateur sera auto-incrémenté
  },
  motsDePasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // _____new________
  hashedPassword: {
    type: DataTypes.STRING(250),
    allowNull: true,
    // _____________
  },
 // _______new______
  jwt: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  // _____________
  nom: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  emailUtilisateur: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  
  dateDeNaissance: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isBefore: new Date().toISOString().split('T')[0], // Date actuelle
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'utilisateur'),
    allowNull: false,
  },
  genre: {
    type: DataTypes.ENUM('H', 'F', 'X'),
    allowNull: true,
  },
  idPhotoProfil: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  derniereConnexion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  facebook: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  snapchat: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  instagram: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  tictoc: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  twitter: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  telephone: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  gsm: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  // Options du modèle
  tableName: 'utilisateur', // Nom de la table
  timestamps: true, // Active les champs createdAt et updatedAt
  indexes: [
    {
        // Création de contraintes
        name: 'UK_Auth__jwt',
        fields: ['emailUtilisateur', 'jwt'],
        unique: false,
    },
]
});

return Utilisateur;
 }
 