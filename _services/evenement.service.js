const EvenementDTO = require('../_dto/evenement.dto')
const GroupeDTO = require('../_dto/groupe.dto');
const UserGroupeDTO = require('../_dto/userGroupe.dto')
const db = require('../_models/db.model')
const { Op } = require('sequelize');


const evenementService = {
      //??__________________________ok_____________________________________________
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
    },
    addEvent: async (data) => {
        //Cree un groupe qui cree un userGroupe avec seulement le createur qui ensuite cree un evenement

        try {
            // Création du groupe avec les données fournies
            data.genreGroupe = 'event';
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

            evenementService.addToEvenent(data, createur.idUtilisateur, groupe.idGroupe,)

            // Retourne un objet contenant les informations du groupe et du lien avec l'utilisateur
            return {
                groupe: new GroupeDTO(groupe), // Objet GroupeDTO créé à partir du groupe
                newUserGroup: new UserGroupeDTO(newUserGroup), // Objet UserGroupeDTO créé à partir du lien utilisateur-groupe
                evenement: new EvenementDTO(data)
            };

        } catch (error) {
            throw new Error(`Erreur lors de la création du groupe : ${error.message}`);
        }
    },
    getALLMembersService: async (idGroupe) => {
        try {
            if (!idGroupe) {
                throw new Error('ID du groupe manquant');
            }

            const allUsersGroupe = await db.sequelize.query(
                `
                SELECT ug.idGroupe, u.nom, u.prenom 
                FROM UserGroupes AS ug
                INNER JOIN utilisateur AS u ON ug.idUtilisateur = u.idUtilisateur
                INNER JOIN Groupes AS g ON ug.idGroupe = g.idGroupe
                WHERE ug.idGroupe = :idGroupe
                AND g.genreGroupe = 'event'
                `,
                {
                    replacements: { idGroupe }, // Paramètre pour idGroupe
                    type: db.sequelize.QueryTypes.SELECT,
                }
            );


            return allUsersGroupe;
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs du groupe :', error);
            throw new Error('Échec de la récupération des utilisateurs du groupe');
        }
    },
    // deleted un evenement
    
    deletedEvenement: async (idGroupe, idEvenement) => {
        try {
            // Vérifier si le groupe existe
            const groupe = await db.Groupe.findOne({ where: { idGroupe } });
            if (!groupe) {
                throw new Error('Le groupe à supprimer n\'existe pas.');
            }
    
            // Vérifier si l'événement existe
            const event = await db.Evenement.findOne({ where: { idEvenement } });
            if (!event) {
                throw new Error('L\'événement à supprimer n\'existe pas.');
            }
    
            // Vérifier si la relation userGroupe existe
            const userGroupe = await db.UserGroup.findOne({ where: { idGroupe } });
            if (!userGroupe) {
                throw new Error('La relation user-groupe à supprimer n\'existe pas.');
            }
    
            // Suppression dans l'ordre inverse pour respecter les contraintes de clés étrangères
            await userGroupe.destroy();
            await event.destroy();
            await groupe.destroy();
    
            console.log('Suppression réussie.');
    
        } catch (error) {
            console.error('Erreur lors de la suppression :', error.message);
            throw new Error('Erreur lors de la suppression de l\'événement');
        }
    },
    
    
     //??________________________________________________Ok______________________________________
    getAllGroupeEventUser: async (idUtilisateur) => {
        try {
            if (!idUtilisateur) {
                throw new Error('ID de l utilisateur manquant');
            }

            const allGroupeUser = await db.sequelize.query(
                `SELECT g.nomGroupe, ug.idGroupe
                  FROM UserGroupes AS ug
                  INNER JOIN Groupes AS g ON ug.idGroupe = g.idGroupe
                  WHERE ug.idUtilisateur = :idUtilisateur
                  AND g.genreGroupe = 'event'`,
                {
                    replacements: { idUtilisateur },
                    type: db.sequelize.QueryTypes.SELECT,
                }
            );

            return allGroupeUser;
        } catch (error) {
            console.error('Erreur lors de la récupération des groupes de l utilisateur :', error);
            throw new Error('Échec de la récupération des groupes de l utilisateur');
        }
    },
    

    
    
}
module.exports = evenementService

    

    // patch un evenement qui appartien a l' idCreateur
    
    // get all evenement 


