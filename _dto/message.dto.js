class MessageDTO {
    constructor(data) {
        this.idMessage = data.idMessage;
        this.idDestinataire = data.idDestinataire;
        this.idExpediteur = data.idExpediteur;
        this.contenuMessage = data.contenuMessage;
        this.note = data.note;
    }
}

module.exports = MessageDTO;
