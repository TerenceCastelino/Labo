const { diskStorage } = require('multer')
const multer = require('multer')
const path = require('path')
const contenuService = require('../_services/contenu.service')
const contenuValidator = require('../_validators/contenuValidator')

const storage = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      // Utilisez path.extname pour obtenir l'extension du fichier
      const extension = path.extname(file.originalname);
      // Générez un nom de fichier unique en utilisant l'extension
      const uniqueFileName = `${Date.now()}${extension}`;
      // Appelez le callback avec le nom de fichier unique
      cb(null, uniqueFileName);
    },
  });
const upload = multer({storage : storage})

const contenuController = {

        addContenu: async (req, res) => {
          try {
            const { id } = req.params;
            const contenuData = req.body;
            const validateData = await contenuValidator.validate(contenuData);
      
            const { typeContenu, nom } = validateData;
      
            // Le chemin du fichier téléchargé sera stocké dans req.file.path
            const chemin = req.file.path;
      
            const contenuInsert = await contenuService.insertContenu({
              chemin,
              typeContenu,
              nom,
            }, id);
      
            if (contenuInsert) {
              res.status(201).json(contenuInsert);
            } else {
              res.status(400).json({ error: 'Erreur lors de l\'insertion du contenu' });
            }
          } catch (error) {
            console.error('Erreur lors de l\'insertion du contenu', error);
            res.status(400).json({ error: 'Erreur lors de l\'insertion du contenu' });
          }
        },
        delete: async (req, res) => {
            try {
              const { id } = req.params;
              const { idContenu } = req.params;
              const isDeleted = await contenuService.deleteContenu(idContenu,id);
        
              if (isDeleted) {
                res.sendStatus(204);
                return;
              }
        
              res.sendStatus(404);
            } catch (error) {
              console.error('Erreur lors de la suppression d\'un utilisateur :', error);
              res.status(400).json({ error: 'Erreur lors de la suppression' });
            }
        },
        getOneContenu: async (req, res) => {
        try {
            const { idContenu, id } = req.params;
            if (isNaN(id) || isNaN(idContenu)) {
            // Si l'un des paramètres n'est pas un nombre valide, renvoyer une réponse 400 (Mauvaise demande)
            res.sendStatus(400);
            return;
            }
        
            // Appelez votre service pour obtenir les informations sur l'image
            const contenuData = await contenuService.oneContenuForUser(idContenu, id);
        
            if (!contenuData) {
            // Si aucune donnée n'a été trouvée (contenuData est falsy), renvoyer une réponse 404 (Non trouvé)
            res.sendStatus(404);
            return;
            }
        
            // Si tout s'est bien passé, renvoyer les données de l'image dans la réponse
            res.status(200).json(contenuData);
        } catch (error) {
            // En cas d'erreur, attrapez-la ici et renvoyez une réponse d'erreur appropriée
            console.error('Erreur lors de la récupération des informations sur l\'image:', error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des informations sur l\'image' });
        }
        },
        getAllImage: async (req,res)=>{
            try{
                const { id } = req.params
                const images = await contenuService.allImageContenusForUser(id)
                res.status(200).json(images)


            }catch(error){

            }
        },
        getAllVideo: async (req,res)=>{
            try{
                const { id } = req.params
                const images = await contenuService.allVideoContenusForUser(id)
                res.status(200).json(images)


            }catch(error){

            }
        },
          
      };

const uploadMiddelware =  upload.single('contenu')

module.exports = {contenuController,uploadMiddelware}