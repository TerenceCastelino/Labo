const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Importation du service userService pour interagir avec les utilisateurs
const utilisateurService = require('../_services/utilisateur.service');

// 2. Importation du validateur pour valider les données utilisateur
const utilisateurValidator = require('../_validators/utilisateur.validator');
const mdpValidator = require('../_validators/mdp.validator');


// 3. Définition du contrôleur spécifique contenant les méthodes de gestion des requêtes
const utilisateurController = {
  register: async(req, res) => {
    // Récupération des données utilsateur
    const authData = req.body;
  // console.log(authData);
    // Validation les informations récupérées depuis les données utilisateur
    const validatedData = await utilisateurValidator.validate(authData);

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
    const authInserted = await utilisateurService.insertUser({
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
      hashedPassword});

    if (authInserted) {
        res
            // On informe que l'insertion des données s'est correctement déroulée, et que le compte est crée
            .status(201)
            // On redirige les informations utilisateur sur la route login (ne pas oublier de gérer la redirection dans le front)
            // .location(`api/utilisateur/login`)
            .json(authInserted)
    }
},
  login: async(req, res) => {
    try {
        const { emailUtilisateur, motsDePasse } = req.body;
      // console.log(emailUtilisateur, motsDePasse);
        // Vérification de l'existence de l'utilisateur via son login
        const user = await utilisateurService.exist(emailUtilisateur);
        if (!user) {
            // Si l'utilisateur n'existe pas, renvoi une réponse 401 (Unauthorized)
            return res.status(401).json({message: 'Utilisateur non trouvé'})
        }

        // Vérification de l'existence d'un token (jwt) pour cet utilisateur
        const existingToken = await utilisateurService.getJwt(user.idUtilisateur);
        if (existingToken.jwt) {
            // Vérification de la validité du token (jwt)
            const tokenValid = await utilisateurService.verifyJwt(existingToken.jwt);

            if (tokenValid) {
                // Le token (jwt) est valide, envoi de l'information dans le header de la requête
                res.setHeader('Authorization', `Bearer ${existingToken.jwt}`);
                return res.status(200).json({token: existingToken.jwt});
            }
        }

        // Vérification du password fourni par l'utilisateur avec le password hashé dans la DB
        const passwordMatch = await bcrypt.compareSync(motsDePasse, user.hashedPassword);
        if (!passwordMatch) {
            // Si les mots de passe ne correspondent pas, renvoi une réponse 401 (Unauthorized)
            return res.status(401).json({message: 'Mot de passe incorrect'})
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
        const clientJwt = await utilisateurService.addJwt(token, user.idUtilisateur);

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
  updateMdp: async (req, res) => {
    try {
      const { id } = req.params; // Paramètre d'URL id
      const utilisateurDTO = await utilisateurService.oneUser(id); // Récupération des données utilisateur
      const passwordData = req.body;
      // Validation des informations récupérées depuis les données utilisateur
      const validatedData = await mdpValidator.validate(passwordData);

      // Destructuration des données vérifiées
      const { motsDePasse } = validatedData;

      // Ré-hachage du mot de passe
      const hashedPassword = bcrypt.hashSync(motsDePasse, 10);

      // Mettre à jour les propriétés de l'utilisateur
      utilisateurDTO.motsDePasse = motsDePasse;
      utilisateurDTO.hashedPassword = hashedPassword;

      // Mettre à jour l'utilisateur dans la base de données
      const updatedUser = await utilisateurService.updateUser(id, utilisateurDTO);

      if (!updatedUser) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(updatedUser);

    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  },

// ______________________________________________________ 
  getAll: async (req, res) => {
    try {
      const utilisateurDTO = await utilisateurService.allUser();
      res.status(200).json(utilisateurDTO);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(500).json({ error: 'Erreur de service' });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(id)) {
        res.sendStatus(400);
        return;
      }

      const utilisateurDTO = await utilisateurService.oneUser(id);

      if (!utilisateurDTO) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(utilisateurDTO);
    } catch (error) {
      console.error('Erreur lors de la récupération d\'un utilisateur par ID :', error);
      res.status(500).json({ error: 'Erreur de service' });
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;//parametre url
      const utilisateurDTO = await utilisateurService.oneUser(id);
      const mdpOrigine =utilisateurDTO.motsDePasse
      const userData = req.body;//collecte du message json
      userData.motsDePasse = mdpOrigine //copie l ancien mdp afin de ne pas pouvoir le modif ici
      const validatedData = await utilisateurValidator.validate(userData);
      const updatedUser = await utilisateurService.updateUser(id, validatedData);
      
      if (!updatedUser) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Erreur lors de la mise à jour d\'un utilisateur :', error);
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const isDeleted = await utilisateurService.deleteUser(id);

      if (isDeleted) {
        res.sendStatus(204);
        return;
      }

      res.sendStatus(404);
    } catch (error) {
      console.error('Erreur lors de la suppression d\'un utilisateur :', error);
      res.status(400).json({ error: 'Erreur lors de la suppression' });
    }
  }
};

// 4. Exportation du contrôleur spécifique pour être utilisé ailleurs dans l'application
module.exports = utilisateurController;
