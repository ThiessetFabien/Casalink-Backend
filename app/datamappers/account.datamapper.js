/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import pool from './connexion.js';
import DbError from '../errors/dbError.js';
import cryptoPassword from '../utils/cryptoPassword.js';

const accountDataMapper = {

  // ----------- FIND account -----------

  async findAllAccounts() {
    try {
      const result = await pool.query(
        `SELECT * 
        FROM "account";
        `,
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findAccountById(id) {
    try {
      const result = await pool.query(
        `SELECT * 
        FROM "account" 
          WHERE id = $1;`,
        [id],
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },
  async findAccountByIdWithoutPassword(id) {
    try {
      const result = await pool.query(
        `SELECT 
            id, 
            email, 
            firstname, 
            lastname, 
            role, 
            home_id 
          FROM "account" 
            WHERE id = $1`,
        [id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findAccountsByHomeId(home_id) {
    try {
      const result = await pool.query(
        `
      SELECT * 
        FROM "account" 
          WHERE home_id = $1;`,
        [home_id],
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  findAccountByEmail: async (email) => {
    try {
      const result = await pool.query(
        `SELECT * 
          FROM "account" 
          WHERE email = $1;`,
        [email],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE account -----------

  async createAccount(accountData) {
    try {
      const {
        email, firstname, lastname, password, home_id,
      } = accountData;
      const hashedPassword = await cryptoPassword.hash(password);
      const result = await pool.query(
        `INSERT INTO "account" 
              (email, firstname, lastname, password, home_id) 
                VALUES ($1, $2, $3, $4, $5) 
              RETURNING *;`,
        [email, firstname, lastname, hashedPassword, home_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE account -----------
  async updateAccount(id, accountData) {
    try {
      const {
        email, firstname, lastname, password, home_id,
      } = accountData;
      const hashedPassword = await cryptoPassword.hash(password);
      const result = await pool.query(
        `UPDATE "account" 
          SET   
            email = $1, 
            firstname = $2, 
            lastname = $3, 
            password = $4, 
            home_id = $5 
          WHERE id = $6 
            RETURNING *;`,
        [email, firstname, lastname, hashedPassword, home_id, id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE account -----------

  async deleteAccountById(id) {
    try {
      const result = await pool.query(
        `DELETE 
        FROM "account" 
          WHERE id = $1;`,
        [id],
      );
      return { success: result.rowCount > 0 };
    } catch (error) {
      throw new DbError(error.message);
    }
  },
};

export default accountDataMapper;
