const GroupeDTO = require('../_dto/groupe.dto');
const UserGroupeDTO = require('../_dto/userGroupe.dto')
const db = require('../_models/db.model');

const groupeService = {
    addGroupe: async (data) => {
        try {
            // Création du groupe
            const groupe = await db.Groupe.create(data);

            // Récupération de l'utilisateur (créateur) à partir de l'idCreateur du groupe
            const createur = await db.Utilisateur.findByPk(groupe.idCreateur);

            if (!createur) {
                throw new Error("Utilisateur (créateur) non trouvé.");
            }

            // Création de l'entrée dans UsersGroupes liant le créateur au groupe
            const newUserGroup = await db.UserGroup.create({
                idGroupe: groupe.idGroupe,
                idUtilisateur: createur.idUtilisateur
            });

            return {
                groupe: new GroupeDTO(groupe),
                newUserGroup: new UserGroupeDTO(newUserGroup)
            };
        } catch (error) {
            throw new Error(`Erreur lors de la création du groupe : ${error.message}`);
        }
    },
     addUserToGroup: async (idGroupe, idUtilisateur) => {
        
            console.log('service');
            try {
                console.log('sssssssssssssssssservice try');
                const groupe = await db.Groupe.findByPk(idGroupe);
        
                if (!groupe) {
                    throw new Error("Groupe non trouvé.");
                }
        
                const utilisateur = await db.Utilisateur.findByPk(idUtilisateur);
        
                if (!utilisateur) {
                    throw new Error("Utilisateur non trouvé.");
                }
        
                const newUserGroup = await db.UserGroup.create({
                    idGroupe: groupe.idGroupe,
                    idUtilisateur: utilisateur.idUtilisateur
                });
        
                return new UserGroupeDTO(newUserGroup);
            } catch (error) {
                throw new Error(`Erreur lors de l'ajout de l'utilisateur au groupe : ${error.message}`);
            }
        },
    getGroupMembers: async () => {
        // Logique pour récupérer les membres d'un groupe
    }
};
module.exports = groupeService

