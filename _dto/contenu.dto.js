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
    this.dateDeCreation =data.dateDeCreation
    }
}

module.exports = ContenuDTO