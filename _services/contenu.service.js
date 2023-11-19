const fs = require('fs')
const contenuDTO = require('../_dto/contenu.dto')

const db = require('../_models/db.model')
const { Op } = require('sequelize');




const contenuService = {
    //ok
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
    //ok
    deleteContenu: async (idContenu, idUtilisateur) => {
    try {
        // Recherchez le contenu en spécifiant à la fois idContenu et idUtilisateur
        const contenu = await db.Contenu.findOne({
        where: { idContenu, idUtilisateur },
        });

        if (!contenu) {
        throw new Error('Contenu non trouvé pour cet utilisateur');
        }

        // Obtenez le chemin du fichier associé à ce contenu
        const cheminFichier = contenu.chemin;

        await contenu.destroy();

        // Supprimez le fichier du système de fichiers
        fs.unlink(cheminFichier, (err) => {
        if (err) {
            throw err; // Gérez les erreurs en conséquence
        }
        console.log('Fichier supprimé avec succès');
        });

        return 'Contenu supprimé avec succès';
    } catch (error) {
        throw error;
    }
    }, 
    //ok
    oneContenuForUser: async (idUtilisateur, idContenu) => {
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
    //ok
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
    //ok
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
