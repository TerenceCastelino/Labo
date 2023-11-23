const EvenementDTO = require('../_dto/evenement.dto')
const GroupeDTO = require('../_dto/groupe.dto');
const UserGroupeDTO = require('../_dto/userGroupe.dto')
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
    },
    // _____________EXCLUSIF___EVENEMENT__________________ 
    //
    //
    //
    addEvent: async (data) => {
        //Cree un evenement OK

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

            // Retourne un objet contenant les informations du groupe et du lien avec l'utilisateur
            return {
                groupe: new GroupeDTO(groupe), // Objet GroupeDTO créé à partir du groupe
                newUserGroup: new UserGroupeDTO(newUserGroup) // Objet UserGroupeDTO créé à partir du lien utilisateur-groupe
            };
        } catch (error) {
            throw new Error(`Erreur lors de la création du groupe : ${error.message}`);
        }
    },
    //
    //
    //
    //Affiche tous les utilisateur d un Evenement OK
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

    // deleted un evenement

    // patch un evenement qui appartien a l' idCreateur

}
module.exports = evenementService