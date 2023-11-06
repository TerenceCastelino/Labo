const {Sequelize, DataTypes, ModelStatic } = require('sequelize');

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const Utilisateur = sequelize.define('Utilisateur', {
    idUtilisateur: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    motsDePasse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    jwt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
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
        isBefore: new Date().toISOString().split('T')[0],
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
    tableName: 'utilisateur',
    timestamps: true,
    indexes: [
      {
        name: 'UK_Auth__jwt',
        fields: ['emailUtilisateur', 'jwt'],
        unique: false,
      },
    ],
  });

  Utilisateur.associate = (models) => {
    Utilisateur.hasMany(models.Contenu, { foreignKey: 'idUtilisateur' });
  };

  return Utilisateur;
};
