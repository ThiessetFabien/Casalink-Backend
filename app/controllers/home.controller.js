import homeDataMapper from '../datamappers/home.datamapper.js';
import ApiError from '../errors/api.error.js';

const homeController = {

  // QUERY GET
  getAllHomes: async (_, res) => {
    const homes = await homeDataMapper.findAllHomes();
    return res.json({ status: 'success', data: { homes } });
  },

  getHomeById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const home = await homeDataMapper.findHomeById(id)
    if(!home[0]) {
      return next(new ApiError(404, `Le foyer n'existe pas.`));
    }
    return res.json({ status: 'success', data: { home } });
  },

  getHomeByAccountId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const home = await homeDataMapper.findHomeByAccountId(id)
    if(!home[0]) {
      return next(new ApiError(404, `Le foyer n'existe pas.`));
    }
    return res.json({ status: 'success', data: { home } });
},

  // QUERY POST
  createHome: async (req, res, next) => {
    const homeData = req.body;
    if (!homeData) {
      return next(new ApiError(400, `Le foyer est incorrect.`));
    }
    const home = await homeDataMapper.createHome(homeData);
    return res.json({ status: 'success', data: { home } });
  },

  updateOneHome: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du foyer est incorrect.`));   
    }
    const newHomeData = req.body;
    if (!newHomeData) {
      return next(new ApiError(400, `Le foyer est incorrecte.`));
    }
    const currentHome = await homeDataMapper.updateHome(id, newHomeData)
    if (!currentHome) {
      return next(new ApiError(404, `Le foyer n'existe pas.`));
    }
    const updateHome = { ...currentHome[0], ...newHomeData };

    const updatedHome = await homeDataMapper.updateHome(id, updateHome);
    return res.json({ status: 'success', data: { updatedHome } });
  },

  deleteOneHome: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const home = await homeDataMapper.findHomeById(id);
    if (!home[0]) {
      return next(new ApiError(404, `Le foyer n'existe pas.`));
    }
    await homeDataMapper.deleteHomeById(id);
    return res.json({ status: 'success', message: 'Le foyer a bien été supprimé' });
  }
};

export default homeController;