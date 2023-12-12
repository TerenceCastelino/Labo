const mailRouter = require('express').Router()
// const mailController = require('../_controllers/mail.controller')
const utilistaeurController = require('../_controllers/utilisateur.controller')


mailRouter.route('/')
    .get(utilistaeurController.getAllMail)
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

module.exports = mailRouter