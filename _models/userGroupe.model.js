const {Sequelize, DataTypes, ModelStatic } = require('sequelize');
const db = require('./db.model')

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */

module.exports = (sequelize) => {
  const UserGroupe = sequelize.define('UserGroupe', {
      idUtilisateur: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
              model: 'Utilisateur', // Référence au modèle Utilisateur
              key: 'idUtilisateur', // Clé primaire dans le modèle Utilisateur
          },
      },
      idGroupe: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
              model: 'Groupe', // Référence au modèle Groupe
              key: 'idGroupe', // Clé primaire dans le modèle Groupe
          },
      },
  }, {
      sequelize,
      modelName: 'UserGroupe',
      timestamps: false,
  });

  return UserGroupe;
};

// module.exports = (sequelize) => {
//   const UserGroup = sequelize.define('UserGroup', {
//     // Pas de définition de colonnes ici
//   });

//   return UserGroup;
// };

