const { Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */



module.exports = (sequelize) => {
    const AnnonceContenu = sequelize.define('AnnonceContenu', {
        idAnnonce: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Annonce',
                key: 'idAnnonce',
            },
        },
        idContenu: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Contenu',
                key: 'idContenu',
            },
        },
    }, {
        sequelize,
        modelName: 'AnnonceContenu',
        timestamps: false,
    });

    return AnnonceContenu;
};
