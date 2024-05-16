import homeDataMapper from '../datamappers/home.js'
import controllerWrapper from '../middlewares/controller.wrapper.js';

const homeController = {

  // REQUETE GET
  getAllHomes: controllerWrapper(async (req, res) => {
      
    const homes = await homeDataMapper.findAllHomes()
    res.json({ status: 'success', data: { homes } });

  }),

  getHomeById: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const home = await homeDataMapper.findHomeById(id)

    if(!home) {
      res.status(404).send('Ce foyer n\'existe pas')
      res.json({ status: 'success', data: { home } });
    }

  }),

  getHomeByUserId: controllerWrapper(async (req, res) => {
    
    const id = req.params.id;
    const home = await homeDataMapper.findHomeByUserId(id)

    if(!home) {
      res.status(404).send('Ce user n\'existe pas')
    }

    res.json({ status: 'success', data: { home } });
  
  }),
 
  // QUERY POST
  createOneHome: controllerWrapper(async (req, res) => {
    
    const homeData = req.body;
    const home = await homeDataMapper.createHome(homeData)
    res.json({ status: 'success', data: { home } });

  }),

  updateOneHome: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const homeData = req.body;
    const home = await homeDataMapper.updateHome(id, homeData)
    res.json({ status: 'success', data: { home } });

  }),

  deleteOneHome: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    await homeDataMapper.deleteHomeById(id)
    res.json({ status: 'success', message: 'Le foyer a bien été supprimé' });

  })

}

export default homeController;