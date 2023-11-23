const groupeService = require('../_services/groupe.service');
const groupeValidator = require('../_validators/groupe.validateur');
const groupeUpdateValidator = require('../_validators/groupeUpdate.validator')
const contenuService = require('../_services/contenu.service')

const groupeController = {
    // _____________EXCLUSIF___GROUPE__________________ 
    //Crée un groupe
    addGroupe: async (req, res) => {
        try {
            const groupeData = req.body;

            // Validation des données entrantes
            const valideData = await groupeValidator.validate(groupeData, { abortEarly: false });

            // Appel au service pour ajouter le groupe
            const groupeInserted = await groupeService.addGroupeService(valideData);

            if (groupeInserted) {
                return res.status(201).json(groupeInserted);
            }
        } catch (error) {
            console.error(`Erreur dans le contrôleur lors de l'ajout du groupe : ${error.message}`);
            return res.status(500).json({ error: 'Erreur lors de la création du groupe' });
        }
    },
    //Crée un groupe

    //Ajouter des utilisateurs a un groupe
    addUserToGroup: async (req, res) => {
        try {

            const { idGroupe, idUtilisateur } = req.params; // Récupère les données JSON du corps de la requête



            // Appelle la méthode addUserToGroup du service
            const result = await groupeService.addUserToGroup(idGroupe, idUtilisateur);

            return res.status(200).json(result);
        } catch (error) {
            console.error(`Erreur lors de l'ajout de l'utilisateur au groupe : ${error.message}`);
            return res.status(500).json({ error: "Erreur lors de l'ajout de l'utilisateur au groupe." });
        }
    },
    //Afficher tous les utilisateurs du groupe
    getGroupMembers: async (req, res) => {
        try {
            const { idGroupe } = req.params;


            if (!idGroupe) {
                return res.status(400).json({ error: 'ID du groupe manquant dans la requête' });
            }
            const userGroupe = await groupeService.getGroupMembers(idGroupe)
            res.status(200).json(userGroupe);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur' });
        }

    },
    // getEventMembers: async (req, res) => {
    //     try {
    //         const { idGroupe } = req.params;


    //         if (!idGroupe) {
    //             return res.status(400).json({ error: 'ID du groupe manquant dans la requête' });
    //         }
    //         const userGroupe = await groupeService.getGroupMembers(idGroupe)
    //         res.status(200).json(userGroupe);
    //     } catch (error) {
    //         console.error('Erreur lors de la récupération des utilisateur :', error);
    //         res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur' });
    //     }

    // },
    getGroupeUser: async (req, res) => {
        try {
            const { idUtilisateur } = req.params;
            if (!idUtilisateur) {
                return res.status(400).json({ error: 'id utilisateur manquant' })
            }

            const groupeUser = await groupeService.getAllGroupeUser(idUtilisateur)
            res.status(200).json(groupeUser)

        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur' });
        }
    },
    getGroupeEventUser: async (req, res) => {
        try {
            const { idUtilisateur } = req.params;
            if (!idUtilisateur) {
                return res.status(400).json({ error: 'id utilisateur manquant' })
            }

            const groupeUser = await groupeService.getAllGroupeEventUser(idUtilisateur)
            res.status(200).json(groupeUser)

        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateur :', error);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateur' });
        }
    },
    exite: async (req, res) => {
        try {
            const { idGroupe, idUtilisateur } = req.params
            const isExited = await groupeService.exiteGroupe(idGroupe, idUtilisateur)

            if (isExited) {
                res.sendStatus(204)
                return
            }
            res.sendStatus(404)

        } catch (error) {
            console.error('Erreur lors de la suppression de l utilisateur du groupe :', error);
            res.status(400).json({ error: 'Erreur lors de la suppression' });

        }
    },

    // Méthode pour mettre à jour un groupe
    updateGroupe: async (req, res) => {
        try {
            const { idUtilisateur, idGroupe } = req.params;
            const groupeData = req.body;

            // Validation des données du groupe
            const validatedData = await groupeUpdateValidator.validate(groupeData);

            // Appel à la méthode updateGroupe du service
            const updatedGroupe = await groupeService.updateGroupe(parseInt(idUtilisateur), parseInt(idGroupe), validatedData);

            res.status(200).json(updatedGroupe);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du groupe :', error);
            res.status(400).json({ error: 'Erreur lors de la mise à jour du groupe' });
        }
    },

};

module.exports = groupeController;



