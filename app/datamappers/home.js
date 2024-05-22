import pool from "./connexion.js";
import DbError from "../errors/dbError.js";

const homeDataMapper = {

// ----------- FIND HOME -----------
  // Find all the Homes
  async findAllHomes(){
    try {
      const result = await pool.query('SELECT * FROM "home";');
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a home by its id
  async findHomeById(id){
    try {
      if (!id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }
      const result = await pool.query('SELECT * FROM "home" WHERE id=$1;', [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a home by its user_id
  async findHomeByUserId(user_id){
    try {
      if (!user_id) {
        throw new Error('L\'identifiant du user est manquant.');
      }
      const result = await pool.query('SELECT * FROM "home" JOIN "user" ON "user".home_id = "home".id WHERE "user".id=$1;', [user_id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- CREATE HOME -----------
  // Create a new home
  async createHome(homeData) {
    try {
      if (!homeData) {
        throw new Error('Les données du foyer sont manquantes.');
      }
      const { shopping_list, name } = homeData;
      const result = await pool.query(
        'INSERT INTO "home" (shopping_list, name) VALUES ($1, $2) RETURNING *;',
        [shopping_list, name]
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE HOME -----------
  async updateHome(id, homeData) {
    try {
      if (!id || !homeData) {
        throw new Error('Les données du foyer ou l\'identifiant sont manquants.');
      }
      const { shopping_list, name } = homeData;
      const result = await pool.query(
        'UPDATE "home" SET shopping_list = $1, name = $2 WHERE id = $3 RETURNING *;',
        [shopping_list, name, id]
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE HOME -----------
  // Delete a home by its id
  async deleteHomeById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant du foyer est manquant.');
      }
      await pool.query('DELETE FROM "home" WHERE id = $1;', [id]);
      return true;
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default homeDataMapper;