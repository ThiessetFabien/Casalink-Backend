import pool from "./connexion.js";
import DbError from "../errors/dbError.js";

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


  // ----------- CREATE USER -----------

  // Create a new user
  async createUser(userData) {

    try {
      
      if (!userData) {
        throw new Error('Les données du user sont manquantes.');
      }

      const { email, firstname, lastname, birthdate, role, pin, score, password, home_id } = userData;
      
      const result = await pool.query(
        'INSERT INTO "user" (email, firstname, lastname, birthdate, role, pin, score, password, home_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;',
        [email, firstname, lastname, birthdate, role, pin, score, password, home_id]
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

      const { email, firstname, lastname, birthdate, role, pin, score, password, home_id } = userData;
      
      const result = await pool.query(
        'UPDATE "user" SET email = $1, firstname = $2, lastname = $3, birthdate = $4, role = $5, pin = $6, score = $7, password = $8, home_id = $9 WHERE id = $10 RETURNING *;',
        [ email, firstname, lastname, birthdate, role, pin, score, password, home_id, id]
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