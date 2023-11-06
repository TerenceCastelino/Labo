const {Sequelize, DataTypes, ModelStatic } = require('sequelize');

/**
 * Fonction pour créer un model Character (donc table de db)
 * Le JSDoc sert à l'autocomplétion
 * @param {Sequelize} sequelize
 * @returns {ModelStatic<any>}
 */


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

