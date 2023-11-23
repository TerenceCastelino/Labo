const evenementService = require('../_services/evenement.service')
const evenementValidador = require('../_validators/evenement.validator')
const groupeController = require('../_controllers/groupe.controller')

const evenementController = {
    addEvenementGroupe: async (req, res) => {
        try {
            const { idCreateur, idGroupe } = req.params;
            const dataEvenement = req.body;

            // Ajoutez une vérification pour s'assurer que 'contenuMessage' est défini dans les données
            if (!dataEvenement.description) {
                return res.status(400).json({ error: 'description is required' });
            }

            const valideData = await evenementValidador.validate(dataEvenement);
            valideData.idCreateur = idCreateur;
            valideData.idGroupe = idGroupe;

            const addEvent = await evenementService.addToEvenent(
                valideData,
                idCreateur,
                idGroupe
            )
            res.status(200).json(addEvent);

        } catch (error) {
            console.error('controllerEvent - Error:', error);

            // Si l'erreur provient de la validation Sequelize, renvoyez une réponse 400 Bad Request
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({ error: error.message });
            }

            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    getByIdEvent: async (req, res) => {
        try {
            const { idGroupe } = req.params
            if (isNaN(idGroupe)) {
                res.sendStatus(400)
                return
            }

            const event = await evenementService.getOneEvent(idGroupe)

            if (!event) {
                res.sendStatus(404)
                return
            }

            res.status(200).json(event)


        } catch (error) {
            console.error('erreur lors de la recuperation de l idgroupe de l event');
            res.status(500).json({ error: 'Erreur de service' });
        }
    }


};



module.exports = evenementController