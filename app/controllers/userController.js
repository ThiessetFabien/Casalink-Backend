import { findAllUsers, findUserById, findUsersByHomeId, createUser, updateUser, deleteUserById } from '../datamappers/user'


const userController = {

  // REQUETE GET
  getAllUsers: async (req, res) => {
    try {
      const user = await findAllUsers()
      res.json({ status: 'success', data: { user } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await findUserById(id)

      if(!task) {
        res.status(404).send('Ce user n\'existe pas')
      }

      res.json({ status: 'success', data: { task } });
  
    } catch(error) {
  
      return res.status(500).json({ status: 'error', message: error.message });
  
    }
  },

  getUserByHomeId: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await findUsersByHomeId(id)

      if(!user) {
        res.status(404).send('Ce user n\'existe pas')
      }

      res.json({ status: 'success', data: { user } });
  
    } catch(error) {
  
      return res.status(500).json({ status: 'error', message: error.message });
  
    }
  },
 
  // QUERY POST
  createOneUser: async (req, res) => {
    try {
      const userData = req.body;
      const task = await createUser(userData)
      res.json({ status: 'success', data: { task } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  updateOneUser: async (req, res) => {
    try {
      const id = req.params.id;
      const userData = req.body;
      const task = await updateUser(id, userData)
      res.json({ status: 'success', data: { task } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  deleteOneUser: async (req, res) => {
    try {
      const id = req.params.id;
      await deleteUserById(id)
      res.json({ status: 'success', message: 'Le user a bien été supprimé' });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  }



}

export default userController;