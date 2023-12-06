// messageInstantane.model.js

const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const MessageInstantane = sequelize.define('MessageInstantane', {
        idMessageInstantane: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
            allowNull: false,
        },
    }, {
        tableName: 'message_instantane',
        timestamps: true,

    });

    return MessageInstantane;
}