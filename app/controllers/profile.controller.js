import profileDataMapper from '../datamappers/profile.js';
import ApiError from '../errors/api.error.js';

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
  }
}

export default profileController;