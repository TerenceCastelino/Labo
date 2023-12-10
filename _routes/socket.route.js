const socketRouter = require('express').Router();
const socketController = require('../_controllers/socket.controller')

socketRouter.route('/')

    .get(socketController.get)

socketRouter.route('/2')
    .get(socketController.get2)

module.exports = socketRouter;


