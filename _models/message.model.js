const {Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Message = sequelize.define('Message', {
      idMessage: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idDestinataire: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idExpediteur: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contenuMessage: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      note: {
        type: DataTypes.ENUM('like', 'pas_like'),
        allowNull: true,
      },
    }, {
      tableName: 'messages', // Vous pouvez définir le nom de la table ici
      timestamps: true, // Si vous souhaitez utiliser les champs createdAt et updatedAt
      indexes: [
        // Définissez vos index ici si nécessaire
      ],
    });
  
  
    return Message;
  };