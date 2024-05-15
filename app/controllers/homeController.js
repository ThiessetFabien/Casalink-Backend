import homeDataMapper from '../datamappers/home.js'


const homeController = {

  // REQUETE GET
  getAllHomes: async (req, res) => {
    try {
      const home = await homeDataMapper.findAllHome()
      res.json({ status: 'success', data: { home } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  getHomeById: async (req, res) => {
    try {
      const id = req.params.id;
      const home = await homeDataMapper.findHomeById(id)

      if(!home) {
        res.status(404).send('Ce foyer n\'existe pas')
      }

      res.json({ status: 'success', data: { home } });
  
    } catch(error) {
  
      return res.status(500).json({ status: 'error', message: error.message });
  
    }
  },

  getHomeByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const home = await homeDataMapper.findHomeByUserId(id)

      if(!home) {
        res.status(404).send('Ce user n\'existe pas')
      }

      res.json({ status: 'success', data: { home } });
  
    } catch(error) {
  
      return res.status(500).json({ status: 'error', message: error.message });
  
    }
  },
 
  // QUERY POST
  createOneHome: async (req, res) => {
    try {
      const homeData = req.body;
      const home = await homeDataMapper.createHome(homeData)
      res.json({ status: 'success', data: { home } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  updateOneHome: async (req, res) => {
    try {
      const id = req.params.id;
      const homeData = req.body;
      const home = await homeDataMapper.updateHome(id, homeData)
      res.json({ status: 'success', data: { home } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  deleteOneHome: async (req, res) => {
    try {
      const id = req.params.id;
      await homeDataMapper.deleteHomeById(id)
      res.json({ status: 'success', message: 'Le foyer a bien été supprimé' });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  }



}

export default homeController;