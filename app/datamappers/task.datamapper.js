/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import pool from './connexion.js';
import DbError from '../errors/dbError.js';

const taskDataMapper = {
  async validateTaskByChild(task_id) {
    try {
      // Vérifier si la tâche existe
      const taskResult = await pool.query('SELECT * FROM task WHERE id = $1;', [task_id]);
      const task = taskResult.rows[0];
      if (!task) {
        throw new Error('La tâche spécifiée n\'existe pas.');
      }

      // Mettre à jour la tâche avec la validation par l'enfant
      const result = await pool.query(
        `UPDATE task
         SET status = 'Validée par un enfant'
         WHERE id = $1
         RETURNING *;`,
        [task_id],
      );
      // Mettre à jour la table profile_has_task avec validated_child = true
      await pool.query(
        `UPDATE profile_has_task
         SET validated_by_child = true
         WHERE task_id = $1;`,
        [task_id],
      );

      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },
  async validateTaskByAdult(task_id) {
    try {
      // Vérifier si la tâche existe
      const taskResult = await pool.query('SELECT * FROM task WHERE id = $1;', [task_id]);
      const task = taskResult.rows[0];

      if (!task) {
        throw new Error('La tâche spécifiée n\'existe pas.');
      }

      // Vérifier si la tâche a été validée par un child
      const validation = await pool.query('SELECT validated_by_child FROM profile_has_task WHERE task_id = $1;', [task_id]);

      if (!validation || !validation.rows.length || !validation.rows[0].validated_by_child) {
        throw new Error('La tâche doit d\'abord être validée par un enfant.');
      }

      // Mettre à jour la tâche avec la validation par un adulte
      const result = await pool.query(
        `UPDATE task
         SET status = 'Confirmée par un adulte'
         WHERE id = $1
         RETURNING *;`,
        [task_id],
      );

      // Mettre à jour la table profile_has_task avec validated_adult = true
      await pool.query(
        `UPDATE profile_has_task
         SET validated_by_adult = true
         WHERE task_id = $1;`,
        [task_id],
      );

      // Retourner la tâche mise à jour
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- FIND TASK -----------
  async findAllTask() {
    try {
      const result = await pool.query(
        `SELECT 
          t.*, 
          p.role, 
          p.id AS profile_id
        FROM 
          task t
        LEFT JOIN 
          profile_has_task pht ON t.id = pht.task_id
        LEFT JOIN 
          profile p ON pht.profile_id = p.id
        ORDER BY 
          t.id ASC;`,
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findAllTaskByAccountId(account_id) {
    try {
      const result = await pool.query(
        `SELECT DISTINCT ON (t.id)
           t.id AS task_id,
           t.name AS task_name,
           t.start_date AS task_start_date,
           t.end_date AS task_end_date,
           t.reward_point AS task_reward_point,
           t.priority AS task_priority,
           t.status AS task_status,
           t.description AS task_description,
           COALESCE(p.role, 'unassigned') AS profile_role,
           p.name AS profile_name,
           validated_by_child,
           validated_by_adult
         FROM 
           task t
         LEFT JOIN 
           profile_has_task pht ON t.id = pht.task_id
         LEFT JOIN 
           profile p ON pht.profile_id = p.id
         WHERE 
           t.account_id = $1;`,
        [account_id],
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findTaskById(id) {
    try {
      const result = await pool.query('SELECT * FROM task WHERE id =$1;', [id]);
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async findTaskByProfileId(id) {
    try {
      const result = await pool.query(
        `SELECT 
            p.id AS profile_id,
            p.name AS profile_name,
            p.role AS profile_role,
            t.id AS task_id,
            t.name AS task_name,
            t.start_date AS task_start_date,
            t.end_date AS task_end_date,
            t.reward_point AS task_reward_point,
            t.priority AS task_priority,
            t.status AS task_status,
            t.description AS task_description,
            validated_by_child,
            validated_by_adult
          FROM 
            profile p
          JOIN 
            profile_has_task pht ON p.id = pht.profile_id
          JOIN 
            task t ON pht.task_id = t.id
          WHERE 
            p.id = $1;`,
        [id],
      );
      return result.rows;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  // ----------- CREATE TASK -----------
  async createTaskByProfileId(taskData, profile_id, account_id) {
    try {
      const {
        name, start_date, end_date, reward_point, priority, status, description,
      } = taskData;
      const result = await pool.query(
        `WITH new_task AS (
          INSERT INTO task 
          (name, start_date, end_date, reward_point, priority, status, description, account_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id
        ), 
        profile_task AS (
          INSERT INTO profile_has_task (profile_id, task_id)
          VALUES ($9, (SELECT id FROM new_task))
        )
        SELECT * FROM new_task;`,
        [name, start_date, end_date, reward_point, priority, status, description, account_id, profile_id],
      );
      const newTask = result.rows[0];
      return newTask;
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async createTaskByAccountId(taskData, account_id) {
    try {
      const {
        name, start_date, end_date, reward_point, priority, status, description, category_id,
      } = taskData;
      const accountExists = await pool.query(
        'SELECT 1 FROM "account" WHERE "id" = $1',
        [account_id],
      );
      if (accountExists.rowCount === 0) {
        throw new DbError('Le compte spécifié n\'existe pas.');
      }
      const result = await pool.query(
        `INSERT INTO "task" 
        ("name", "start_date", "end_date", "reward_point", "priority", "status", "description", "category_id", "account_id")
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [name, start_date, end_date, reward_point, priority, status, description, category_id, account_id],
      );
      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },

  async updateTask(id, taskData) {
    try {
      if (!id || !taskData) {
        throw new Error('L\'identifiant ou les données de la tâche sont manquants.');
      }

      const currentTaskResult = await pool.query('SELECT * FROM "task" WHERE id = $1;', [id]);
      const currentTask = currentTaskResult.rows[0];

      if (!currentTask) {
        throw new Error('La tâche n\'existe pas.');
      }

      const {
        name = currentTask.name,
        start_date = currentTask.start_date,
        end_date = currentTask.end_date,
        reward_point = currentTask.reward_point,
        priority = currentTask.priority,
        status = currentTask.status,
        description = currentTask.description,
        profile_id,
      } = taskData;

      const result = await pool.query(
        `UPDATE task
        SET name = $1,
            start_date = $2,
            end_date = $3,
            reward_point = $4,
            priority = $5,
            status = $6,
            description = $7,
            updated_at = NOW()
        WHERE id = $8
        RETURNING *;`,
        [name, start_date, end_date, reward_point, priority, status, description, id],
      );

      if (profile_id !== null && profile_id !== undefined) {
        await pool.query(
          `DELETE FROM "profile_has_task"
        WHERE task_id = $1;`,
          [id],
        );

        await pool.query(
          `INSERT INTO "profile_has_task" (profile_id, task_id)
        VALUES ($1, $2);`,
          [profile_id, id],
        );
      }

      return result.rows[0];
    } catch (error) {
      throw new DbError(error.message);
    }
  },
  // ----------- DELETE TASK -----------
  async deleteTaskById(id) {
    try {
      if (!id) {
        throw new Error('L\'identifiant de la tâche est manquant.');
      }
      const result = await pool.query('DELETE FROM "task" WHERE id = $1;', [id]);
      return { success: result.rowCount > 0 };
    } catch (error) {
      throw new DbError(error.message);
    }
  },
};

export default taskDataMapper;