import addressDataMapper from '../datamappers/address.js'
import controllerWrapper from '../middlewares/controller.wrapper.js';

const addressController = {

  // REQUETE GET
  getAllAddress: controllerWrapper(async (req, res) => {

    const addresses = await addressDataMapper.findAllAddress()
    res.json({ status: 'success', data: { addresses } });

  }),

  getAddressById: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const address = await addressDataMapper.findAddressById(id)

    if(!address) {
      res.status(404).send('Cette adresse n\'existe pas')
    }

    res.json({ status: 'success', data: { address } });
  
  }),

  getAddressByUserId: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const addresse = await addressDataMapper.findAddressByUserId(id)

    if(!addresse) {
      res.status(404).send('Cette adresse n\'existe pas')
    }

    res.json({ status: 'success', data: { addresse } });

  }),

  getAddressByHomeId: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const addresses = await addressDataMapper.findAddressByHomeId(id)

    if(!addresses) {
      res.status(404).send('Ce foyer n\'existe pas')
    }

    res.json({ status: 'success', data: { addresses } });

  }),
 
  // QUERY POST
  createOneAddress: controllerWrapper(async (req, res) => {

    const addressData = req.body;
    const address = await addressDataMapper.createAddress(addressData)
    res.json({ status: 'success', data: { address } });

  }),

  updateOneAddress: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const addressData = req.body;
    const address = await addressDataMapper.updateAddress(id, addressData)
    res.json({ status: 'success', data: { address } });

  }),

  deleteOneAddress: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    await addressDataMapper.deleteAddressById(id)
    res.json({ status: 'success', message: 'L\'adresse a bien été supprimée' });

  })

}

export default addressController;