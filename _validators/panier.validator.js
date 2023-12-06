const yup = require('yup')
const { object } = require('yup');

const panierValidator = object({
    idProduit: yup.number().required(),
    idUtilisateur: yup.number().required(),
})

module.exports = panierValidator