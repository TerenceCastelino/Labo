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

utilisateurRouter.route('/login')
  .post(utilisateurController.login)
  .all((res, req) => {
      res.statusCode(405).send('Unavailable')
  });

utilisateurRouter.route('/register')
  .post(utilisateurController.register)
  .all((res, req) => {
      res.statusCode(405).send('Unavailable')
  });

module.exports = utilisateurRouter;
