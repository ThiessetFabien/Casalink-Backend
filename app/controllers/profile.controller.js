import profileDataMapper from '../datamappers/profile.js';
import ApiError from '../errors/api.error.js';
import fs from 'fs-extra';

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

    const imageBase64 = req.body.image;
    // const base64Data = image.split(';base64,').pop();
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const imagePath = `app/uploads/avatars/${Date.now()}.jpg`; // path to save the image 
    await fs.outputFile(imagePath, imageBuffer);

    const profileId = req.body.id;
    console.log(profileId);
    const currentProfile = await profileDataMapper.findProfileById(profileId)

    if (!currentProfile) {
      return next(new ApiError(404, "Le profil n'existe pas."));
    }

    const updateProfileData = { ...currentProfile, image: imagePath };

    const profile = await profileDataMapper.updateProfile(profileId, updateProfileData);
  
    return res.status(200).json({ status: 'success', message: 'Image uploaded successfully !' });
  }
}

export default profileController;