/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import homeDataMapper from '../datamappers/home.datamapper.js';
import ApiError from '../errors/api.error.js';

const homeController = {

  // QUERY GET
  getAllHomes: async (_, res) => {
    const homes = await homeDataMapper.findAllHomes();
    res.json({ status: 'success', data: { homes } });
  },

  getHomeById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id, 10)) {
      return next(new ApiError(401, 'L\'identifiant du compte est incorrect.'));
    }
    const home = await homeDataMapper.findHomeById(id);
    if (!home) {
      return next(new ApiError(404, 'Le foyer n\'existe pas.'));
    }
    res.json({ status: 'success', data: { home } });
  },

  getHomeByAccountId: async (req, res, next) => {
    const { id } = req.params;
    const home = await homeDataMapper.findHomeByAccountId(id);
    if (!home) {
      return next(new ApiError(404, 'Le foyer n\'existe pas.'));
    }
    res.json({ status: 'success', data: { home } });
  },

  // QUERY POST
  createOneHome: async (req, res) => {
    const homeData = req.body;
    const home = await homeDataMapper.createHome(homeData);
    res.json({ status: 'success', data: { home } });
  },

  updateOneHome: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, 'L\'identifiant du foyer est incorrect.'));
    }
    const newHomeData = req.body;
    if (!newHomeData) {
      return next(new ApiError(400, 'Le foyer est incorrecte.'));
    }
    const currentHomeData = await homeDataMapper.findHomeById(id);
    if (!currentHomeData) {
      return next(new ApiError(404, 'Le foyer n\'existe pas.'));
    }
    const updateHomeData = { ...currentHomeData, ...newHomeData };
    const updateHome = await homeDataMapper.updateHome(id, updateHomeData);
    res.json({ status: 'success', data: { updateHome } });
  },

  deleteOneHome: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, 'L\'identifiant du compte est incorrect.'));
    }
    const home = await homeDataMapper.findHomeById(id);
    if (!home || home.length === 0) {
      return next(new ApiError(404, 'Le foyer n\'existe pas.'));
    }
    await homeDataMapper.deleteHomeById(id);
    return res.json({ status: 'success', message: 'Le foyer a bien été supprimé' });
  },
};

export default homeController;
