const yup = require('yup');

const messageValidator = yup.object({
    note: yup.string().min(4).max(7).oneOf(['like', 'dislike']),
    idGroup: yup.number(),
    contenuMessage: yup.string().min(1).required(),  // Correction ici
});

module.exports = messageValidator;
