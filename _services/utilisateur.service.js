const UtilisateurDTO = require('../_dto/utilisateur.dto');

const db = require('../_models/db.model');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const utilisateurService = {
    // Vérifie l'existence d'un utilisateur par son email
    exist: async (emailUtilisateur) => {
        const user = await db.Utilisateur.findOne({
            where: { emailUtilisateur }
        });
        return new UtilisateurDTO(user);
    },
    
    
    // Associe un jeton JWT à un utilisateur
    addJwt: async (jwt, id) => {
        console.log('idddddddddd : ', id);
        // Vérification de l'existence de l'utilisateur
        const userFound = await db.Utilisateur.findOne({
            where: { idUtilisateur: id }
        });
        // S'il existe, lui attribue un jeton JWT (s'il n'en a pas déjà)
        await userFound.update({ jwt });
        return userFound;
    },
    
    // Récupère le jeton JWT d'un utilisateur par son ID
    getJwt: async (id) => {
        const jwtExist = await db.Utilisateur.findOne({
            where: { idUtilisateur: id }
        });
        return jwtExist;
    },
    
    // Vérifie la validité d'un jeton JWT
    verifyJwt: async (token) => {
        const secret = process.env.JWT_SECRET;
        try {
            const decoded = jwt.verify(token, secret);
            return true;
        } catch (err) {
            return false;
        }
    },
//  __________________________________________    
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
    
    // Insère un nouvel utilisateur dans la base de données
    insertUser: async (data) => {
        try {
            const user = await db.Utilisateur.create(data);
            return new UtilisateurDTO(user);
        } catch (error) {
            throw error;
        }
    },
    
    // Supprime un utilisateur par son ID
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

