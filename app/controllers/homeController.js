import homeDataMapper from '../datamappers/home.js'

const homeController = {

  // QUERY GET
  getAllHomes: async (_, res) => {
      
    const homes = await homeDataMapper.findAllHomes()
    res.json({ status: 'success', data: { homes } });

  },

  getHomeById: async (req, res) => {

    const id = req.params.id;
    const home = await homeDataMapper.findHomeById(id)

    if(!home) {
      res.status(404).send('Ce foyer n\'existe pas')
      res.json({ status: 'success', data: { home } });
    }

  },

  getHomeByAccountId: async (req, res) => {
    
    const id = req.params.id;
    const home = await homeDataMapper.findHomeByAccountId(id)

    if(!home) {
      res.status(404).send('Ce compte n\'existe pas')
    }

    res.json({ status: 'success', data: { home } });
  
  },

  // QUERY POST
  createOneHome: async (req, res) => {
    
    const homeData = req.body;
    const home = await homeDataMapper.createHome(homeData)
    res.json({ status: 'success', data: { home } });

  },

  updateOneHome: async (req, res) => {

    const id = req.params.id;
    const homeData = req.body;
    const home = await homeDataMapper.updateHome(id, homeData)
    res.json({ status: 'success', data: { home } });

  },

  deleteOneHome: async (req, res) => {

    const id = req.params.id;
    await homeDataMapper.deleteHomeById(id)
    res.json({ status: 'success', message: 'Le foyer a bien été supprimé' });

  }
}

export default homeController;