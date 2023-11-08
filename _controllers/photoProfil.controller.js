// 1. Importation du service userService pour interagir avec les utilisateurs
const utilisateurService = require('../_services/utilisateur.service');
const photoProfilService = require('../_services/photoProfil.service')
const contenuService = require('../_services/contenu.service')

const photoProfil ={

updateImgProfil: async (req, res) => {
    try {
      const { idContenu,id } = req.params;//parametre url
      const utilisateur = await utilisateurService.oneUser(id);
      const contenu = await contenuService.oneContenuForUser(id,idContenu)  
      utilisateur.idPhotoProfil = contenu.idContenu
      const updatedUser = await utilisateurService.updateUser(id,utilisateur)
    
    
    if (!updatedUser) {
        res.sendStatus(404);
        return;
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      console.error('Erreur lors de la mise à jour d\'un utilisateur :', error);
      res.status(400).json({ error: 'Erreur lors de la mise à jour' });
    }
  },
  getAllProfilePhotos: async (req, res) => {
    try {
      
      const profilePhotos = await photoProfilService.getAllProfilePhotos();
      
      res.status(200).json(profilePhotos);
    } catch (error) {
      console.error('Erreur lors de la récupération des photos de profil :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des photos de profil' });
    }
  },

  
}
module.exports = photoProfil







