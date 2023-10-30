// a. Importation de la bibliothèque de validation Yup
const yup = require('yup');

// b. Importation de la méthode "object" de la bibliothèque Yup
// La méthode "object" est utilisée pour définir un schéma de validation pour un objet.
const { object } = require('yup');

// c. Définition du schéma de validation pour les utilisateurs en utilisant Yup
const utilisateurValidator = object({
    
    idUtilisateur: yup.number(),
    nom: yup.string().min(2).max(50).required(),
    prenom: yup.string().min(2).max(50).required(),
    emailUtilisateur: yup.string().email().required(),
    motsDePasse: yup.string().min(5).max(20).required(),
    dateDeNaissance: yup.date().required(),
    role: yup.string().min(5).max(11).oneOf(['admin', 'utilisateur']).required(),
    genre: yup.string().oneOf(['H', 'F', 'X']).required(),
    idPhotoProfil: yup.number(),
    derniereConnexion: yup.date(),
    facebook: yup.string().url(),
    snapchat: yup.string().url(),
    instagram: yup.string().url(),
    tictoc: yup.string().url(),
    twitter: yup.string().url(),
    telephone: yup.string().min(9).max(13),
    gsm: yup.string().min(10).max(14),
    
    

});

// d. Exportation du schéma de validation "userValidator" pour être utilisé ailleurs dans l'application
module.exports = utilisateurValidator;
