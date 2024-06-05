/* eslint-disable import/extensions */
import pool from './connexion.js';
import DbError from '../errors/dbError.js';

const categoryDataMapper = {

  // ----------- FIND CATEGORY -----------
  async findAllCategory() {
    try {
      const result = await pool.query('SELECT * FROM "category";');
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findCategoryById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant de la categorie est manquant.');
      }
      const result = await pool.query('SELECT * FROM "category" WHERE id=$1;', [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findCategoryByTaskId(taskId) {
    try {
      if (!taskId) {
        throw new Error('L\'identifiant de la tache est manquant.');
      }
      const result = await pool.query(
        `SELECT * 
          FROM "category" 
        JOIN "task" ON "category".id = "task".category_id 
          WHERE "task".id = $1;`,
        [taskId],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE CATEGORY -----------
  async createCategory(categoryData) {
    try {
      if (!categoryData) {
        throw new Error('Les données de la categorie sont manquantes.');
      }
      const { name, color } = categoryData;
      const result = await pool.query(
        'INSERT INTO "category" (name, color) VALUES ($1, $2) RETURNING *;',
        [name, color],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE CATEGORY -----------
  async updateCategory(id, categoryData) {
    try {
      if (!id || !categoryData) {
        throw new Error('L\'identifiant ou les données de la category sont manquants.');
      }
      const { name, color } = categoryData;
      const result = await pool.query(
        'UPDATE "category" SET name = $1, color = $2 WHERE id = $3 RETURNING *;',
        [name, color, id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE CATEGORY -----------
  async deleteCategoryById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant de la categorie est manquant.');
      }
      await pool.query('DELETE FROM "category" WHERE id = $1;', [id]);
      return true;
    } catch (error) {
      throw new DbError(error.message);
    }
  },
};

export default categoryDataMapper;
