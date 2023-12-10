const authentificationController = require('../_controllers/authentification.controller');

const authentificationRouter = require('express').Router();



// localhost:3000/api/authentification/login
authentificationRouter.route('/login')
  .get(authentificationController.get)
  .post(authentificationController.login)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

// localhost:3000/api/authentification/register
authentificationRouter.route('/register')
  .post(authentificationController.register)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });


module.exports = authentificationRouter;