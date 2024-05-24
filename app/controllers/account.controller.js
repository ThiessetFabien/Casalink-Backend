import accountDataMapper from '../datamappers/account.datamapper.js'
import bcrypt from 'bcrypt';
import homeDataMapper from '../datamappers/home.datamapper.js';
import ApiError from '../errors/api.error.js';

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
  createAccount: async (req, res, next) => {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            return next(new ApiError(400, 'Tous les champs sont obligatoires.'));
        }
        if (password !== confirmPassword) {
            return next(new ApiError(400, 'Les mots de passe ne correspondent pas.'));
        }
        const checkAccount = await accountDataMapper.findAccountByEmail(email);
        if (checkAccount) {
            return next(new ApiError(400, 'Cet email est déjà utilisé.'));
        }
        const homeData = 'Mon foyer';
        const home = await homeDataMapper.createHome(homeData);
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
            return next(new ApiError(500, 'La création du compte a échoué.'));
        }
        res.json({ status: 'success', data: { account } });
},

  loginForm: async (req, res, next) => {
      const { email, password } = req.body;
      const account = await accountDataMapper.findAccountByEmail(email);
      if (account.length === 0) {
        return next(new ApiError(401, `L'email ou le mot de passe est incorrect`));
      }
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        return next(new ApiError(401, `L'email ou le mot de passe est incorrect`));
      }
      req.session.accountId = account.id;
      return res.json({ status: 'success', data: { account } });
  },

  logout: async (req, res) => {
    req.session.destroy();
    return res.json({ status: 'success', message: 'Vous êtes déconnecté' });
  },

  updateOneAccount: async (req, res, next) => {
    const newAccountData = req.body;
    const { id } = req.params;

    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    if (!id || !newAccountData) {
      return next(new ApiError(400, `Les données du compte et/ou l'identifiant sont manquants.`));
    }

    if (newAccountData.password !== newAccountData.confirmPassword) {
      return next(new ApiError(400, `Les mots de passe ne correspondent pas.`));
    }

    const currentAccountData = await accountDataMapper.findAccountById(id);
    
    if (!currentAccountData[0]) {
      return next(new ApiError(404, `Le compte n'existe pas.`));
    }
    const updateData = { ...currentAccountData[0], ...newAccountData };
    const updatedAccount = await accountDataMapper.updateAccount(id, updateData)
    return res.json({ status: 'success', data: { updatedAccount } });
  },

  deleteOneAccount: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, `L'identifiant du compte est incorrect.`));   
    }
    await accountDataMapper.deleteAccountById(id)
    return res.json({ status: 'success', message: 'Le compte a bien été supprimé' });
  }
}

export default accountController;