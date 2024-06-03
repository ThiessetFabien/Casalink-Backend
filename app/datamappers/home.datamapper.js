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
      const result = await pool.query('SELECT * FROM "home" WHERE id = $1;', [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // Find a home by its user_id
  async findHomeByAccountId(user_id){
    try {
      const result = await pool.query(
        `SELECT * FROM "home" 
          JOIN "user" ON "user".home_id = "home".id 
          WHERE "user".id=$1;`,
          [user_id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- CREATE HOME -----------
  // Create a new home
  async createHome(name) {
    try {
      const result = await pool.query(
        'INSERT INTO "home" (name) VALUES ($1) RETURNING *;',
        [name]
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE HOME -----------
  async updateHome(id, homeData) {
    try {
      const { shopping_list, name } = homeData;
      const result = await pool.query(
        `UPDATE "home" SET shopping_list = $1, name = $2 
          WHERE id = $3 RETURNING *;`,
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
      await pool.query('DELETE FROM "home" WHERE id = $1;', [id]);
      return true;
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default homeDataMapper;