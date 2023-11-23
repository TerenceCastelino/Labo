const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
    const Commentaire = sequelize.define('Commentaire', {
        idCommentaire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        idAuteur: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Utilisateur',
                key: 'idUtilisateur'
            }
        },
        contenuCommentaire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idContenu: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Contenu',
                key: 'idContenu'
            }
        },
        idAnnonce: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Annonce',
                key: 'idAnnonce'
            }
        },
        idGroupe: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Groupe',
                key: 'idGroupe'
            }
        },
        // idEvenement: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'Evenement',
        //         key: 'idEvenement'
        //     }
        // }
    });

    return Commentaire;
};
