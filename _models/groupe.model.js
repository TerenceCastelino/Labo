const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */



module.exports = (sequelize) => {
  const Groupe = sequelize.define('Groupe', {
    idGroupe: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCreateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomGroupe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descriptionGroupe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photoProfilGroupe: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genreGroupe: {
      type: DataTypes.ENUM('groupe', 'event'),
      allowNull: true,
    }

  },
    {
      sequelize,
      modelName: 'Groupe',
      timestamps: true, // Active les horodatages createdAt et updatedAt
    }
  );

  return Groupe;
}
