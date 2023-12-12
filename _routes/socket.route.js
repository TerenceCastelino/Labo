const socketRouter = require('express').Router();
const socketController = require('../_controllers/socket.controller')



socketRouter.route('/')
    .get(socketController.get)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

socketRouter.route('/2')
    .get(socketController.get2)
    .all((req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

module.exports = socketRouter;


