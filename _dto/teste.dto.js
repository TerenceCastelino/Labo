class testeDTO{
    
    constructor(data) {
    // e. Initialisation des propriétés avec les données fournies en tant que paramètre
    this.idUtilisateur= data.idUtilisateur
    this.nom= data.nom
    this.prenom= data.prenom
    this.emailUtilisateur= data.emailUtilisateur
    this.motsDePasse= data.motsDePasse
    this.dateDeNaissance= data.dateDeNaissance
    this.role= data.role
    this.genre= data.genre
    this.idPhotoProfil= data.idPhotoProfil
    this.derniereConnexion= data.derniereConnexion
    this.facebook= data.facebook
    this.snapchat= data.snapchat
    this.instagram= data.instagram
    this.tictoc= data.tictoc
    this.twitter= data.twitter
    this.telephone= data.telephone
    this.gsm = data.gsm
    this.hashedPassword = data.hashedPassword
    this.jwt = data.jwt
    this.idContenu = data.idContenu
    this.chemin = data.chemin
    this.typeContenu = data.typeContenu
    this.idUtilisateur = data.idUtilisateur
    this.nom =  data.nom 
        }
    }
    // f. Exportation de la classe UserDTO pour pouvoir l'utiliser dans d'autres parties de l'application
    module.exports = testeDTO