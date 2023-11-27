const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */


module.exports = (sequelize) => {
    const Commande = sequelize.define('Commande', {
        idCommande: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idPanier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Paniers',
                key: 'idPanier',
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
        prixTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        adresseLivraison: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        compteBancaireBeneficiaire: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Commande;
};
