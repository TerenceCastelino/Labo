const groupeRouter =  require('express').Router()
const groupeController =  require('../_controllers/groupe.controller')

groupeRouter.route('/')
.post(groupeController.addGroupe)
.all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

groupeRouter.route('/addUser/:idGroupe/:idUtilisateur')
.post(groupeController.addUserToGroup)
.all((req, res) => {
  res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
});



  module.exports = groupeRouter