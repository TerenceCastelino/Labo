const groupeService = require('../_services/groupe.service');
const groupeValidator = require('../_validators/groupe.validateur');

const groupeController = {
    addGroupe: async (req, res) => {
        try {
            const groupeData = req.body;

            // Validation des données entrantes
            const valideData = await groupeValidator.validate(groupeData, { abortEarly: false });

            // Appel au service pour ajouter le groupe
            const groupeInserted = await groupeService.addGroupe(valideData);

            if (groupeInserted) {
                return res.status(201).json(groupeInserted);
            }
        } catch (error) {
            console.error(`Erreur dans le contrôleur lors de l'ajout du groupe : ${error.message}`);
            return res.status(500).json({ error: 'Erreur lors de la création du groupe' });
        }
    },
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
    getGroupMembers: async (req, res) => {
        // Logique pour récupérer les membres d'un groupe
    },
};

module.exports = groupeController;

    

