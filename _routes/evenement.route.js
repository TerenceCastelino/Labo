const evenementRouter = require('express').Router()
const groupeController = require('../_controllers/groupe.controller')
const evenementController = require('../_controllers/evenement.controller')



// localhost:3000/api/evenement
//Cree un evenement  OK

evenementRouter.route('/')
    .post(evenementController.creationEvent)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

evenementRouter.route('/:idGroupe')
    .get(evenementController.getByIdEvent)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });



evenementRouter.route('/:idCreateur/:idGroupe')
    .post(evenementController.addEvenementGroupe)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

// afficher tous les event d un membre
evenementRouter.route('/userEvent/:idUtilisateur')
    .get(groupeController.getGroupeEventUser)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });



// affiche tous les membres d un event
//////////////////////////////////////////////////=>
evenementRouter.route('/event/:idGroupe')
    .get(groupeController.getEventMembers)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });


module.exports = evenementRouter