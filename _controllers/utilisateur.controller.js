const bcrypt = require('bcrypt');

// 1. Importation du service userService pour interagir avec les utilisateurs
const utilisateurService = require('../_services/utilisateur.service');

// 2. Importation du validateur pour valider les données utilisateur
const utilisateurValidator = require('../_validators/utilisateur.validator');
const mdpValidator = require('../_validators/mdp.validator');


// 3. Définition du contrôleur spécifique contenant les méthodes de gestion des requêtes
const utilisateurController = {

  updateMdp: async (req, res) => {
    try {
      const { id } = req.params; // Paramètre d'URL id
      const utilisateur = await utilisateurService.oneUser(id); // Récupération des données utilisateur
      const passwordData = req.body;
      console.log(passwordData.motsDePasse);
      console.log(utilisateur.motsDePasse);

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



        res.status(200).json(updatedUser);


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

  getAll: async (req, res) => {
    try {
      const utilisateur = await utilisateurService.allUser();
      res.status(200).json(utilisateur);
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

      const utilisateur = await utilisateurService.oneUser(id);


      if (!utilisateur) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(utilisateur);
    } catch (error) {
      console.error('Erreur lors de la récupération d\'un utilisateur par ID :', error);
      res.status(500).json({ error: 'Erreur de service' });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;//parametre url
      const utilisateur = await utilisateurService.oneUser(id);
      const mdpOrigine = utilisateur.motsDePasse
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
