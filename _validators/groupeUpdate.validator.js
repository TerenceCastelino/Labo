const yup = require('yup')
const groupeUpdateValidator = yup.object({
    idGroupe: yup.number(),
    nom: yup.string(),
    description: yup.string().min(5).max(500),
    idCreateur: yup.number(), // Retirer .required() pour le rendre facultatif
    photoProfilGroupe: yup.number(),
});

module.exports = groupeUpdateValidator;
