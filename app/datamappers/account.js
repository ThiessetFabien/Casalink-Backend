import pool from "./connexion.js";
import DbError from "../errors/dbError.js";
import cryptoPassword from '../utils/cryptoPassword.js';

const accountDataMapper = {

// ----------- FIND account -----------

  // Find all the accounts
  async findAllAccounts(){
    
    try {
    
      const result = await pool.query('SELECT * FROM "account";');
      
      return result.rows;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a account by its id
  async findAccountById(id){
    
    try {
    
      if (!id) {
        throw new Error('L\'identifiant du compte est manquant.');
      }

      const result = await pool.query('SELECT * FROM "account" WHERE id=$1;', [id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a account by its id without its password
  async findAccountByIdWithoutPassword(id){
  
    try {
    
      if (!id) {
        throw new Error('L\'identifiant du compte est manquant.');
      }

      const result = await pool.query('SELECT id, email, firstname, lastname, role, home_id FROM "account" WHERE id = $1', [id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a account by its id
  async findAccountsByHomeId(home_id){
      
    try {
    
      if (!home_id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }

      const result = await pool.query('SELECT * FROM "account" WHERE home_id = $1;', [home_id]);
    
      return result.rows;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  findAccountByEmail: async (email) => {
    try {
      if (!email) {
        throw new Error('L\'email est manquant.');
      }

      const result = await pool.query('SELECT * FROM "account" WHERE email=$1;', [email]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- CREATE account -----------

  // Create a new account
  async createAccount(accountData) {

    try {
      
      if (!accountData) {
        throw new Error('Les données du account sont manquantes.');
      }

      const { email, firstname, lastname, password } = accountData;
      
      const hashedPassword = await cryptoPassword.hash(password);

      const result = await pool.query(
        'INSERT INTO "account" (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *;',
        [email, firstname, lastname, hashedPassword]
      );

      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE account -----------

  async updateAccount(id, accountData) {
    try {

      if (!id || !accountData) {
        throw new Error('Les données du account ou l\'identifiant sont manquants.');
      }

      const { email, firstname, lastname, role, password, home_id } = accountData;
      
      const hashedPassword = await cryptoPassword.hash(password);
      
      const result = await pool.query(
        'UPDATE "account" SET email = $1, firstname = $2, lastname = $3, role = $4, password = $5, home_id = $6 WHERE id = $7 RETURNING *;',
        [ email, firstname, lastname, role, hashedPassword, home_id, id]
      );

      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- DELETE account -----------

  // Delete a account by its id
  async deleteAccountById(id) {

    try {

      if (!id) {
        throw new Error('L\'identifiant du compte est manquant.');
      }

      await pool.query('DELETE FROM "account" WHERE id = $1;', [id]);
      return true;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default accountDataMapper;