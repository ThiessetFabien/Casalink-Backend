import profileDataMapper from '../datamappers/profile.js'

const profileController = {

  // REQUETE GET

  getProfileById: async (req, res) => {

    const id = req.params.id;
    const profile = await profileDataMapper.findProfileById(id)

    if(!profile) {
      res.status(404).send('Cette profile n\'existe pas')
    }

    res.json({ status: 'success', data: { profile } });
  
  },

  getProfileByUserId: async (req, res) => {

    const id = req.params.id;
    const profile = await profileDataMapper.findProfileByUserId(id)

    if(!profile) {
      res.status(404).send('Ce profil n\'existe pas')
    }

    res.json({ status: 'success', data: { profile } });

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
    const profileData = req.body;
    const profile = await profileDataMapper.updateProfile(id, profileData)
    res.json({ status: 'success', data: { profile } });

  },

  deleteOneProfile: async (req, res) => {

    const id = req.params.id;
    await profileDataMapper.deleteProfileById(id)
    res.json({ status: 'success', message: 'Le profil a bien été supprimé' });

  }
}

export default profileController;