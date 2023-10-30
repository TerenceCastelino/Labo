// 1. Importation du module de routage d'Express
const router =  require('express').Router()
// 2. Importation du module de routage pour les routes specifique
const utilisateurRoute =  require('./utilisateur.route')
// 3. Utilisation du routeur pour gérer les routes specifique '/???'
router.use('/utilisateur',utilisateurRoute);
// 4. Exportation du routeur
module.exports = router