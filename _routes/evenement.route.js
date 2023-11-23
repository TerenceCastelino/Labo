const evenementRouter = require('express').Router()
const evenementController = require('../_controllers/evenement.controller')


evenementRouter.route('/:idCreateur/:idGroupe')
    .post(evenementController.addEvenementGroupe)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });


module.exports = evenementRouter