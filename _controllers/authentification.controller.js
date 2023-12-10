const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { join } = require('node:path');

const authentificationService = require('../_services/authentification.service')
const authentificationValidator = require('../_validators/utilisateur.validator')

const authentificationController = {
  get: async (req, res) => {

    res.sendFile(join(__dirname, '../_public/loging.html'))
  },
  register: async (req, res) => {
    // Récupération des données utilsateur
    const authData = req.body;
    // console.log(authData);
    // Validation les informations récupérées depuis les données utilisateur
    const validatedData = await authentificationValidator.validate(authData);

    // Destructuring des données vérifées
    const {
      emailUtilisateur,
      idUtilisateur,
      nom,
      prenom,
      motsDePasse,
      dateDeNaissance,
      role,
      genre,
      idPhotoProfil,
      derniereConnexion,
      facebook,
      snapchat,
      instagram,
      tictoc,
      twitter,
      telephone,
      gsm,
    } = validatedData;



    const hashedPassword = bcrypt.hashSync(motsDePasse, 10);

    // Envoi des données validées et hashées à la DB
    const authInserted = await authentificationService.insertUser({
      idUtilisateur,
      nom,
      prenom,
      emailUtilisateur,
      motsDePasse,
      dateDeNaissance,
      role,
      genre,
      idPhotoProfil,
      derniereConnexion,
      facebook,
      snapchat,
      instagram,
      tictoc,
      twitter,
      telephone,
      gsm,
      emailUtilisateur,
      hashedPassword
    });

    if (authInserted) {
      res
        // On informe que l'insertion des données s'est correctement déroulée, et que le compte est crée
        .status(201)
        // On redirige les informations utilisateur sur la route login (ne pas oublier de gérer la redirection dans le front)
        // .location(`api/utilisateur/login`)
        .json(authInserted)
    }
  },
  login: async (req, res) => {
    try {

      const { emailUtilisateur, motsDePasse } = req.body;
      // console.log(emailUtilisateur, motsDePasse);
      // Vérification de l'existence de l'utilisateur via son login
      const user = await authentificationService.exist(emailUtilisateur);
      if (!user) {
        // Si l'utilisateur n'existe pas, renvoi une réponse 401 (Unauthorized)
        return res.status(401).json({ message: 'Utilisateur non trouvé' })
      }

      // Vérification de l'existence d'un token (jwt) pour cet utilisateur
      const existingToken = await authentificationService.getJwt(user.idUtilisateur);
      if (existingToken.jwt) {
        // Vérification de la validité du token (jwt)
        const tokenValid = await authentificationService.verifyJwt(existingToken.jwt);

        if (tokenValid) {
          // Le token (jwt) est valide, envoi de l'information dans le header de la requête
          res.setHeader('Authorization', `Bearer ${existingToken.jwt}`);
          return res.status(200).json({ token: existingToken.jwt, idUtilisateur: user.idUtilisateur });
        }
      }

      // Vérification du password fourni par l'utilisateur avec le password hashé dans la DB
      const passwordMatch = await bcrypt.compareSync(motsDePasse, user.hashedPassword);
      if (!passwordMatch) {
        // Si les mots de passe ne correspondent pas, renvoi une réponse 401 (Unauthorized)
        return res.status(401).json({ message: 'Mot de passe incorrect' })
      }
      if (passwordMatch) {
        console.log("utilisateur connecter");
      }

      // Si les password correspondent, on va créer un token (jwt) pour l'utilisateur
      const payload = {
        userId: user.idUtilisateur,
        login: user.emailUtilisateur
      };

      const options = {
        expiresIn: '2d',
      };

      // Signer le token (jwt) avec le SECRET
      const secret = process.env.JWT_SECRET;
      const token = jwt.sign(payload, secret, options);

      // Stocker le token (jwt) dans la DB
      const clientJwt = await authentificationService.addJwt(token, user.idUtilisateur);


      if (clientJwt) {
        // Si l'insertion s'est correctement déroulée, on envoi les informations dans le header et au front en json
        res.setHeader('Authorization', `Bearer ${token}`);

        return res.status(200).json({ token });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(404);
    }
  },

}

module.exports = authentificationController

// _____________________________________
