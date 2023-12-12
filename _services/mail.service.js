// const emailPerdu = require('../_dto')

const userController = require('../_controllers/utilisateur.controller')
const db = require('../_models/db.model')

const emailService = {
    existeMail: async (data) => {
        try {
            const usersMail = await userController.getAllMail()

            if (data === emailUtilisateur) {

            }

        } catch (err) {

        }
    }
    //!travail en cour
}
module.exports = emailService