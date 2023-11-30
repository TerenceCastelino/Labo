class ProduitDTO {
    constructor(data) {
        this.idProduit = data.idProduit
        this.nomProduit = data.nomProduit
        this.prixProduit = data.prixProduit
        this.totalQuantite = data.totalQuantiteid

    }
}
module.exports = ProduitDTO