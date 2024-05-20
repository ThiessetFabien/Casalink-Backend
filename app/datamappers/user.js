import pool from "./connexion.js";
import DbError from "../errors/dbError.js";
import cryptoPassword from '../utils/cryptoPassword.js';

const userDataMapper = {

// ----------- FIND USER -----------

  // Find all the Users
  async findAllUsers(){
    
    try {
    
      const result = await pool.query('SELECT * FROM "user";');
      
      return result.rows;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a user by its id
  async findUserById(id){
    
    try {
    
      if (!id) {
        throw new Error('L\'identifiant du user est manquant.');
      }

      const result = await pool.query('SELECT * FROM "user" WHERE id=$1;', [id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

    // Find a user by its id without its password
    async findUserByIdWithoutPassword(id){
    
      try {
      
        if (!id) {
          throw new Error('L\'identifiant du user est manquant.');
        }
  
        const result = await pool.query('SELECT id, email, firstname, lastname, role, home_id FROM "user" WHERE id = $1', [id]);
      
        return result.rows[0];
      
      } catch (error) {
        throw new DbError(error.message);
      }
    },

  // Find a User by its id
  async findUsersByHomeId(home_id){
      
    try {
    
      if (!home_id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }

      const result = await pool.query('SELECT * FROM "user" WHERE home_id = $1;', [home_id]);
    
      return result.rows;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  findUserByEmail: async (email) => {
    try {
      if (!email) {
        throw new Error('L\'email est manquant.');
      }

      const result = await pool.query('SELECT * FROM "user" WHERE email = $1;', [email]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- CREATE USER -----------

  // Create a new user
  async createUser(userData) {

    try {
      
      if (!userData) {
        throw new Error('Les données du user sont manquantes.');
      }

      const { email, firstname, lastname, role, password, home_id } = userData;
      
      const hashedPassword = await cryptoPassword.hash(password);

      const result = await pool.query(
        'INSERT INTO "user" (email, firstname, lastname, role, password, home_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
        [email, firstname, lastname, role, hashedPassword, home_id]
      );

      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE USER -----------

  async updateUser(id, userData) {
    try {

      if (!id || !userData) {
        throw new Error('Les données du user ou l\'identifiant sont manquants.');
      }

      const { email, firstname, lastname, role, password, home_id } = userData;
      
      const hashedPassword = await cryptoPassword.hash(password);
      
      const result = await pool.query(
        'UPDATE "user" SET email = $1, firstname = $2, lastname = $3, role = $4, password = $5, home_id = $6 WHERE id = $7 RETURNING *;',
        [ email, firstname, lastname, role, hashedPassword, home_id, id]
      );

      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- DELETE USER -----------

  // Delete a user by its id
  async deleteUserById(id) {

    try {

      if (!id) {
        throw new Error('L\'identifiant du user est manquant.');
      }

      await pool.query('DELETE FROM "user" WHERE id = $1;', [id]);
      return true;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default userDataMapper;