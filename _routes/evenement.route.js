const evenementRouter = require('express').Router()
const groupeController = require('../_controllers/groupe.controller')
const evenementController = require('../_controllers/evenement.controller')


//??________________________________________________Ok______________________________________
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
//??________________________________________________Ok______________________________________

// localhost:3000/api/evenement/idCreateur/idGroupe 
//cree un event a partir d un groupeEvent

evenementRouter.route('/:idCreateur/:idGroupe')
    .post(evenementController.addEvenementGroupe) //ICI la methode a assigner a un groupe d eventoooooooooooooooooooooooooooooooooooooooooooo
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

// // afficher tous les event d un membre







module.exports = evenementRouter