import addressDataMapper from '../datamappers/address.js'

const addressController = {

  // REQUETE GET
  getAllAddress: async (req, res) => {
    const addresses = await addressDataMapper.findAllAddress()
    res.json({ status: 'success', data: { addresses } });
  },

  getAddressById: async (req, res) => {
    const id = req.params.id;
    const address = await addressDataMapper.findAddressById(id)
    if(!address) {
      res.status(404).send('Cette adresse n\'existe pas')
    }
    res.json({ status: 'success', data: { address } });
},

  getAddressByAccountId: async (req, res) => {
    const id = req.params.id;
    const addresse = await addressDataMapper.findAddressByAccountId(id)
    if(!addresse) {
      res.status(404).send('Cette adresse n\'existe pas')
    }
    res.json({ status: 'success', data: { addresse } });
  },

  getAddressByHomeId: async (req, res) => {

    const id = req.params.id;
    const addresses = await addressDataMapper.findAddressByHomeId(id)
    if(!addresses) {
      res.status(404).send('Ce foyer n\'existe pas')
    }
    res.json({ status: 'success', data: { addresses } });
  },

  // QUERY POST
  createOneAddress: async (req, res) => {
    const addressData = req.body;
    const address = await addressDataMapper.createAddress(addressData)
    res.json({ status: 'success', data: { address } });
  },

  updateOneAddress: async (req, res) => {
    const id = req.params.id;
    const newAddressData = req.body;
    const currentAddressData = await addressDataMapper.findAddressById(id);
    if (!currentAddressData) {
      return res.status(404).send('Cette adresse n\'existe pas');
    }
    const updateAddressData = { ...currentAddressData, ...newAddressData };
    const updateAddress = await addressDataMapper.updateAddress(id, updateAddressData);
    res.json({ status: 'success', data: { updateAddress } });
  },

  deleteOneAddress: async (req, res) => {
    const id = req.params.id;
    await addressDataMapper.deleteAddressById(id)
    res.json({ status: 'success', message: 'L\'adresse a bien été supprimée' });
  }
}

export default addressController;