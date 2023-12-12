const yup = require('yup')
const { object } = require('yup');

const passwordPerduValidator = object({

})

const existeEmailValidator = object({
    emailUtilisateur: yup.string().email().required(),
})

module.exports = existeEmailValidator 