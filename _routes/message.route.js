const messageRouter = require('express').Router()
const messageController = require('../_controllers/message.controller')

messageRouter.route('/:idgroup')
  .get(messageController.getAll)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });


messageRouter.route('/:idExpediteur/:idConversation')
  // .post(messageController.addMessageUtilisateur)
  .post(messageController.addMessageGroupe)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

messageRouter.route('/:idExpediteur/suprimer/:idMessage')
  .delete(messageController.deleted)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

module.exports = messageRouter;
