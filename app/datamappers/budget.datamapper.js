/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import pool from './connexion.js';
import DbError from '../errors/dbError.js';

const budgetDataMapper = {

  // ----------- FIND BUDGET -----------

  async findAllBudgets() {
    try {
      const result = await pool.query(
        `SELECT * 
        FROM "budget";`,
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findBudgetById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant du budget est manquant.');
      }
      const result = await pool.query(`SELECT * 
          FROM "budget" 
        WHERE id = $1;
      `, [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findBudgetByHomeId(home_id) {
    try {
      if (!home_id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }

      const result = await pool.query(`SELECT * 
          FROM "budget" 
        WHERE home_id = $1;
      `, [home_id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findBudgetsByAccountId(account_id) {
    try {
      if (!account_id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }
      const result = await pool.query(
        `SELECT "budget".*
      FROM "account"
    JOIN "home" ON "home".id = "account".home_id
    JOIN "budget" ON "budget".home_id = "home".id
      WHERE "account".id = $1;`,
        [account_id],
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE BUDGET -----------
  async createBudget(budgetData) {
    try {
      if (!budgetData) {
        throw new Error('Les données du budget sont manquantes.');
      }
      const {
        amount, name, category, description, home_id,
      } = budgetData;

      const result = await pool.query(
        `INSERT INTO "budget" 
          (amount, name, category, description, home_id) 
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
        [amount, name, category, description, home_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE budget -----------
  async updateBudget(id, budgetData) {
    try {
      if (!id || !budgetData) {
        throw new Error('L\'identifiant ou les données du budget sont manquants.');
      }
      const {
        amount, name, category, description, home_id,
      } = budgetData;
      const result = await pool.query(
        `UPDATE "budget" 
          SET amount = $1, 
          name = $2, 
          category = $3, 
          description = $4, 
          home_id = $5 
        WHERE id = $6 
          RETURNING *;`,
        [amount, name, category, description, home_id, id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE budget -----------
  async deleteBudgetById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant du budget est manquant.');
      }
      await pool.query('DELETE FROM "budget" WHERE id = $1;', [id]);
      return true;
    } catch (error) {
      throw new DbError(error.message);
    }
  },
};

export default budgetDataMapper;
