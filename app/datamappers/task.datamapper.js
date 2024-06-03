import pool from "./connexion.js";
import DbError from "../errors/dbError.js";

const taskDataMapper = {

// ----------- FIND TASK -----------
  // Find all the tasks
  async findAllTask(){
    try {
      const result = await pool.query('SELECT * FROM "task" JOIN "profile_has_task" ON "profile_has_task".task_id = "task".id ORDER BY task.start_date ASC;');
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // find all tasks for the profiles of a specific account
  async findAllTaskByAccountId(account_id) {
    try {
      const result = await pool.query(`
        SELECT 
          tsk.id AS task_id,
          tsk.name AS task_name,
          tsk.start_date AS task_start_date,
          tsk.end_date AS task_end_date,
          tsk.reward_point AS task_reward_point,
          tsk.priority AS task_priority,
          tsk.status AS task_status,
          tsk.description AS task_description
        FROM 
          "task" tsk
        WHERE 
          tsk.account_id = $1;
      `, [account_id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },  

  // Find a task by its id
  async findTaskById(id){
    try {
      const result = await pool.query('SELECT * FROM "task" WHERE id=$1;', [id]);
      console.log(result.rows[0]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // All the tasks of a specific profile
  async findTaskByProfileId(id){
    try {
      const result = await pool.query(`
      SELECT 
        prof.id AS profile_id,
        prof.name AS profile_name,
        tsk.id AS task_id,
        tsk.name AS task_name,
        tsk.start_date AS task_start_date,
        tsk.end_date AS task_end_date,
        tsk.reward_point AS task_reward_point,
        tsk.priority AS task_priority,
        tsk.status AS task_status,
        tsk.description AS task_description
      FROM 
          "profile" prof
      JOIN 
          "profile_has_task" pht ON prof.id = pht.profile_id
      JOIN 
          "task" tsk ON pht.task_id = tsk.id
      WHERE 
          prof.id = $1;`,
         [id]);
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- CREATE TASK -----------

  // Create a new task
  async createTaskByProfileId(taskData, profile_id) {
    try {
      const { name, start_date, end_date, reward_point, priority, status, description, category_id } = taskData;
      
      const result = await pool.query(
        `WITH new_task AS (
            INSERT INTO "task" ("name", "start_date", "end_date", "reward_point", "priority", "status", "description", "category_id")
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
         ),
         profile_task AS (
            INSERT INTO "profile_has_task" ("profile_id", "task_id")
            VALUES ($9, (SELECT id FROM new_task))
         )
         SELECT * FROM new_task;`,
        [name, start_date, end_date, reward_point, priority, status, description, category_id, profile_id]
      );
  
      const newTask = result.rows[0];
      return newTask;
    } catch (error) {
      throw new DbError(error.message);
    }
  }
  ,

  async createTaskByAccountId(taskData, account_id) {
    try {
      const { name, start_date, end_date, reward_point, priority, status, description, category_id } = taskData;
      const accountExists = await pool.query(
        `SELECT 1 FROM "account" WHERE "id" = $1`,
        [account_id]
      );
      if (accountExists.rowCount === 0) {
        throw new DbError('Le compte spécifié n\'existe pas.');
      }
      const result = await pool.query(
        `INSERT INTO "task" ("name", "start_date", "end_date", "reward_point", "priority", "status", "description", "category_id", "account_id")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [name, start_date, end_date, reward_point, priority, status, description, category_id, account_id]
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },
  

  // ----------- UPDATE TASK -----------

  async updateTask(id, taskData) {
    try {

      if (!id || !taskData) {
        throw new Error('L\'identifiant ou les données de la tâche sont manquants.');
      }

      const { name, start_date, end_date, reward_point, priority, status, description, category_id } = taskData;
      
      const result = await pool.query(
        'UPDATE "task" SET name = $1, start_date = $2, end_date = $3, reward_point = $4, priority = $5, status = $6, description = $7, category_id = $8 WHERE id = $9 RETURNING *;',
        [name, start_date, end_date, reward_point, priority, status, description, category_id, id]
      );

      return result.rows[0];
      
    
    } catch (error) {
      throw new DbError(error.message);
    }
  },


  // ----------- DELETE TASK -----------

  // Delete a task by its id
  async deleteTaskById(id) {

    try {

      if (!id) {
        throw new Error('L\'identifiant de la tâche est manquant.');
      }

      const result = await pool.query('DELETE FROM "task" WHERE id = $1;', [id]);
      return result.rows[0];
    
    } catch (error) {
      throw new DbError(error.message);
    }
  }
}

export default taskDataMapper;