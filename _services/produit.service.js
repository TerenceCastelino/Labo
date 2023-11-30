const ProduitDTO = require('../_dto/produit.dto')
const db = require('../_models/db.model')
const userService = require('../_services/utilisateur.service')

const produitService = {
    //cree un produit si le role de l utilisateur est utilisateur(pour facilite dans le front plutard modifier pour que le role soit admin)
    insertProduit: async (idUtilisateur, data) => {
        try {
            //ici je veux recuperer un utilisateur 
            const user = await userService.oneUser(idUtilisateur)

            //ici je veux cree un if si le role de user est utilisateur
            if (user.role === 'utilisateur') {

                const produit = await db.Produit.create(data)
                return new ProduitDTO(produit)
            }

        } catch (error) {
            throw error
        }
    },
    deletedProduit: async (idUtilisateur, idProduit) => {
        try {
            const user = await userService.oneUser(idUtilisateur)
            console.log(user.nom);

            if (user.role === 'utilisateur') {
                const produit = await db.Produit.findOne({
                    where: { idProduit }
                })
                if (!produit) {
                    throw new Error('Produit non trouvé pour cet utilisateur');
                }
                await produit.destroy()
                console.log('produit supprimer avec succes');
                return 'produit supprimer avec succes'
            } else {
                console.log('utilisateur non trouver');
                // a ameliore les errors
            }
        } catch (err) {
            throw err
        }
    },
    patchProduit: async (idUtilisateur, idProduit, data) => {
        try {
            const user = await userService.oneUser(idUtilisateur)
            console.log(user.nom);

            if (user.role === 'utilisateur') {
                const produit = await db.Produit.findOne({
                    where: { idProduit }
                })
                console.log(user.nom);
                if (!produit) {

                    throw new Error('produit non trouvé');
                }
                await produit.update(data)


                return new ProduitDTO(produit)
            }

        } catch (err) {
            throw err
        }
    },
    updateQty: async (idUtilisateur, idProduit, qty) => {
        try {

        } catch (err) {
            throw err
        }
    },
    getOneProduit: async (idProduit) => {
        try {

        } catch (err) {

        }
    },
    getAllProduit: async () => {
        try {

        } catch (err) {

        }
    }

}
module.exports = produitService