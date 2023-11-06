// const db = require('../_models/db.model');
// const contenuDTO = require('../_dto/contenu.dto');

// const profilesService = {
//   getAllProfilePhotos: async () => {
//     try {
//       const profilePhotos = await db.Contenu.findAll({
//         where: {
//           typeContenu: 'image', // Filtre pour les contenus de type image
//         },
//         include: [
//           {
//             model: db.Utilisateur,
//             as: 'Utilisateur',
//             attributes: [],
//           },
//         ],
//       });
      
//       console.log('iiiiiiiiiiiiiiiiccccccccccccciiiiiiiiiiiiiiiiiiiiiiii');
//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;

const db = require('../_models/db.model');
const contenuDTO = require('../_dto/contenu.dto');
const { Sequelize } = require('sequelize');

const profilesService = {
  getAllProfilePhotos: async () => {
    try {
      const profilePhotos = await db.Contenu.findAll({
        where: {
          typeContenu: 'image', // Filtre pour les contenus de type image
        },
        include: [
          {
            model: db.Utilisateur,
            as: 'Utilisateur',
            where: {
              idPhotoProfil: Sequelize.col('Contenu.idContenu'),
            },
            attributes: [],
          },
        ],
      });
      
      return profilePhotos.map((photo) => new contenuDTO(photo));
    } catch (error) {
      throw error;
    }
  },
};

module.exports = profilesService;

