/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import budgetData from '../budget.datamapper.js';

describe('Casalink generates the list of budget', () => {
  it('should return a list of budgets', async () => {
    const budgetList = await budgetData.findAllBudgets();
    expect(budgetList).to.be.an('array');
    budgetList.forEach((budget) => {
      expect(budget).to.have.property('category');
      expect(budget).to.have.property('amount');
      expect(budget).to.have.property('description');
    });
  });

  it('should return a budget by ID', async () => {
    const budgetId = 1;
    const budget = await budgetData.findBudgetById(budgetId);
    expect(budget).to.be.an('object');
    expect(budget).to.have.property('amount');
    expect(budget).to.have.property('name');
    expect(budget).to.have.property('category');
    expect(budget).to.have.property('description');
    expect(budget).to.have.property('home_id');
  });

  it('should create a new budget', async () => {
    const newbudget = {
      amount: '800',
      name: 'Sante',
      category: 'Category 4',
      description: 'La maladie du code',
      home_id: 1,
    };
    const budget = await budgetData.createBudget(newbudget);
    expect(budget).to.be.an('object');
  });

  it('should update a budget', async () => {
    const budgetId = 4;
    const updatebudget = {
      amount: '1000',
      name: 'Electricite',
      category: 'Category 5',
      description: 'Le petrole du web',
      home_id: 1,
    };

    const budget = await budgetData.updateBudget(budgetId, updatebudget);
  });

  it('should delete a budget', async () => {
    const budgetId = 4;
    const result = await budgetData.deleteBudgetById(budgetId);
    expect(result).to.be.true;
  });
});
