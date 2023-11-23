const groupeRouter = require('express').Router()
const groupeController = require('../_controllers/groupe.controller')

groupeRouter.route('/')
  //Crée un groupe
  .post(groupeController.addGroupe)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });



//affiche tous les membre d un groupe
groupeRouter.route('/groupe/:idGroupe')
  .get(groupeController.getGroupMembers)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });
//affiche tous les groupes d un membre
groupeRouter.route('/user/:idUtilisateur')
  .get(groupeController.getGroupeUser)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

// _____________MIXTE____GROUPE______EVENT________________

//sort un membre du groupe ou d un event
groupeRouter.route('/exiteGroupe/:idGroupe/:idUtilisateur')
  .delete(groupeController.exite)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

//modifie un groupe ou un event
groupeRouter.route('/updateGroupe/:idGroupe/:idUtilisateur')
  .put(groupeController.updateGroupe)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

//Ajoute un utilisateur au groupe ou dans un event
groupeRouter.route('/addUser/:idGroupe/:idUtilisateur')
  .post(groupeController.addUserToGroup)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });



module.exports = groupeRouter