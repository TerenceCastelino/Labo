// Pour le register de l utilisateur <-------------!!!!!!!!!!!!!!!
// a. Définition de la classe UserDTO pour représenter un objet de transfert de données (DTO) 
class UtilisateurDTO{
// b. Déclaration des propriétés de la classe
idUtilisateur
nom
prenom
emailUtilisateur
motsDePasse
dateDeNaissance
role
genre
idPhotoProfil
derniereConnexion
facebook
snapchat
instagram
tictoc
twitter
telephone
gsm
hashedPassword
jwt
// c. Constructeur de la classe qui prend des données en entrée et initialise les propriétés
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
    }
}
// f. Exportation de la classe UserDTO pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = UtilisateurDTO
  