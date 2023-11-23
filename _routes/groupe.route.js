const groupeRouter = require('express').Router()
const groupeController = require('../_controllers/groupe.controller')

groupeRouter.route('/')
  .post(groupeController.addGroupe)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });
groupeRouter.route('/event')
  .post(groupeController.addGroupeEvent)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

groupeRouter.route('/groupe/:idGroupe')
  .get(groupeController.getGroupMembers)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

groupeRouter.route('/user/:idUtilisateur')
  .get(groupeController.getGroupeUser)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });
groupeRouter.route('/userEvent/:idUtilisateur')
  .get(groupeController.getGroupeEventUser)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

groupeRouter.route('/exiteGroupe/:idGroupe/:idUtilisateur')
  .delete(groupeController.exite)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

groupeRouter.route('/updateGroupe/:idGroupe/:idUtilisateur')
  .put(groupeController.updateGroupe)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });


groupeRouter.route('/addUser/:idGroupe/:idUtilisateur')
  .post(groupeController.addUserToGroup)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });



module.exports = groupeRouter