import accountDataMapper from '../datamappers/account.js'
import bcrypt from 'bcrypt';
import homeDataMapper from '../datamappers/home.js';

const accountController = {

  // QUERY GET
  getAllAccounts: async (_, res) => {
    const account = await accountDataMapper.findAllAccounts()
    res.json({ status: 'success', data: { account } });
  },

  getAccountById: async (req, res) => {
    const id = req.params.id;
    const task = await accountDataMapper.findAccountById(id)
    if(!task) {
      res.status(404).send('Ce compte n\'existe pas')
    }
    res.json({ status: 'success', data: { task } });
  },

  getAccountByHomeId: async (req, res) => {
    const id = req.params.id;
    const account = await accountDataMapper.findAccountsByHomeId(id)
    
    if(!account) {
      res.status(404).send('Ce compte n\'existe pas')
    }
    res.json({ status: 'success', data: { account } });
  },

  // QUERY POST
  createOneAccount: async (req, res) => {
    const accountData = req.body;
    const { firstname, lastname, email, password, confirmPassword } = accountData;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      res.status(400).json({ status: 'error', message: 'Tous les champs sont obligatoires' });
    }

    if(password !== confirmPassword) {
      res.status(400).json({ status: 'error', message: 'Les mots de passe ne correspondent pas' });
    }
    const checkAccount = await accountDataMapper.findAccountByEmail(email);
    if (checkAccount) {
      res.status(400).json({ status: 'error', message: 'Cet email est déjà utilisé' });
    }
    const name = {
      name: 'Mon foyer',
    };
    const home = await homeDataMapper.createHome(name);
    if (!home) {
      res.status(400).json({ status: 'error', message: 'La création de la maison a échoué' });
    }
    
    const accountDataWithHomeId = { ...accountData, home_id: home.id };

    const account = await accountDataMapper.createAccount(accountDataWithHomeId)
    res.json({ status: 'success', data: { account } });
  },

  loginForm: async (req, res) => {
      
      const { email, password } = req.body;
      console.log(req.body);
      console.log(email);
      
      const account = await accountDataMapper.findAccountByEmail(email);
        if (!account) {
        res.status(404).json({ status: 'error', message: 'L\'email ou le mot de passe est incorrect' });
      }

      const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
        res.status(401).json({ status: 'error', message: 'L\'email ou le mot de passe est incorrect' });
      }
      req.session.accountId = account.id;
      res.json({ status: 'success', data: { account } });
  },

  logout: async (req, res) => {
    req.session.destroy();
    res.json({ status: 'success', message: 'Vous êtes déconnecté' });
  },

  updateOneAccount: async (req, res) => {
    const id = req.params.id;
    const accountData = req.body;
    const task = await accountDataMapper.updateAccount(id, accountData)
    res.json({ status: 'success', data: { task } });
  },

  deleteOneAccount: async (req, res) => {
    const id = req.params.id;
    await accountDataMapper.deleteAccountById(id)
    res.json({ status: 'success', message: 'Le compte a bien été supprimé' });
  }
}

export default accountController;