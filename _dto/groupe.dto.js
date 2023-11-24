class GroupeDTO {
    constructor(data) {
        this.idGroupe = data.idGroupe;
        this.nom = data.nom;
        this.descriptionGroupe = data.descriptionGroupe;
        this.idCreateur = data.idCreateur;
        this.photoProfilGroupe = data.photoProfilGroupe;
        this.genreGroupe = data.genreGroupe
    }
}

module.exports = GroupeDTO;
