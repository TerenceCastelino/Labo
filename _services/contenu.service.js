const contenuDTO = require('../_dto/contenu.dto')
const db = require('../_models/db.model')
const { Op } = require('sequelize');



const contenuService = {
    
    insertContenu: async (data, idUtilisateur) => {
        try {
            // Créez un nouveau contenu associé à l'utilisateur avec l'ID spécifié
            data.idUtilisateur = idUtilisateur; // Assurez-vous que la clé étrangère idUtilisateur est définie
            const contenu = await db.Contenu.create(data);
            return new contenuDTO(contenu);
        } catch (error) {
            throw error;
        }
    },
    deleteContenu: async (id) => {
        try {
            const contenu = await db.Contenu.findOne({
                where: { idContenu: id },
            });
    
            if (!contenu) {
                throw new Error('Contenu non trouvé');
            }
    
            await contenu.destroy();
    
            return 'Contenu supprimé avec succès';
        } catch (error) {
            throw error;
        }
    },oneContenuForUser: async (idUtilisateur, idContenu) => {
        try {
            const contenu = await db.Contenu.findOne({
                where: { idContenu, idUtilisateur },
            });
    
            if (!contenu) {
                throw new Error('Contenu non trouvé pour cet utilisateur');
            }
    
            return new contenuDTO(contenu);
        } catch (error) {
            throw error;
        }
    },
    oneVideoContenuForUser: async (idUtilisateur, idContenu) => {
        try {
            const contenu = await db.Contenu.findOne({
                where: {
                    idContenu,
                    idUtilisateur,
                    typeContenu: 'video', // Filtre pour les contenus de type vidéo
                },
            });
    
            if (!contenu) {
                throw new Error('Contenu vidéo non trouvé pour cet utilisateur');
            }
    
            return new contenuDTO(contenu);
        } catch (error) {
            throw error;
        }
    },
    
    oneImageContenuForUser: async (idUtilisateur, idContenu) => {
        try {
            const contenu = await db.Contenu.findOne({
                where: {
                    idContenu,
                    idUtilisateur,
                    typeContenu: 'image', // Filtre pour les contenus de type image
                },
            });
    
            if (!contenu) {
                throw new Error('Contenu image non trouvé pour cet utilisateur');
            }
    
            return new contenuDTO(contenu);
        } catch (error) {
            throw error;
        }
    },
    
    allImageContenusForUser: async (idUtilisateur) => {
        try {
            const contenus = await db.Contenu.findAll({
                where: {
                    idUtilisateur,
                    typeContenu: 'image', // Filtre pour les contenus de type image
                },
            });
    
            return contenus.map((contenu) => new contenuDTO(contenu));
        } catch (error) {
            throw error;
        }
    },
    allVideoContenusForUser: async (idUtilisateur) => {
        try {
            const contenus = await db.Contenu.findAll({
                where: {
                    idUtilisateur,
                    typeContenu: 'video', // Filtre pour les contenus de type vidéo
                },
            });
    
            return contenus.map((contenu) => new contenuDTO(contenu));
        } catch (error) {
            throw error;
        }
    },
    
    
    
    
    
}
module.exports = contenuService
