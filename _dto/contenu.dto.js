class ContenuDTO  {

    idContenu
    chemin
    idUtilisateur
    typeContenu
    nom

    constructor(data){

    
    this.idContenu = data.idContenu
    this.chemin = data.chemin
    this.typeContenu = data.typeContenu
    this.idUtilisateur = data.idUtilisateur
    this.nom =  data.nom 
    }
}

module.exports = ContenuDTO