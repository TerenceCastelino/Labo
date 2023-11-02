// a. Importation de la bibliothèque de validation Yup
const yup = require('yup');

// b. Importation de la méthode "object" de la bibliothèque Yup
// La méthode "object" est utilisée pour définir un schéma de validation pour un objet.
const { object } = require('yup');

// c. Définition du schéma de validation pour les utilisateurs en utilisant Yup
const contenuValidator = object({
    idUtilisateur: yup.number().required(),
    idContenu:yup.number().required(),
    chemin : yup.string().required(),
    typeContenu:yup.string(5).oneOf(['image','video']).required(),
    dateDeCreation :yup.date(),
    nom: yup.string(),
});

// d. Exportation du schéma de validation "userValidator" pour être utilisé ailleurs dans l'application
module.exports = contenuValidator;