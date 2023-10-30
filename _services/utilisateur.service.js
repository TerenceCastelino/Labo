// // a. Importation du module UserDTO pour la gestion des objets de transfert de données (DTO)
// const UtilisateurDTO = require ('../_dto/utilisateur.dto')
// // b. Importation du module db pour accéder à la base de données
// const db = require('../_models/db.model')
// // c. Importation de l'opérateur Op de Sequelize pour les requêtes complexes
// const { Op } = require('sequelize')
// // d. Définition du service userService qui contient les fonctions pour interagir avec les utilisateurs
// const utilisateurService = {

//     allUser : async () =>{
//         const users = await db.Utilisateur.findAll();
//         return users.map(user => new UtilisateurDTO(user));
//     },
//     oneUser: async (id) => {
//         const user = await db.Utilisateur.findOne({
//             where: { id } // Recherche par ID
//         });

//         return new UtilisateurDTO(user);
//     },
//     insertUser: async (data) => {
//         const user = await db.Utilisateur.create(data)
//         return new UtilisateurDTO(user)
//     },
//     deleteUser: async (id) => {
//         // Recherche l'utilisateur par ID
//         const user = await db.Utilisateur.findOne({
//           where: { id }
//         });
    
//         if (!user) {
//           throw new Error('Utilisateur non trouvé');
//         }
    
//         // Supprime l'utilisateur
//         await user.destroy();
    
//         return 'Utilisateur supprimé avec succès';
//       },
//     updateUser: async (id, data) => {
//         // Recherche l'utilisateur par ID
//         const user = await db.Utilisateur.findOne({
//           where: { id }
//         });
    
//         if (!user) {
//           throw new Error('Utilisateur non trouvé');
//         }
    
//         // Met à jour les informations de l'utilisateur
//         await user.update(data);
    
//         return new UtilisateurDTO(user);
//       },
// }
// // e. Exportation du service userService pour être utilisé dans d'autres parties de l'application
// module.exports = utilisateurService
// ___________________________________________
const UtilisateurDTO = require('../_dto/utilisateur.dto');
const db = require('../_models/db.model');
const { Op } = require('sequelize');

const utilisateurService = {
  allUser: async () => {
    try {
      const users = await db.Utilisateur.findAll();
      return users.map(user => new UtilisateurDTO(user));
    } catch (error) {
      throw error;
    }
  },
  oneUser: async (id) => {
    try {
      const user = await db.Utilisateur.findOne({
        where: { id },
      });
      return new UtilisateurDTO(user);
    } catch (error) {
      throw error;
    }
  },
  insertUser: async (data) => {
    try {
      const user = await db.Utilisateur.create(data);
      return new UtilisateurDTO(user);
    } catch (error) {
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const user = await db.Utilisateur.findOne({
        where: { id },
      });

      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      await user.destroy();

      return 'Utilisateur supprimé avec succès';
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (id, data) => {
    try {
      const user = await db.Utilisateur.findOne({
        where: { id },
      });

      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      await user.update(data);

      return new UtilisateurDTO(user);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = utilisateurService;
