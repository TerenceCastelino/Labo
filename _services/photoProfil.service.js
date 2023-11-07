// const db = require('../_models/db.model');
// const contenuDTO = require('../_dto/contenu.dto');
// const { Sequelize } = require('sequelize');
// const utilisateurModel = require('../_models/utilisateur.model');

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
//             where: { idPhotoProfil: db.Sequelize.col('Contenu.idContenu') }, // Lier les deux tables par la colonne idUtilisateur
//             attributes: [],
//           },
//         ],
//       });
      
     
      
      
     

      
//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;

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
//             where: {
//               idPhotoProfil: { [db.Sequelize.Op.not]: null }, // Lier les deux tables par la colonne idUtilisateur
//             },
//             attributes: [],
//           },
//         ],
//       });
// console.log('ggggggggggggggggggggggggggggggggggggggggggg');
//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;
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
//             attributes: [],
//             on: {
//               '$Utilisateur.idPhotoProfil$': { [db.Sequelize.Op.eq]: db.Sequelize.col('Contenu.idContenu') },
//             },
//           },
//         ],
//       });

//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;
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
//             where: {
//               idPhotoProfil: {
//                 [db.Sequelize.Op.not]: null,
//               },
//             },
//             attributes: [],
//           },
//         ],
//       });

//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;

// const db = require('../_models/db.model');
// const { Op } = require('sequelize');
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
//             where: {
//               idPhotoProfil: {
//                 [db.Sequelize.Op.not]: null, // Filtrer les utilisateurs ayant un idPhotoProfil non nul
//               },
//             },
//             attributes: [],
//           },
//         ],
//       });

//       // Filtrer les résultats pour ceux où idPhotoProfil est égal à idContenu
//       const filteredPhotos = profilePhotos.filter((photo) => photo.Utilisateur.idPhotoProfil === photo.idContenu);

//       // Renvoyer les résultats filtrés sous forme de DTO
//       return filteredPhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;

// const db = require('../_models/db.model');
// const contenuDTO = require('../_dto/contenu.dto');
// const Sequelize = require('sequelize');
// const utilisateurModel = require('../_models/utilisateur.model');
// const Op = Sequelize.Op;

// const profilesService = {
//   getAllProfilePhotos: async () => {
//     try {
 
//       const profilePhotos = await db.Contenu.findAll({//je veux dire si idContenu de ma table contenus est = a idPhotoProfil de
//          //ma table utilisateur affiche moi les contenu!!!!
//         include: utilisateurModel,
        
//         where: {
//           idContenu: idUtilisateur // Filtre pour les contenus de type image
//         }
//         // where: {
//         //   typeContenu: 'image', // Filtre pour les contenus de type image
//         // },
//         // include: [
//         //   {
//         //     model: db.Utilisateur,
//         //     where: {
//         //       idPhotoProfil:{ [Op.ne]: null }, // Vérifie que idPhotoProfil n'est pas null 
              
//         //     },
//         //     attributes: [],
//         //   },
//         // ],
//       });
// console.log(profilePhotos);
//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;

// const db = require('../_models/db.model');
// const contenuDTO = require('../_dto/contenu.dto');
// const Sequelize = require('sequelize');


// const profilesService = {
//   getAllProfilePhotos: async () => {
//     try {
//       const profilePhotos = await db.Contenu.findAll({
//         include: [
//           {
//             model: db.Utilisateur,
//             where: {
//               idContenu:  Sequelize.col('Utilisateur.idPhotoProfil')
//             },
//             attributes: [],
//           },
//         ],
//       })

//       return profilePhotos.map((photo) => new contenuDTO(photo));
//     } catch (error) {
//       throw error;
//     }
//   },
// };

// module.exports = profilesService;

const db = require('../_models/db.model');

const profilesService = {
  getAllProfilePhotos: async () => {
    try {
      const profilePhotos = await db.sequelize.query(
        'SELECT c.nom , u.prenom ,u.nom, chemin, idContenu  FROM Contenus AS c, utilisateur AS u WHERE c.idContenu = u.idPhotoProfil AND c.typeContenu = :contentType',
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







