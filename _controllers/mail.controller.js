const mailService = require('../_services/mail.service')
// const mailValidator = require('../_validators')

const mailController = {
    sendFrondMailLoste: async (req, res) => {
        try {
            const { emailPerdu } = req.body
            console.log(emailPerdu);
            // cree un validator adapter

            //cree un service qui verifie si l email existe

            res.status(200).json(emailPerdu)
        } catch (err) {

        }
    }

}
module.exports = mailController