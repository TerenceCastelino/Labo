const produitControlleur = require('../_controllers/produit.controller')
const produitRouter = require('express').Router()

produitRouter.route('/:idUtilisateur')
    .post(produitControlleur.addProduit)
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });

produitRouter.route('/:idUtilisateur/:idProduit')
    .patch(produitControlleur.patch)
    .delete(produitControlleur.deleted)
    .all((_req, res) => {
        res.sendStatus(405); // Pour tout autre verbe HTTP, renvoyer une erreur (Méthode non autorisée)
    });



module.exports = produitRouter