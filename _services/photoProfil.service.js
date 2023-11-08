const db = require('../_models/db.model');

const profilesService = {
  getAllProfilePhotos: async () => {
    try {
      const profilePhotos = await db.sequelize.query(
        'SELECT c.nom , u.prenom ,u.nom as nom_user, chemin, idContenu  FROM Contenus AS c, utilisateur AS u WHERE c.idContenu = u.idPhotoProfil AND c.typeContenu = :contentType',
        //les colonnes qui porte le meme nom l une ecrase l autre !!! bien faire attention!!!!
        {
          model: db.Contenu,
          mapToModel: true,
          replacements: { contentType: 'image' },
        }
      );

      return profilePhotos;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = profilesService;







