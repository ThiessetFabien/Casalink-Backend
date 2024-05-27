import accountDataMapper from '../datamappers/account.datamapper.js'
import bcrypt from 'bcrypt';
import homeDataMapper from '../datamappers/home.datamapper.js';
import ApiError from '../errors/api.error.js';
import profilDataMapper from '../datamappers/profile.js';

const accountController = {

  // QUERY GET
  getAllAccounts: async (_, res) => {
    const account = await accountDataMapper.findAllAccounts();
    return res.json({ status: 'success', data: { account } });
  },

  getAccountById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    const account = await accountDataMapper.findAccountById(id)
    if (!account[0]) {
      await homeDataMapper.deleteHomeById(home.id);
      return next(new ApiError(404, `Le compte n'existe pas.`));
    }
    return res.json({ status: 'success', data: { account } });
  },

  getAccountByHomeId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) { 
      return next(new ApiError(401, `L'identifiant du foyer est incorrect.`));
    }
    const account = await accountDataMapper.findAccountsByHomeId(id)
    if (!account[0]) { 
      return next(new ApiError(404, `Le compte n'existe pas.`));
    }
    return res.json({ status: 'success', data: { account } });
  },


  // QUERY POST
  createOneAccount: async (req, res,) => {
        const accountData = req.body;
        const { firstname, lastname, email, password, confirmPassword } = accountData;
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            return next(new ApiError(400, 'Tous les champs sont obligatoires'));
        }
        if (password !== confirmPassword) {
            return next(new ApiError(400, 'Les mots de passe ne correspondent pas'));
        }
        const checkAccount = await accountDataMapper.findAccountByEmail(email);
        console.log('checkAccount', checkAccount);
        if (checkAccount) {
            return res.status(400).json({ status: 'error', message: 'Cet email est déjà utilisé' });
        }
        // creating a default home
        const homeData = { name: 'Mon foyer', };
        const home = await homeDataMapper.createHome(homeData);
        console.log('home', home);
        if (!home) {
          return next(new ApiError(500, 'La création du foyer a échoué.'));
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
        console.log('account', account);
        if (!account[0]) {
            await homeDataMapper.deleteHomeById(home.id);
            return res.status(500).json({ status: 'error', message: 'La création du compte a échoué' });
        }
        // creating a profile with the account_id
      const profileData = {
        name: `${firstname} ${lastname}`,
        pin: '0000',
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
        return next(new ApiError(500, 'La création du profil a échoué.'));
      }
      res.status(201).json({ status: 'success', data: { account, profile: createdProfile, home } });
  },

  loginForm: async (req, res, next) => {
      const { email, password } = req.body;
      const account = await accountDataMapper.findAccountByEmail(email);
        if (!account) {
          return next(new ApiError(401, 'L\'email ou le mot de passe est incorrect'));
      }
      const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
          return next(new ApiError(401, 'L\'email ou le mot de passe est incorrect'));
        }
        console.log('isMatch', isMatch);
      req.session.accountId = account.id;
      return res.json({ status: 'success', data: { account } });
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
};

export default accountController;