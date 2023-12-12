const passwordPerduRouter = require('express').Router()
const passwordPerduController = require('../_controllers/passwordPerdu.controller')



passwordPerduRouter.route('/')
    .get(passwordPerduController.get)
    .post(passwordPerduController.loginPerdu)
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });
passwordPerduRouter.route('/:emailUtilisateur')
    .get(passwordPerduController.get)
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });


module.exports = passwordPerduRouter