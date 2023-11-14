// Importations nécessaires
const MessageDTO = require('../_dto/message.dto');
const db = require('../_models/db.model');
const { Op } = require('sequelize');

// Service de gestion des messages
const messageService = {
  // Fonction pour ajouter un message
  addMessage: async (data, idExpediteur, destinataire) => {
    try {
      // Récupération de l'ID du groupe en fonction de la conversation
      const groupId = await getGroupId(idExpediteur, destinataire);

      // Assignation des identifiants d'expéditeur, destinataire et de groupe aux données du message
      data.idExpediteur = idExpediteur;
      data.idDestinataire = destinataire;
      data.idGroup = groupId;

      // Création d'un nouveau message dans la base de données
      const message = await db.Message.create(data);
      
      // Validation du message créé
      await message.validate();

      // Renvoi du message sous forme de MessageDTO
      return new MessageDTO(message);
    } catch (error) {
      // Gestion des erreurs de validation Sequelize et autres types d'erreurs
      if (error.name === 'SequelizeValidationError') {
        console.error('Validation error:', error.errors);
        throw new Error('Validation error');
      } else {
        console.error('serviceMessage - Error:', error);
        throw error;
      }
    }
  },
};

// Fonction pour obtenir l'ID du groupe
async function getGroupId(idExpediteur, destinataire) {
  // Recherche d'une conversation existante entre deux utilisateurs
  const existingConversation = await db.Message.findOne({
    where: {
      [Op.or]: [
        { idExpediteur: idExpediteur, idDestinataire: destinataire },
        { idExpediteur: destinataire, idDestinataire: idExpediteur },
      ],
    },
    attributes: ['idGroup'], // Sélection des attributs à récupérer
  });

  if (existingConversation) {
    // Si une conversation existe déjà, utilise l'ID du groupe associé
    return existingConversation.idGroup;
  }

  // Si aucune conversation n'existe, récupère le dernier ID de groupe et l'incrémente
  const lastGroup = await db.Message.max('idGroup');
  return lastGroup ? lastGroup + 1 : 1; // Attribution du nouveau groupe
}

module.exports = messageService; // Exportation du service messageService

