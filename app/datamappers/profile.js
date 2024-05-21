import pool from "./connexion.js";
import DbError from "../errors/dbError.js";

const profilDataMapper = {

// ----------- FIND profile -----------

  // Find a profile by its id
  async findProfileById(id){
    
    try {
    
      if (!id) {
        throw new Error('L\'identifiant du profil est manquant.');
      }

      const result = await pool.query('SELECT * FROM "profile" WHERE id=$1;', [id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  

  // Find a profile by its account_id
  async findProfileByAccountId(account_id){
      
    try {
    
      if (!account_id) {
        throw new Error('L\'identifiant du compte est manquant.');
      }

      const result = await pool.query('SELECT * FROM "profile" WHERE account_id = $1;', [account_id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a profile by its home_id
  async findProfileByHomeId(home_id){
      
    try {
    
      if (!home_id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }

      const result = await pool.query('SELECT * FROM "profile" JOIN "account" ON "profile".account_id = "account".id WHERE "account".home_id = $1;', [home_id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE PROFILE -----------

  // Create a new profile
  async createProfile(profileData) {

    try {
      
      if (!profileData) {
        throw new Error('Les données du profil sont manquantes.');
      }

      const { name, birthdate, role, pin, score, image, email, account_id } = profileData;
      
      const result = await pool.query(
        'INSERT INTO "profile" (name, role, pin, score, birthdate, image, email, account_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
        [name, birthdate, role, pin, score, image, email, account_id]
      );

      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE PROFILE -----------

  async updateProfile(id, profileData) {
    try {

      if (!id || !profileData) {
        throw new Error('Les données du profil ou l\'identifiant sont manquants.');
      }

      const { name, birthdate, role, pin, score, image, email, account_id } = profileData;
      
      const result = await pool.query(
        'UPDATE "profile" SET name = $1, birthdate = $2, role = $3, pin = $4, score = $5, image = $6, account_id = $7 WHERE id = $8 RETURNING *;',
        [name, birthdate, role, pin, score, image, email, account_id, id]
      );

      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- DELETE PROFIL -----------

  // Delete a profile by its id
  async deleteProfileById(id) {

    try {

      if (!id) {
        throw new Error('L\'identifiant du profil est manquant.');
      }

      await pool.query('DELETE FROM "profile" WHERE id = $1;', [id]);
      return true;
    
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default profilDataMapper;