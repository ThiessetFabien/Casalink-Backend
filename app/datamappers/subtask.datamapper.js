/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import pool from './connexion.js';
import DbError from '../errors/dbError.js';

const subtaskDataMapper = {

  // ----------- FIND SUBTASK -----------
  async findSubtaskById(id) {
    try {
      const result = await pool.query('SELECT * FROM "subtask" WHERE id=$1;', [id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findSubtasksByTaskId(task_id) {
    try {
      if (!task_id) {
        throw new Error('L\'identifiant de la tache est manquant.');
      }
      const result = await pool.query(`SELECT "subtask".* 
            FROM "subtask" 
          JOIN "task" ON "task".id = "subtask".task_id 
        WHERE "task".id = $1;
      `, [task_id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE SUBTASKT -----------
  async createSubtask(subtaskData) {
    try {
      if (!subtaskData) {
        throw new Error('Les données de la sous-tache sont manquantes.');
      }
      const { description, name, task_id } = subtaskData;
      const result = await pool.query(
        'INSERT INTO "subtask" (description, name, task_id) VALUES ($1, $2, $3) RETURNING *;',
        [description, name, task_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- UPDATE SUBTASK -----------
  async updateSubtask(id, subtaskData) {
    try {
      if (!id || !subtaskData) {
        throw new Error('Les données de la sous-tache ou l\'identifiant sont manquants.');
      }
      const { description, name, task_id } = subtaskData;

      const result = await pool.query(
        'UPDATE "subtask" SET description = $1, name = $2, task_id = $3 WHERE id = $4 RETURNING *;',
        [description, name, task_id, id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- DELETE subtask -----------
  async deleteSubtaskById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant de la sous-tache est manquant.');
      }
      await pool.query('DELETE FROM "subtask" WHERE id = $1;', [id]);
      return true;
    } catch (error) {
      throw new DbError(error.message);
    }
  },
};

export default subtaskDataMapper;
