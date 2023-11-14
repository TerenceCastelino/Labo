const messageService = require('../_services/message.service');
const messageValidator = require('../_validators/message.validator');

const messageController = {
    addMessageUtilisateur: async (req, res) => {
      try {
        const { idExpediteur, idDestinataire } = req.params;
        const dataMessage = req.body;
  
        // Ajoutez une vérification pour s'assurer que 'contenuMessage' est défini dans les données
        if (!dataMessage.contenuMessage) {
          return res.status(400).json({ error: 'contenuMessage is required' });
        }
  
        const valideData = await messageValidator.validate(dataMessage);
        valideData.idExpediteur = idExpediteur;
        valideData.idDestinataire = idDestinataire;
  
        const addMessage = await messageService.addMessage(
          valideData ,
          idExpediteur,
          idDestinataire
        );
  
        res.status(200).json(addMessage);
      } catch (error) {
        console.error('controllerMessag - Error:', error);
  
        // Si l'erreur provient de la validation Sequelize, renvoyez une réponse 400 Bad Request
        if (error.name === 'SequelizeValidationError') {
          return res.status(400).json({ error: error.message });
        }
  
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  };
  
  module.exports = messageController;
  



