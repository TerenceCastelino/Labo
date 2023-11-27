const evenementRouter = require('express').Router()
const evenementController = require('../_controllers/evenement.controller')



// localhost:3000/api/evenement
//Cree un groupe qui cree un usergroupe qui cree un evenement  OK

evenementRouter.route('/')
    .post(evenementController.creationEvent)//ICI creation de groupe d evenement
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

// localhost:3000/api/evenement/event/5
//Affiche tous les evenements d un utilisateur

evenementRouter.route('/userEvent/:idUtilisateur')
    .get(evenementController.getGroupeEventUser)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

// localhost:3000/api/evenement/event/:idGroupe
//Affiche tous les utilisateur d un Evenement OK

evenementRouter.route('/event/:idGroupe')
    .get(evenementController.getAllMembreS)
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

// localhost:3000/api/evenement/idGroupe
//affiche un evenement

evenementRouter.route('/:idGroupe')
    .get(evenementController.getByIdEvent)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });
//Suprimer un evenement
evenementRouter.route('/deleted/:idGroupe/:idEvenement')
    .delete(evenementController.deletedEvent)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

//patch afin de modifier une heure de debut ou de fin ou son status
evenementRouter.route('/patch/idEvenement/:idEvenement/idCreateur/:idCreateur')
    .patch(evenementController.patchEvent)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });


module.exports = evenementRouter