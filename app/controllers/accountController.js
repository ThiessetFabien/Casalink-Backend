import accountDataMapper from '../datamappers/account.js'
import bcrypt from 'bcrypt';
import homeDataMapper from '../datamappers/home.js';
import profilDataMapper from '../datamappers/profile.js';

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
    try {
        const accountData = req.body;
        const { firstname, lastname, email, password, confirmPassword } = accountData;

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            return res.status(400).json({ status: 'error', message: 'Tous les champs sont obligatoires' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ status: 'error', message: 'Les mots de passe ne correspondent pas' });
        }

        const checkAccount = await accountDataMapper.findAccountByEmail(email);
        if (checkAccount) {
            return res.status(400).json({ status: 'error', message: 'Cet email est déjà utilisé' });
        }
        // creating a default home
        const homeData = {
            name: 'Mon foyer',
        };
        const home = await homeDataMapper.createHome(homeData);
        if (!home) {
            return res.status(400).json({ status: 'error', message: 'La création de la maison a échoué' });
        }
        // creating an account with the home_id
        const accountDataWithHomeId = { 
            firstname, 
            lastname, 
            email, 
            password, 
            home_id: home.id 
        };

        const account = await accountDataMapper.createAccount(accountDataWithHomeId);
        if (!account) {
            await homeDataMapper.deleteHomeById(home.id);
            return res.status(500).json({ status: 'error', message: 'La création du compte a échoué' });
        }
        // creating a profile with the account_id
      const profileData = {
        name: `${firstname} ${lastname}`,
        pin: '1234',
        score: 0,
        birthdate: '1994-10-05',
        image: null,
        email: `${email}`,
        account_id: account.id
      };
      const createdProfile = await profilDataMapper.createProfile(profileData);
      if (!createdProfile) {
        // rollback account creation and home creation if profile creation fails 
        await accountDataMapper.deleteAccountById(account.id);
        await homeDataMapper.deleteHomeById(home.id);
        return res.status(500).json({ status: 'error', message: 'La création du profil a échoué' });
      }

      res.status(201).json({ status: 'success', data: { account, profile: createdProfile, home } });
    } catch (error) {
      console.error('Error creating account:', error);
      res.status(500).json({ status: 'error', message: 'Erreur serveur' });
    }
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
    const newAccountData = req.body;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant du compte est incorrect."));
    }
    const currentAccountData = await accountDataMapper.findAccountById(id);
    if (!currentAccountData) {
      return next(new ApiError(404, "Le compte n'existe pas."));
    }
    if(newAccountData.password && newAccountData.confirmPassword) {
      if (newAccountData.password !== newAccountData.confirmPassword) {
        return res.status(400).json({ status: 'error', message: 'Les mots de passe ne correspondent pas' });
      }
    }
    const updateAccountData = { ...currentAccountData, ...newAccountData };

    const updateAccount= await accountDataMapper.updateAccount(id, updateAccountData )
    return res.json({ status: 'success', data: { updateAccount } });
  },

  deleteOneAccount: async (req, res) => {
    const id = req.params.id;
    await accountDataMapper.deleteAccountById(id)
    res.json({ status: 'success', message: 'Le compte a bien été supprimé' });
  }
}

export default accountController;