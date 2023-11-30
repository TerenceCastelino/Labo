const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */


module.exports = (sequelize) => {
    const detailPanier = sequelize.define('detailPanier', {
        idPanier: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Paniers', // Référence au modèle Groupe
                key: 'idPanier', // Clé primaire dans le modèle Groupe
            },

        },
        idUtilisateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Utilisateur',
                key: 'idUtilisateur',
            },
        },
        quantiteProduit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return detailPanier;
};