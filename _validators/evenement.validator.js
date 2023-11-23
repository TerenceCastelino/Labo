const yup = require('yup')

const evenementValidator = yup.object({



    dateDebut: yup.date().required(),
    dateFin: yup.date(),
    lieu: yup.string(),
    description: yup.string(),
    status: yup.string().oneOf(['a venir', 'en cours', 'terminer', 'repousser', 'annuler'])

})

module.exports = evenementValidator