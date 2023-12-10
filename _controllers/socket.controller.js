// const socketService = require('../_services/message.service')
const utilisateurController = require('./utilisateur.controller')
const { join } = require('node:path');

const socketController = {

    get: async (req, res) => {

        res.sendFile(join(__dirname, '../_public/index.html'))

    },
    get2: async (req, res) => {

    }

}

module.exports = socketController