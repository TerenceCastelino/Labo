const produitService = require('../_services/produit.service')
const { produitValidator, produitValidatorPatch } = require('../_validators/produit.validator')

const produitController = {
    addProduit: async (req, res) => {
        try {
            const { idUtilisateur } = req.params

            const produitData = req.body
            const valideData = await produitValidator.validate(produitData)

            const {
                idProduit,
                nomProduit,
                prixProduit,
                totalQuantite
            } = valideData

            const produitInsert = await produitService.insertProduit(idUtilisateur, {
                idProduit,
                nomProduit,
                prixProduit,
                totalQuantite
            })

            if (produitInsert) {
                res.status(201).json(produitInsert)
            }

        } catch (error) {
            throw error
        }
    },
    deleted: async (req, res) => {
        try {
            const { idProduit, idUtilisateur } = req.params
            const isDeleted = await produitService.deletedProduit(idUtilisateur, idProduit)

            if (isDeleted) {
                res.sendStatus(204);
                return;
            }

            res.sendStatus(404)

        } catch (err) {
            console.error('Erreur lors de la suppression d\'un produit :', err);
            res.status(400).json({ err: 'Erreur lors de la suppression' });

        }

    },
    patch: async (req, res) => {
        try {
            const { idProduit, idUtilisateur } = req.params
            const produitData = req.body;
            const valideData = await produitValidatorPatch.validate(produitData)
            console.log(valideData);
            const updateProduit = await produitService.patchProduit(idUtilisateur, idProduit, valideData)

            if (!updateProduit) {
                res.sendStatus(404)
                return

            }
            res.status(200).json(updateProduit)
            console.log(updateProduit);

        } catch (err) {
            console.error('Erreur lors de la mise à jour du produit :', err);
            res.status(400).json({ err: 'Erreur lors de la mise à jour' });
        }
    },
    getAll: async (req, res) => {
        try {
            const produit = await produitService.getAllProduit()
            res.status(200).json(produit)

        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
            res.status(500).json({ error: 'Erreur de service' });

        }

    },
    getOne: async (req, res) => {
        try {
            const { idProduit } = req.params
            if (isNaN(idProduit)) {
                res.sendStatus(400)
                return
            }

            const produit = await produitService.getOneProduit(idProduit)

            if (!produit) {
                res.sendStatus(404)
                return
            }

            res.status(200).json(produit)

        } catch (err) {
            console.error('Erreur lors de la récupération d\'un produit par ID :', err);
            res.status(500).json({ err: 'Erreur de service' });

        }
    }

}
module.exports = produitController