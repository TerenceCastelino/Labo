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


        try {

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

    getGroupMembers: async (idGroupe) => {
        try {
            if (!idGroupe) {
                throw new Error('ID du groupe manquant');
            }

            const allUsersGroupe = await db.sequelize.query(
                `
        SELECT ug.idGroupe, u.nom, u.prenom 
        FROM UserGroupes AS ug
        INNER JOIN utilisateur AS u ON ug.idUtilisateur = u.idUtilisateur
        WHERE ug.idGroupe = :idGroupe
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

    getAllGroupeUser: async (idUtilisateur) => {
        try {
            if (!idUtilisateur) {
                throw new Error('ID de l utilisateur manquant');
            }

            const allGroupeUser = await db.sequelize.query(
                `
            SELECT g.nomGroupe , ug.idGroupe
            FROM UserGroupes AS ug
            INNER JOIN Groupes AS g ON ug.idGroupe = g.idGroupe
            WHERE ug.idUtilisateur = :idUtilisateur
            `,
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
    exiteGroupe: async (idGroupe, idUtilisateur) => {
        try {
            const userGroupe = await db.UserGroup.findOne({
                where: { idGroupe, idUtilisateur }
            })

            if (!userGroupe) {
                throw new Error('l utilisateur n a pas ete trouver pour se groupe')
            }

            await userGroupe.destroy()
            return console.log(('l utilisateur a quitter la conversation'));

        } catch (err) {
            throw err
        }
    },

    updateGroupe: async (idCreateur, idGroupe, data) => {
        try {
            const groupe = await db.Groupe.findOne({
                where: { idGroupe }
            });

            if (!groupe) {
                throw new Error('Groupe non trouvé');
            }

            if (groupe.idCreateur !== idCreateur) {
                throw new Error('Utilisateur non autorisé à mettre à jour ce groupe');
            }

            await groupe.update(data);
            return new GroupeDTO(groupe);
        } catch (error) {
            throw error;
        }
    },







};
module.exports = groupeService

