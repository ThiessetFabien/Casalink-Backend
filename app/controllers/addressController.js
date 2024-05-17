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

  getAddressByUserId: async (req, res) => {

    const id = req.params.id;
    const addresse = await addressDataMapper.findAddressByUserId(id)

    if(!addresse) {
      res.status(404).send('Cette adresse n\'existe pas')
    }

    res.json({ status: 'success', data: { addresse } });

  },

  getAddressByHomeId: async (req, res) => {

    const id = req.params.id;
    const addresse = await addressDataMapper.findAddressByHomeId(id)

    if(!addresse) {
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
    const addressData = req.body;
    const address = await addressDataMapper.updateAddress(id, addressData)
    res.json({ status: 'success', data: { address } });

  },

  deleteOneAddress: async (req, res) => {

    const id = req.params.id;
    await addressDataMapper.deleteAddressById(id)
    res.json({ status: 'success', message: 'L\'adresse a bien été supprimée' });

  }
}

export default addressController;