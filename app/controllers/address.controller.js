/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import addressDataMapper from '../datamappers/address.datamapper.js';
import ApiError from '../errors/api.error.js';

const addressController = {

  // REQUETE GET
  getAllAddress: async (req, res) => {
    const addresses = await addressDataMapper.findAllAddress();
    res.json({ status: 'success', data: { addresses } });
  },

  getAddressById: async (req, res, next) => {
    const { id } = req.params;
    const address = await addressDataMapper.findAddressById(id);
    if (!address) {
      return next(new ApiError(404, 'L\'adresse n\'existe pas.'));
    }
    return res.json({ status: 'success', data: { address } });
  },

  getAddressByAccountId: async (req, res, next) => {
    const { id } = req.params;
    const addresse = await addressDataMapper.findAddressByAccountId(id);
    if (!addresse) {
      return next(new ApiError(404, 'L\'adresse n\'existe pas.'));
    }
    return res.json({ status: 'success', data: { addresse } });
  },

  getAddressByHomeId: async (req, res, next) => {
    const { id } = req.params;
    const addresses = await addressDataMapper.findAddressByHomeId(id);
    if (!addresses) {
      return next(new ApiError(404, 'L\'adresse n\'existe pas.'));
    }
    return res.json({ status: 'success', data: { addresses } });
  },

  // QUERY POST
  createOneAddress: async (req, res) => {
    const addressData = req.body;
    const address = await addressDataMapper.createAddress(addressData);
    res.json({ status: 'success', data: { address } });
  },

  updateOneAddress: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, 'L\'identifiant du compte est incorrect.'));
    }
    const newAddressData = req.body;
    if (!newAddressData) {
      return next(new ApiError(400, 'L\'adresse est incorrecte.'));
    }
    const currentAddressData = await addressDataMapper.findAddressById(id);
    if (!currentAddressData) {
      return next(new ApiError(404, 'L\'adresse n\'existe pas.'));
    }
    const updateAddressData = { ...currentAddressData, ...newAddressData };
    const updateAddress = await addressDataMapper.updateAddress(id, updateAddressData);
    res.json({ status: 'success', data: { updateAddress } });
  },

  deleteOneAddress: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id, 10)) {
      return next(new ApiError(401, 'L\'identifiant de l\'adresse est incorrect.'));
    }

    // Recherche de l'adresse par ID
    const currentAddress = await addressDataMapper.findAddressById(id);

    // Vérification si l'adresse existe
    if (!currentAddress || currentAddress.length === 0) {
      return next(new ApiError(404, 'L\'adresse n\'existe pas.'));
    }

    // Suppression de l'adresse par ID
    await addressDataMapper.deleteAddressById(id);

    // Réponse de succès
    return res.json({ status: 'success', message: 'L\'adresse a bien été supprimée' });
  },
};

export default addressController;
