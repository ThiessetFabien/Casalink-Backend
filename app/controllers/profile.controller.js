import profileDataMapper from '../datamappers/profile.js';
import ApiError from '../errors/api.error.js';
import fs from 'fs-extra';
import { outputFile } from 'fs-extra/esm'

const profileController = {

  // QUERY GET
  getProfileById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du profil est incorrect.`));   
    }
    const profile = await profileDataMapper.findProfileById(id)
    if(!profile[0]) {
      return next(new ApiError(404, `Le profil n'existe pas.`));
    }
    return res.json({ status: 'success', data: { profile } });
},

  getProfileByAccountId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du profil est incorrect.`));   
    }
    const profile = await profileDataMapper.findProfileByAccountId(id);
    console.log('profile', profile);
    if(!profile) {
      return next(new ApiError(404, `Le profil n'existe pas.`));
    }
    return res.json({ status: 'success', data: { profile } });
  },

  getProfileByHomeId: async (req, res) => {
      const id = req.params.id;
      const profile = await profileDataMapper.findProfileByHomeId(id)
      if(!profile) {
        res.status(404).send('Ce profil n\'existe pas')
      }
      res.json({ status: 'success', data: { profile } });
    },

  // QUERY POST
  createOneProfile: async (req, res) => {
    const profileData = req.body;
    console.log(profileData);
    const profile = await profileDataMapper.createProfile(profileData)
    res.json({ status: 'success', data: { profile } });
  },

  updateOneProfile: async (req, res) => {
    const id = req.params.id;
    const newProfileData = req.body;
    
    const currentProfile = await profileDataMapper.findProfileById(id)

    if (!currentProfile) {
      return next(new ApiError(404, "Le profil n'existe pas."));
    }

    const updateProfileData = { ...currentProfile, ...newProfileData };
    
    const profile = await profileDataMapper.updateProfile(id, updateProfileData)
    res.json({ status: 'success', data: { profile } });
  },

  deleteOneProfile: async (req, res) => {
    const id = req.params.id;
    await profileDataMapper.deleteProfileById(id)
    res.json({ status: 'success', message: 'Le profil a bien été supprimé' });
  },

  uploadImage: async (req, res) => {
        if (!req.file) {
            // Si aucune image n'est téléchargée, utilisez un chemin par défaut
            const defaultImagePath = "./app/uploads/avatars/default-avatar.png";
            return res.status(200).json({ filePath: defaultImagePath });
        }

        // S'il y a une image téléchargée, utilisez-la
        const filePath = req.file.path; // sauvegardez le chemin du fichier téléchargé
        res.status(200).json({ filePath });
  },

  imageBase64: async (req, res) => {
    
    const options = {  
      flag: "w+" 
    }; 

    const imageBase64 = req.body.image;
    const profileId = req.body.id;

    if (!imageBase64 || !profileId) {
      return next(new ApiError(400, "Invalid request: image and profile ID are required."));
    }

    // get extension of the image
    const matches = imageBase64.match(/^data:image\/([A-Za-z-+/]+);base64/);
    if (!matches || matches.length < 2) {
      return next(new ApiError(400, "Invalid base64 image format."));
    }
    const extension = matches[1];

    const base64Data = imageBase64.split(';base64,').pop();
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const imagePath = `public/uploads/avatars/${profileId}.${extension}`; // path to save the image 
    await fs.outputFile(imagePath, imageBuffer, options);

    const imageName = imagePath.split("public/").pop();
    
    console.log(profileId);
    const currentProfile = await profileDataMapper.findProfileById(profileId)

    if (!currentProfile) {
      return next(new ApiError(404, "Le profil n'existe pas."));
    }

    const updateProfileData = { ...currentProfile, image: imageName };

    const profile = await profileDataMapper.updateProfile(profileId, updateProfileData);
  
    return res.status(200).json({ status: 'success', message: 'Image uploaded successfully !' });
  }
}

export default profileController;