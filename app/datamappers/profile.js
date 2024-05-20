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

  

  // Find a profile by its user_id
  async findProfileByUserId(user_id){
      
    try {
    
      if (!user_id) {
        throw new Error('L\'identifiant du user est manquant.');
      }

      const result = await pool.query('SELECT * FROM "profile" WHERE user_id = $1;', [user_id]);
    
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a profile by its home_id
  async findProfileByHomeId(home_id){
      
    try {
    
      if (!home_id) {
        throw new Error('L\'identifiant du user est manquant.');
      }

      const result = await pool.query('SELECT * FROM "profile" JOIN "user" ON "profile".user_id = "user".id WHERE "user".home_id = $1;', [home_id]);
    
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

      const { name, role, pin, score, birthdate, image, user_id } = profileData;
      
      const result = await pool.query(
        'INSERT INTO "profile" (name, role, pin, score, birthdate, image, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
        [name, role, pin, score, birthdate, image, user_id]
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

      const { name, role, pin, score, birthdate, image, user_id } = profileData;
      
      const result = await pool.query(
        'UPDATE "profile" SET name = $1, role = $2, pin = $3, score = $4, birthdate = $5, image = $6, user_id = $7 WHERE id = $8 RETURNING *;',
        [name, role, pin, score, birthdate, image, user_id, id]
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