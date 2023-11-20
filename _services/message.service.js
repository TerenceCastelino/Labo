// Importations nécessaires
const MessageDTO = require('../_dto/message.dto');
const db = require('../_models/db.model');
const { Op } = require('sequelize');

const messageService = {

  deletedMessage: async (idExpediteur, idMessage) => {
    try {
      const message = await db.Message.findOne({
        where: { idExpediteur, idMessage }
      })
      if (!message) {
        throw new Error('le message n a pas ete trouver pour cet utilisateur')
      }
      await message.destroy()
      return console.log('Message suprimer avec succes');

    } catch (error) {

    }

  },
  getAllMessage: async (idConversation) => {
    try {
      if (!idConversation) {
        throw new Error('ID du groupe manquant');
      }

      const messages = await db.Message.findAll({
        where: {
          idConversation,
        },
      });

      return messages.map((msg) => new MessageDTO(msg));
    } catch (error) {
      console.error('Erreur lors de la récupération des messages :', error);
      throw new Error('Échec de la récupération des messages');
    }
  },
  addToMessage: async (data, idExpediteur, idConversation) => {
    try {
      const groupId = await db.UserGroup.findOne({
        where: {
          idGroupe: idConversation,
          idUtilisateur: idExpediteur
        }
      })
      data.idExpediteur = idExpediteur
      data.idConversation = idConversation
      if (groupId) {


        const message = await db.Message.create(data)
        await message.validate()
        return new MessageDTO(message)
      }
    } catch (err) {
      throw err
    }
  }

};


module.exports = messageService; // Exportation du service messageService

