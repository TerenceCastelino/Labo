const app = require('../app');
const db = require('../_models/db.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const utilisateurDTO = require('../_dto/utilisateur.dto');

const should = chai.should();
chai.use(chaiHttp);

const newUtilisateur = {
    idUtilisateur: 1,
    nom: "Del Rio",
    prenom: "Olivia",
    emailUtilisateur: "olivia@example.com",
    motsDePasse: "123456789",
    dateDeNaissance: "1979-08-29",
    role: "utilisateur",
    genre: "F",
    idPhotoProfil: 2,
    telephone: "123-456-7890",
    gsm: "987-654-3210"
}

describe('Utilisateur Controller', () => {
    before(async () => {
        await db.sequelize.sync({ force: true });
        await db.Utilisateur.create(newUtilisateur);
    });

    it('getall utilisateur', (done) => {
        chai.request(app)
            .get('/api/utilisateur')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });

    it('getone utilisateur', (done) => {
        chai.request(app)
            .get('/api/utilisateur/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let retour = new utilisateurDTO(res.body);
                chai.expect(retour.id).to.equal(newUtilisateur.id);
                done();
            });
    });

    it('delete utilisateur', (done) => {
        chai.request(app)
            .delete('/api/utilisateur/1')
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
    // it('update Utilisateur',(done)=>{
    //     chai.request(app)
    //         .put('/api/utilisateur/1')
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             let retour = utilisateurDTO(res.body);
    //             chai.expect(retour.id).to.equal(newUtilisateur.id);
    //             done();
    //         });
    // })
});
