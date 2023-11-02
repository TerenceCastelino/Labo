const {Sequelize, DataTypes, ModelStatic } = require('sequelize');

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */


// module.exports = (sequelize) => {
//     module.exports 
// const Contenu = sequelize.define('Contenu', {
//   idContenu: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   chemin: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   idUtilisateur: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   typeContenu: {
//     type: DataTypes.ENUM('image', 'video'),
//     allowNull: false,
//   },
//   // dateDeCreation: {
//   //   type: DataTypes.DATE,
//   //   defaultValue: DataTypes.NOW,
//   // },
//   nom: {
//     type: DataTypes.STRING,
//   },
// });

// // // Hook Sequelize pour générer automatiquement la valeur de la colonne "nom"
// // Contenu.addHook('beforeCreate', (contenu, options) => {
// //   // Génération de la valeur de la colonne "nom" en concaténant la date de création, le chemin et le nom de fichier
// //   contenu.nom = `${contenu.dateDeCreation.getTime()}_${contenu.chemin.split('/').pop()}`;
// // });

// return Contenu
// }


module.exports = (sequelize) => {
  const Contenu = sequelize.define('Contenu', {
    idContenu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chemin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idUtilisateur: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeContenu: {
      type: DataTypes.ENUM('image', 'video'),
      allowNull: false,
    },
    nom: {
      type: DataTypes.STRING,
    },
  });

  Contenu.associate = (models) => {
    Contenu.belongsTo(models.Utilisateur, { foreignKey: 'idUtilisateur' });
  };

  return Contenu;
};

