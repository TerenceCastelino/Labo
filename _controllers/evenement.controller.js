const evenementService = require('../_services/evenement.service')
const evenementValidador = require('../_validators/evenement.validator')
const groupeController = require('../_controllers/groupe.controller')
const groupeValidator = require('../_validators/groupe.validateur')


const evenementController = {
    addEvenementGroupe: async (req, res) => {

        //probleme sa ne cree pas un groupe dans la table groupe en event
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
    creationEvent: async (req, res) => {
        //Cree un evenement OK

        try {
            const groupeData = req.body; // Récupération des données du groupe depuis la requête

            // Validation des données entrantes
            const valideData = await groupeValidator.validate(groupeData, { abortEarly: false });

            // Appel au service pour ajouter le groupe
            const groupeInserted = await evenementService.addEvent(valideData);

            // Réponse HTTP avec le groupe inséré en cas de succès
            if (groupeInserted) {
                return res.status(201).json(groupeInserted);
            }
        } catch (error) {
            console.error(`Erreur dans le contrôleur lors de l'ajout du groupe : ${error.message}`);
            // Réponse HTTP avec une erreur en cas d'échec
            return res.status(500).json({ error: 'Erreur lors de la création du groupe' });
        }
    },
    getAllMembreS: async (req, res) => {
        try {
            const { idGroupe } = req.params;


            if (!idGroupe) {
                return res.status(400).json({ error: 'ID du groupe manquant dans la requête' });
            }
            const userGroupe = await evenementService.getALLMembersService(idGroupe)
            res.status(200).json(userGroupe);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur' });
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
    },
    //??
    getGroupeEventUser: async (req, res) => {
        try {
            const { idUtilisateur } = req.params;
            if (!idUtilisateur) {
                return res.status(400).json({ error: 'id utilisateur manquant' })
            }

            const groupeUser = await evenementService.getAllGroupeEventUser(idUtilisateur)
            res.status(200).json(groupeUser)

        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur' });
        }
    },

};

module.exports = evenementController