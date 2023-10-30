// // 1. Importation du service userService pour interagir avec les utilisateurs
// const utilisateurService = require('../_services/utilisateur.service')

// // 2. Importation du validateur userValidator pour valider les données utilisateur

// const utilisateurValidator = require('../_validators/utilisateur.validator')
// // 3. Définition du contrôleur specifique  contenant les méthodes de gestion des requêtes

// const utilisateurController = {

//     getAll: async (req, res) => {
//         const utilisateurDTO = await utilisateurService.allUser();
//         res.status(200).json(utilisateurDTO);
//     },
//     getById: async (req, res) => {
//         // Récupération de l'id depuis les paramètres
//         const { id } = req.params;

//         // Vérification de l'id, s'il est d'un autre type que number alors, 400
//         if (isNaN(id)) {
//             res.sendStatus(400)
//             return;
//         }

//         // Récupération des informations demandées
//         const utilisateurDTO = await utilisateurService.oneUser(id);

//         // Si pas d'object correspondant à l'id, 404
//         if (!utilisateurDTO) {
//             res.sendStatus(404)
//             return;
//         }

//         // Si tout s'est bien passé, 200 et envoi des informations
//         res.status(200).json(utilisateurDTO);
//     },
//     add: async (req, res) => {
//         // On récupère les informations rentrées par l'utilisateur
//         const utilisateurData = req.body;

//         // Validation des informations rentrées par l'utilisateur
//         const validatedData = await utilisateurValidator.validate(utilisateurData);

//         // On envoi à la db ls informations
//         const utilisateurInserted = await utilisateurService.insertUser(validatedData);


//         res
//             // On informe que l'insertion de données s'est correctement déroulée
//             .status(201)
//             // On redirige l'utilisateur sur les informations détaillées du personnage qu'il vient de créer (via son id)
//             .location(`api/utilisateur/${utilisateurInserted.id}`)
//             // On affiche les informations
//             .json(utilisateurInserted)
//     },
//     // ...
//     update: async (req, res) => {
//         // Récupération de l'id depuis les paramètres
//         const { id } = req.params;

//         // On récupère les données à mettre à jour depuis le corps de la requête
//         const userData = req.body;

//         // Validation des données de l'utilisateur
//         const validatedData = await utilisateurValidator.validate(userData);

//         // Mise à jour de l'utilisateur en fonction de l'ID
//         try {
//             const updatedUser = await utilisateurService.updateUser(id, validatedData);

//             // Si l'utilisateur est introuvable, retournez un statut 404
//             if (!updatedUser) {
//                 res.sendStatus(404);
//                 return;
//             }

//             // Retournez l'utilisateur mis à jour avec un statut 200
//             res.status(200).json(updatedUser);
//         } catch (error) {
//             // En cas d'erreur lors de la mise à jour, retournez un statut 400 (Bad Request)
//             res.sendStatus(400);
//         }
//     },
//     delete: async (req, res) => {
//         // Récupération de l'id depuis les paramètres
//         const { id } = req.params;

//         // Envoi de l'id au service pour suppression des infos
//         const isDeleted = await utilisateurService.deleteUser(id);

//         // Si supprimé, 204
//         if (isDeleted) {
//             res.sendStatus(204)
//             return;
//         }
//         // Si pas, 404
//         res.sendStatus(404);
//     }
// }
// // 4. Exportation du contrôleur specifique  pour être utilisé ailleurs dans l'application
// module.exports = utilisateurController
// _____________________________________________________________________
// 1. Importation du service userService pour interagir avec les utilisateurs
const utilisateurService = require('../_services/utilisateur.service');

// 2. Importation du validateur userValidator pour valider les données utilisateur
const utilisateurValidator = require('../_validators/utilisateur.validator');

// 3. Définition du contrôleur spécifique contenant les méthodes de gestion des requêtes
const utilisateurController = {
  getAll: async (req, res) => {
    try {
      const utilisateurDTO = await utilisateurService.allUser();
      res.status(200).json(utilisateurDTO);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ error: 'Erreur de service' });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        res.sendStatus(400);
        return;
      }

      const utilisateurDTO = await utilisateurService.oneUser(id);

      if (!utilisateurDTO) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(utilisateurDTO);
    } catch (error) {
      console.error('Erreur lors de la récupération d\'un utilisateur par ID :', error);
      res.status(500).json({ error: 'Erreur de service' });
    }
  },
  add: async (req, res) => {
    try {
      const utilisateurData = req.body;
      const validatedData = await utilisateurValidator.validate(utilisateurData);
      const utilisateurInserted = await utilisateurService.insertUser(validatedData);

      res
        .status(201)
        .location(`api/utilisateur/${utilisateurInserted.id}`)
        .json(utilisateurInserted);
    } catch (error) {
      console.error('Erreur lors de l\'insertion d\'un utilisateur :', error);
      res.status(400).json({ error: 'Données invalides' });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const validatedData = await utilisateurValidator.validate(userData);

      const updatedUser = await utilisateurService.updateUser(id, validatedData);

      if (!updatedUser) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erreur lors de la mise à jour d\'un utilisateur :', error);
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const isDeleted = await utilisateurService.deleteUser(id);

      if (isDeleted) {
        res.sendStatus(204);
        return;
      }

      res.sendStatus(404);
    } catch (error) {
      console.error('Erreur lors de la suppression d\'un utilisateur :', error);
      res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
  }
};

// 4. Exportation du contrôleur spécifique pour être utilisé ailleurs dans l'application
module.exports = utilisateurController;
