// // Importation du contrôleur d'utilisateur

// // Création d'un routeur Express
// const utilisateurRouter = require('express').Router()


// // Configuration des routes pour les opérations CRUD (Create, Read, Update, Delete)
// const utilisateurController = require('../_controllers/utilisateur.controller')
// // Route pour gérer toutes les requêtes HTTP vers '/???'
// utilisateurRouter.route('/')
//  .get(utilisateurController.getAll) //- Récupérer tous les utilisateurs
//  .post(utilisateurController.add) //- Ajouter un utilisateur
// // .all - Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
// .all(((res, req) => {
//     res.sendStatus(405);
// }));
// utilisateurRouter.route('/:id')
// //  Route pour gérer les requêtes HTTP vers '/????/:id'
//  .get(utilisateurController.getById) //- Récupérer un utilisateur par ID
//  .put(utilisateurController.update) //- Mettre à jour un utilisateur par ID
//  .delete(utilisateurController.delete) //- Supprimer un utilisateur par ID
// // .all - Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
// .all(((res, req) => {
//     res.sendStatus(405);
// }));
// // Exportation du routeur d'utilisateur
// module.exports = utilisateurRouter
// _________________________________________
const utilisateurRouter = require('express').Router();
const utilisateurController = require('../_controllers/utilisateur.controller');

// Route pour gérer toutes les requêtes HTTP vers '/utilisateur'
utilisateurRouter.route('/')
  .get(utilisateurController.getAll) // Récupérer tous les utilisateurs
  .post(utilisateurController.add) // Ajouter un utilisateur
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

// Route pour gérer les requêtes HTTP vers '/utilisateur/:id'
utilisateurRouter.route('/:id')
  .get(utilisateurController.getById) // Récupérer un utilisateur par ID
  .put(utilisateurController.update) // Mettre à jour un utilisateur par ID
  .delete(utilisateurController.delete) // Supprimer un utilisateur par ID
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

module.exports = utilisateurRouter;
