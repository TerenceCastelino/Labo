// conversation.model.js
const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Conversation = sequelize.define('Conversation', {
        idConversation: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUtilisateur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Utilisateur', // Référence au modèle Utilisateur
                key: 'idUtilisateur', // Clé primaire dans le modèle Utilisateur
            },
        },

    }, {
        sequelize,
        tableName: 'conversation',
        timestamps: false,
    });

    return Conversation
}
