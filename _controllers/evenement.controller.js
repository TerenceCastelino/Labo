const evenementService = require('../_services/evenement.service')
const groupeValidator = require('../_validators/groupe.validateur')
const eventValidator = require('../_validators/evenement.validator')


const evenementController = {

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

    deletedEvent: async (req, res) => {
        console.log('Je suis à l\'entrée du contrôleur');
        try {
            console.log('Je suis dans le bloc try du contrôleur');
            const { idGroupe, idEvenement } = req.params;
            const deletedFull = await evenementService.deletedEvenement(idGroupe, idEvenement);

            // Si la suppression s'est déroulée avec succès
            res.status(200).json({ message: 'Événement supprimé avec succès.' });

        } catch (error) {
            console.error('Problème dans le contrôleur :', error.message);
            res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement.' });
        }
    },
    // Contrôleur pour gérer la mise à jour d'un événement
    patchEvent: async (req, res) => {
        try {
            // Extraction des paramètres de la requête
            const { idEvenement, idCreateur } = req.params;

            // Données à mettre à jour pour l'événement
            const eventData = req.body;

            // Validation des données de l'événement
            const validatedEventData = await eventValidator.validate(eventData);

            // Appel au service pour mettre à jour l'événement
            const updatedEvent = await evenementService.patchEvent(idEvenement, idCreateur, validatedEventData);

            // Vérification si l'événement a été mis à jour avec succès
            if (!updatedEvent) {
                res.status(404).json({ error: 'Événement non trouvé' });
                return;
            }

            // Renvoi de l'événement mis à jour en réponse
            res.status(200).json(updatedEvent);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'événement :', error);
            res.status(400).json({ error: 'Erreur lors de la mise à jour de l\'événement' });
        }
    },

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