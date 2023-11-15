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
    },
    deleted:async (req,res)=>{
      try{
        const {idExpediteur,idMessage} =  req.params
        const isDeleted = await messageService.deletedMessage(idExpediteur,idMessage)

        if (isDeleted) {
          res.sendStatus(204);
          return;
        }
        res.sendStatus(404)

      }catch(error){
        console.error('Erreur lors de la suppression du message :', error);
        res.status(400).json({ error: 'Erreur lors de la suppression' });

      }
    },
    getAll: async (req, res) => {
      try {
        const { idgroup } = req.params; // Assurez-vous que le paramètre est correctement nommé
  
        if (!idgroup) {
          return res.status(400).json({ error: 'ID du groupe manquant dans la requête' });
        }
  
        const messages = await messageService.getAllMessage(idgroup);
        res.status(200).json(messages);
      } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
      }
    },
  
  };
  
  module.exports = messageController;
  



