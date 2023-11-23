const EvenementDTO = require('../_dto/evenement.dto')
const db = require('../_models/db.model')
const { Op } = require('sequelize');


const evenementService = {
    //get one evenement d un utilisateur
    getOneEvent: async (idGroupe) => {
        try {
            if (!idGroupe) {
                throw new Error('ID du groupe manquant');
            }

            const event = await db.Evenement.findOne({
                where: {
                    idGroupe,
                }
            })
            return new EvenementDTO(event)


        } catch (error) {

        }
    },

    // get all evenement 

    // get all evenement d un utilisateur

    // post un evenement
    addToEvenent: async (data, idCreateur, idGroupe) => {
        try {
            const groupId = await db.UserGroup.findOne({
                where: {
                    idGroupe: idGroupe,
                    idUtilisateur: idCreateur
                }
            })
            data.idCreateur = idCreateur
            data.idGroupe = idGroupe

            if (groupId) {


                const evenement = await db.Evenement.create(data)
                await evenement.validate()
                return new EvenementDTO(evenement)
            }

        } catch (error) {
            throw error

        }
    }

    // deleted un evenement

    // patch un evenement qui appartien a l' idCreateur

}
module.exports = evenementService