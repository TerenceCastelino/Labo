
const yup = require('yup');

const groupeValidator = yup.object({
    idGroupe: yup.number(),
    nom: yup.string(),
    description: yup.string().min(5).max(500),
    idCreateur: yup.number().required(),
    photoProfilGroupe: yup.number(),
});

module.exports = groupeValidator;
