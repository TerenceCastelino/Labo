const yup = require('yup')
const { object } = require('yup');

const produitValidator = object({
    nomProduit: yup.string().min(3).required(),
    prixProduit: yup.number().required(),
    totalQuantite: yup.number().required()
})

const produitValidatorPatch = object({
    nomProduit: yup.string().min(3),
    prixProduit: yup.number(),
    totalQuantite: yup.number()
})

module.exports = { produitValidator, produitValidatorPatch }