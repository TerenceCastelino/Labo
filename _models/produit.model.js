const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */



module.exports = (sequelize) => {
    const Produit = sequelize.define('Produit', {
        idProduit: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomProduit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prixProduit: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalQuantite: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    });

    return Produit;
};

