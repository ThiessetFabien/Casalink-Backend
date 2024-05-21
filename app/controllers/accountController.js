import accountDataMapper from '../datamappers/account.js'

const accountController = {

  // REQUETE GET
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
    const { firstname, lastname, email, password } = accountData;
    
    if (!firstname || !lastname || !email || !password) {
      res.status(400).send('Il manque des informations')
    }

    const checkAccount = await accountDataMapper.findAccountByEmail(email);

    if (checkAccount) {
      res.status(400).send('Cet email est déjà utilisé')
    }

    const task = await accountDataMapper.createAccount(accountData)
    res.json({ status: 'success', data: { task } });

  },

  loginForm: async (req, res) => {
      
      const { email, password, confirmPassword } = req.body;
      const account = await accountDataMapper.findAccountByEmail(email);
  
      if (!account) {
        res.status(404).json({ status: 'error', message: 'L\'email ou le mot de passe est incorrect' });
      }

      if(password !== confirmPassword) {
        res.status(400).json({ status: 'error', message: 'Les mots de passe ne correspondent pas' });
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