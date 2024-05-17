import userDataMapper from '../datamappers/user.js'

const userController = {

  // REQUETE GET
  getAllUsers: async (_, res) => {

    const user = await userDataMapper.findAllUsers()
    res.json({ status: 'success', data: { user } });

  },

  getUserById: async (req, res) => {

    const id = req.params.id;
    const task = await userDataMapper.findUserById(id)

    if(!task) {
      res.status(404).send('Ce user n\'existe pas')
    }

    res.json({ status: 'success', data: { task } });

  },

  getUserByHomeId: async (req, res) => {

    const id = req.params.id;
    const user = await userDataMapper.findUsersByHomeId(id)

    if(!user) {
      res.status(404).send('Ce user n\'existe pas')
    }

    res.json({ status: 'success', data: { user } });

  },
 
  // QUERY POST
  createOneUser: async (req, res) => {

    const userData = req.body;
    const task = await userDataMapper.createUser(userData)
    res.json({ status: 'success', data: { task } });

  },

  updateOneUser: async (req, res) => {

    const id = req.params.id;
    const userData = req.body;
    const task = await userDataMapper.updateUser(id, userData)
    res.json({ status: 'success', data: { task } });

  },

  deleteOneUser: async (req, res) => {

    const id = req.params.id;
    await userDataMapper.deleteUserById(id)
    res.json({ status: 'success', message: 'Le user a bien été supprimé' });

  }
}

export default userController;