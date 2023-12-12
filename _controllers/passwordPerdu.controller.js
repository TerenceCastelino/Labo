require('dotenv').config()
const authentificationService = require('../_services/authentification.service')
const mdpValidator = require('../_validators/mdp.validator')
const utilisateurService = require('../_services/utilisateur.service')
const sendEmail = require('../_configue/_mail/mailBaseConfig')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const passwordPercuController = {

    loginPerdu: async (req, res) => {
        try {
            const { emailUtilisateur } = req.body;

            const user = await authentificationService.exist(emailUtilisateur);
            const recupeId = user.idUtilisateur
            const contenuEmail = `
              Bonjour ${user.prenom} ${user.nom},
              Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour le réinitialiser 
              ${process.env.front}/api/reset-password/${emailUtilisateur}  >Réinitialiser le mot de passe
              Ce lien vous redirigera vers une page où vous pourrez modifier votre mot de passe.
              Merci,
              Votre équipe
            `
            const existingToken = await authentificationService.getJwt(user.idUtilisateur);

            if (!user) {
                // Si l'utilisateur n'existe pas, renvoi une réponse 401 (Unauthorized)
                return res.status(401).json({ message: 'Utilisateur non trouvé' })
            }
            // Vérification de l'existence d'un token (jwt) pour cet utilisateur

            passwordPercuController.updateMdp(req, res, recupeId)

            // Vérification de l'existence d'un token (jwt) pour cet utilisateur
            // const existingToken = await authentificationService.getJwt(user.idUtilisateur);
            console.log("3_________", user.jwt);

            if (existingToken.jwt) {
                console.log("4_________", user.jwt);
                // Vérification de la validité du token (jwt)
                const tokenValid = await authentificationService.verifyJwt(existingToken.jwt);
                if (tokenValid) {

                    sendEmail(emailUtilisateur, 'Sujet de l e-mail : mots de passe perdu', contenuEmail);
                    // Le token (jwt) est valide, envoi de l'information dans le header de la requête
                    res.setHeader('Authorization', `Bearer ${existingToken.jwt}`);
                    return res.status(200).json({ token: existingToken.jwt, idUtilisateur: user.idUtilisateur, z: '11111111111111111' });
                }
            }

            // Vérification du password fourni par l'utilisateur avec le password hashé dans la DB
            const passwordMatch = await bcrypt.compareSync(user.motsDePasse, user.hashedPassword);
            console.log("5_________", user.jwt);
            if (!passwordMatch) {
                // Si les mots de passe ne correspondent pas, renvoi une réponse 401 (Unauthorized)
                return res.status(401).json({ message: 'Mot de passe incorrect' })
            }
            if (passwordMatch) {
                console.log("utilisateur connecter");
            }

            // Si les password correspondent, on va créer un token(jwt) pour l'utilisateur
            const payload = {
                userId: user.idUtilisateur,
                login: user.emailUtilisateur

            };

            const options = {
                expiresIn: '1h',
            };

            // Signer le token (jwt) avec le SECRET
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);
            console.log("6_________", user.jwt);

            // Stocker le token (jwt) dans la DB
            const clientJwt = await authentificationService.addJwt(token, user.idUtilisateur);

            if (clientJwt) {
                sendEmail(emailUtilisateur, 'Sujet de l e-mail : mots de passe perdu', contenuEmail);
                console.log("7_________", user.jwt);
                // Si l'insertion s'est correctement déroulée, on envoi les informations dans le header et au front en json
                res.setHeader('Authorization', `Bearer ${token}`);

                return res.status(200).json({ token: existingToken.jwt, idUtilisateur: user.idUtilisateur });
            }
        } catch (err) {
            console.error(err);
            res.sendStatus(404);
        }
    },
    updateMdp: async (req, res, recupeId) => {
        try {
            const id = recupeId

            const randomInt = Math.floor(Math.random() * 100000) + 1;
            const stringRandomInt = randomInt.toString(); // Convertit le nombre en chaîne de caractère
            const utilisateur = await utilisateurService.oneUser(id); // Récupération des données utilisateur

            const passwordData = {
                "idUtilisateur": utilisateur.idUtilisateur,
                "emailUtilisateur": utilisateur.emailUtilisateur,
                "motsDePasse": `${utilisateur.idUtilisateur}${stringRandomInt}${utilisateur.prenom.slice(0, 3)}`,

            }

            // Validation des informations récupérées depuis les données utilisateur
            const validatedData = await mdpValidator.validate(passwordData);

            // Destructuration des données vérifiées
            const { motsDePasse, idUtilisateur, emailUtilisateur } = validatedData;

            if (idUtilisateur == id && utilisateur.emailUtilisateur == emailUtilisateur) {
                // Ré-hachage du mot de passe

                const hashedPassword = bcrypt.hashSync(motsDePasse, 10);

                // Mettre à jour les propriétés de l'utilisateur
                utilisateur.motsDePasse = motsDePasse;
                utilisateur.hashedPassword = hashedPassword;

                // Mettre à jour l'utilisateur dans la base de données
                const updatedUser = await utilisateurService.updateUser(id, utilisateur);

                if (!updatedUser) {
                    res.sendStatus(404);
                    return;
                }

            } else {
                // console.error('Erreur lors de la mise à jour :', error);
                res.status(400).json({ error: 'id incorrecte' });
            }

        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
            res.status(400).json({ error: 'Erreur lors de la mise à jour' });
        }
    },
    get: async (req, res) => {
        const { emailUtilisateur } = req.params;
        const user = await authentificationService.exist(emailUtilisateur);

        return res.status(200).json({ token: user.jwt, idUtilisateur: user.idUtilisateur });

    }
}

module.exports = passwordPercuController

