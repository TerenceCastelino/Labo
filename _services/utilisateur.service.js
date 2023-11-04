const UtilisateurDTO = require('../_dto/utilisateur.dto');

const db = require('../_models/db.model');
// const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const utilisateurService = {   

    // Récupère tous les utilisateurs
    allUser: async () => {
        try {
            const users = await db.Utilisateur.findAll();
            return users.map(user => new UtilisateurDTO(user));
        } catch (error) {
            throw error;
        }
    },
    
    // Récupère un utilisateur par son ID
    oneUser: async (id) => {
        try {
            const user = await db.Utilisateur.findOne({
                where: { idUtilisateur: id },
            });
            return new UtilisateurDTO(user);
        } catch (error) {
            throw error;
        }
    },
    
    deleteUser: async (id) => {
        try {
            const user = await db.Utilisateur.findOne({
                where: { idUtilisateur: id },
            });
    
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
    
            await user.destroy();
    
            return 'Utilisateur supprimé avec succès';
        } catch (error) {
            throw error;
        }
    },
    
    // Met à jour un utilisateur par son ID
    updateUser: async (id, data) => {
        try {
            const user = await db.Utilisateur.findOne({
                where: { idUtilisateur: id },
            });
    
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            
            await user.update(data);
    
            return new UtilisateurDTO(user);//dto specifique qui empeche la modification du mots de passe
        } catch (error) {//cree validator
            throw error;
        }
    },
};

module.exports = utilisateurService;

