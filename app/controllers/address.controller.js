import addressDataMapper from '../datamappers/address.datamapper.js'
import ApiError from '../errors/api.error.js';

const addressController = {

  // QUERY GET
  getAllAddress: async (_, res) => {
    const addresses = await addressDataMapper.findAllAddress()
    return res.json({ status: 'success', data: { addresses } });
  },

  getAddressById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const address = await addressDataMapper.findAddressById(id)
    if(!address[0]) {
      return next(new ApiError(404, `L'adresse n'existe pas.`));
    }
    return res.json({ status: 'success', data: { address } });
},

  getAddressByAccountId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const addresses = await addressDataMapper.findAddressByAccountId(id)
    if(addresses.lenght === 0) {
      return next(new ApiError(404, `L'adresse n'existe pas.`));
    }
    return res.json({ status: 'success', data: { addresses } });
  },

  getAddressByHomeId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const addresses = await addressDataMapper.findAddressByHomeId(id)
    if(!addresses[0]) {
      return next(new ApiError(404, `L'adresse n'existe pas.`));
    }
    return res.json({ status: 'success', data: { addresses } });
  },

  // QUERY POST
  createOneAddress: async (req, res) => {
    const addressData = req.body;
    const address = await addressDataMapper.createAddress(addressData)
    return res.json({ status: 'success', data: { address } });
  },

  updateOneAddress: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const newAddressData = req.body;
    if (!newAddressData) {
      return next(new ApiError(400, `L'adresse est incorrecte.`));
    }
    const currentAddress = await addressDataMapper.updateAddress(id, newAddressData)
    if (!currentAddress) {
      return next(new ApiError(404, `L'adresse n'existe pas.`));
    }
    const updateAddress = { ...currentAddress[0], ...newAddressData }

    const updatedAddress = await addressDataMapper.updateAddress(id, updateAddress)
    return res.json({ status: 'success', data: { updatedAddress } });
  },

  deleteOneAddress: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    await addressDataMapper.deleteAddressById(id)
    return res.json({ status: 'success', message: 'L\'adresse a bien été supprimée' });
  }
}

export default addressController;