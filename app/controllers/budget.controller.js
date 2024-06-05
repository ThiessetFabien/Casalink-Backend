/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import budgetDataMapper from '../datamappers/budget.datamapper.js';

const budgetController = {

  // QUERY GET
  getAllBudgets: async (req, res) => {
    const budgets = await budgetDataMapper.findAllBudgets();
    res.json({ status: 'success', data: { budgets } });
  },

  getBudgetById: async (req, res) => {
    const { id } = req.params;
    const budget = await budgetDataMapper.findBudgetById(id);

    if (!budget) {
      return res.status(404).send('Ce budget n\'existe pas');
    }
    res.json({ status: 'success', data: { budget } });
  },

  getBudgetByHomeId: async (req, res) => {
    const { id } = req.params;
    const budget = await budgetDataMapper.findBudgetByHomeId(id);

    if (!budget) {
      res.status(404).send('Ce budget n\'existe pas');
    }
    res.json({ status: 'success', data: { budget } });
  },

  getBudgetsByAccountId: async (req, res) => {
    const { id } = req.params;
    const budgets = await budgetDataMapper.findBudgetsByAccountId(id);

    if (!budgets || budgets.length === 0) {
      return res.status(404).send('Aucun budget trouvé pour ce compte.');
    }

    res.json({ status: 'success', data: { budgets } });
  },

  // QUERY POST
  createOneBudget: async (req, res) => {
    const budgetData = req.body;
    const budget = await budgetDataMapper.createBudget(budgetData);
    res.json({ status: 'success', data: { budget } });
  },

  updateOneBudget: async (req, res) => {
    const { id } = req.params;
    const newBudgetData = req.body;
    const currentBudgetData = await budgetDataMapper.findBudgetById(id);
    if (!currentBudgetData) {
      return res.status(404).send('Ce budget n\'existe pas');
    }
    const updateBudgetData = { ...currentBudgetData, ...newBudgetData };
    const updateBudget = await budgetDataMapper.updateBudget(id, updateBudgetData);
    res.json({ status: 'success', data: { updateBudget } });
  },

  deleteOneBudget: async (req, res) => {
    const { id } = req.params;
    await budgetDataMapper.deleteBudgetById(id);
    res.json({ status: 'success', message: 'Le budget a bien été supprimé' });
  },
};

export default budgetController;
