const messageRouter = require('express').Router()
const messageController =  require('../_controllers/message.controller')

messageRouter.route('/:idExpediteur/:idDestinataire')
  .post(messageController.addMessageUtilisateur)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

module.exports = messageRouter;
