class GroupeDTO {
    constructor(data) {
        this.idGroupe = data.idGroupe;
        this.nom = data.nom;
        this.description = data.description;
        this.idCreateur = data.idCreateur;
        this.photoProfilGroupe = data.photoProfilGroupe;
    }
}

module.exports = GroupeDTO;
