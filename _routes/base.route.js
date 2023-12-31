// 1. Importation du module de routage d'Express
const router = require('express').Router()
// 2. Importation du module de routage pour les routes 

const utilisateurRoute = require('./utilisateur.route')
const authentificationRoute = require('./authentification.route')
const contenuRoute = require('./contenu.route')
const messageRoute = require('./message.route')
const groupeRoute = require('./groupe.route')
const evenementRoute = require('./evenement.route')
const produitRoute = require('./produit.route')
const panierRoute = require('./panier.route')
const mailRoute = require('./mail.route')
const passwordPerduRoute = require('./passwordPerdu.route')

const socketRoute = require('./socket.route')

// 3. Utilisation du routeur pour gérer les routes specifique '/???'
router.use('/utilisateur', utilisateurRoute);
router.use('/authentification', authentificationRoute)
router.use('/contenu', contenuRoute)
router.use('/message', messageRoute)
router.use('/groupe', groupeRoute)
router.use('/evenement', evenementRoute)
router.use('/produit', produitRoute)
router.use('/panier', panierRoute)
router.use('/email', mailRoute)
router.use('/forgotPassword', passwordPerduRoute)

router.use('/socket', socketRoute)

// 4. Exportation du routeur
module.exports = router