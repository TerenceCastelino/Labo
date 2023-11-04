const contenuRouter = require('express').Router();
const {contenuController, uploadMiddelware} = require('../_controllers/constenuController')


// localhost:3000/api/contenu/id
contenuRouter.route('/:id/')
  .post(uploadMiddelware,contenuController.addContenu)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });

// localhost:3000/api/contenu/id/images
contenuRouter.route('/:id/images')
  .get(contenuController.getAllImage)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });  

// localhost:3000/api/contenu/3/videos
contenuRouter.route('/:id/videos')
  .get(contenuController.getAllVideo)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });  

// localhost:3000/api/contenu/id/idContenu
contenuRouter.route('/:id/:idContenu')
  .delete(contenuController.delete)
  .get(contenuController.getOneContenu)
  .all((req, res) => {
    res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
  });  

module.exports = contenuRouter