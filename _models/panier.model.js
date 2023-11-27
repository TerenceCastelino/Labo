const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */




module.exports = (sequelize) => {
    const Panier = sequelize.define('Panier', {
        idPanier: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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

    return Panier;
};
