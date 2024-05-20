import userDataMapper from '../datamappers/user.js'
import cryptoPassword from '../utils/cryptoPassword.js';

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
    const { firstname, lastname, email, password } = userData;
    
    if (!firstname || !lastname || !email || !password) {
      res.status(400).send('Il manque des informations')
    }

    const checkUser = await userDataMapper.findUserByEmail(email);

    if (checkUser) {
      res.status(400).send('Cet email est déjà utilisé')
    }

    const task = await userDataMapper.createUser(userData)
    res.json({ status: 'success', data: { task } });

  },

  loginForm: async (req, res) => {
      
      const { email, password } = req.body;
      const user = await userDataMapper.findUserByEmail(email);
  
      if (!user) {
        res.status(404).send('L\email ou le mot de passe est incorrect')
      }

      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        res.status(401).send('L\email ou le mot de passe est incorrect')
      }

      req.session.userId = user.id;
      res.json({ status: 'success', data: { user } });
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.json({ status: 'success', message: 'Vous êtes déconnecté' });
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