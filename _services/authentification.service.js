const UtilisateurDTO = require('../_dto/utilisateur.dto');

const db = require('../_models/db.model');
const jwt = require('jsonwebtoken');

const authentificationService = {
    // Vérifie l'existence d'un utilisateur par son email
    exist: async (emailUtilisateur) => {
        const user = await db.Utilisateur.findOne({
            where: { emailUtilisateur }
        });
        return new UtilisateurDTO(user);
    },


    // Associe un jeton JWT à un utilisateur
    addJwt: async (jwt, id) => {
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
    insertUser: async (data) => {
        try {
            const user = await db.Utilisateur.create(data);
            return new UtilisateurDTO(user);
        } catch (error) {
            throw error;
        }
    },

}

module.exports = authentificationService