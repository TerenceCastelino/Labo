const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize,) => {
    const Evenement = sequelize.define('Evenement', {
        idEvenement: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        idCreateur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Utilisateur',
                key: 'idUtilisateur',
            },
        },
        idGroupe: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Groupes',
                key: 'idGroupe',
            },
        },
        dateDebut: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dateFin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        lieu: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('a venir', 'en cours', 'terminer', 'repousser', 'annuler'),
            allowNull: false,
        },
    });



    return Evenement;
};
