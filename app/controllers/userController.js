import userDataMapper from '../datamappers/user.js'
import controllerWrapper from '../middlewares/controller.wrapper.js';

const userController = {

  // REQUETE GET
  getAllUsers: controllerWrapper(async (_, res) => {

    const user = await userDataMapper.findAllUsers()
    res.json({ status: 'success', data: { user } });

  }),

  getUserById: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const task = await userDataMapper.findUserById(id)

    if(!task) {
      res.status(404).send('Ce user n\'existe pas')
    }

    res.json({ status: 'success', data: { task } });

  }),

  getUserByHomeId: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const user = await userDataMapper.findUsersByHomeId(id)

    if(!user) {
      res.status(404).send('Ce user n\'existe pas')
    }

    res.json({ status: 'success', data: { user } });

  }),
 
  // QUERY POST
  createOneUser: controllerWrapper(async (req, res) => {

    const userData = req.body;
    const task = await userDataMapper.createUser(userData)
    res.json({ status: 'success', data: { task } });

  }),

  updateOneUser: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const userData = req.body;
    const task = await userDataMapper.updateUser(id, userData)
    res.json({ status: 'success', data: { task } });

  }),

  deleteOneUser: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    await userDataMapper.deleteUserById(id)
    res.json({ status: 'success', message: 'Le user a bien été supprimé' });

  })



}

export default userController;