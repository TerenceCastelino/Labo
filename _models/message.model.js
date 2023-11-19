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
        // idDestinataire: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        idExpediteur: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contenuMessage: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        idConversation: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'messages',
        timestamps: true,
        indexes: [],
    });

    return Message;
};






