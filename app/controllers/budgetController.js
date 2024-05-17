import budgetDataMapper from '../datamappers/budget.js'

const budgetController = {

  // REQUETE GET
  getAllBudgets: async (req, res) => {
      
    const budgets = await budgetDataMapper.findAllBudgets()
    res.json({ status: 'success', data: { budgets } });

  },

  getBudgetById: async (req, res) => {

    const id = req.params.id;
    const budget = await budgetDataMapper.findBudgetById(id)

    if(!budget) {
      res.status(404).send('Ce budget n\'existe pas')
      res.json({ status: 'success', data: { budget } });
    }

  },

  getBudgetByHomeId: async (req, res) => {
    
    const id = req.params.id;
    const budget = await budgetDataMapper.findBudgetByHomeId(id)

    if(!budget) {
      res.status(404).send('Ce budget n\'existe pas')
    }

    res.json({ status: 'success', data: { budget } });
  
  },

  getBudgetsByUserId: async (req, res) => {
    
    const id = req.params.id;
    const budgets = await budgetDataMapper.findBudgetsByUserId(id)

    if(!budgets) {
      res.status(404).send('Ce budget n\'existe pas')
    }

    res.json({ status: 'success', data: { budgets } });
  
  },
 
  // QUERY POST
  createOneBudget: async (req, res) => {
    
    const budgetData = req.body;
    const budget = await budgetDataMapper.createBudget(budgetData)
    res.json({ status: 'success', data: { budget } });

  },

  updateOneBudget: async (req, res) => {

    const id = req.params.id;
    const budgetData = req.body;
    const budget = await budgetDataMapper.updateBudget(id, budgetData)
    res.json({ status: 'success', data: { budget } });

  },

  deleteOneBudget: async (req, res) => {

    const id = req.params.id;
    await budgetDataMapper.deleteBudgetById(id)
    res.json({ status: 'success', message: 'Le budget a bien été supprimé' });

  }
}

export default budgetController;