const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
    const Annonce = sequelize.define('Annonce', {
        idAnnonce: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        idAuteur: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // idProduit: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true // Peut être nul
        // },
        descriptionAnnonce: {
            type: DataTypes.STRING,
            allowNull: false
        },
        statuAnnonce: {
            type: DataTypes.ENUM('disponible', 'rupture'),
            allowNull: false
        },
        typeAnnonce: {
            type: DataTypes.ENUM('produit', 'service'),
            allowNull: false
        }
    });



    return Annonce;
};
