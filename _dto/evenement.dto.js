class EvenementDTO {
    constructor(data) {
        this.idEvenement = data.idEvenement
        this.idCreateur = data.idCreateur
        this.idGroupe = data.idGroupe
        this.dateDebut = data.dateDebut
        this.dateFin = data.dateFin
        this.lieu = data.lieu
        this.description = data.description
        this.status = data.status
    }
}
module.exports = EvenementDTO