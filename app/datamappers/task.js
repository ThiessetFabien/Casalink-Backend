import client from "./connexion";

const taskDataMapper = {

// ----------- FIND TASK -----------

  // Find all the tasks
  async findAllTask(){
    
    try {
    
      const result = await client.query('SELECT * FROM "task";');
      
      return result.rows;
    
    } catch (error) {
      console.error('Erreur lors de la rechercher des tâches :', error);
      throw error;
    }
  },

  // Find a task by its id
  async findTaskById(id){
    
    try {
    
      if (!id) {
        throw new Error('L\'identifiant de la tâche est manquant.');
      }

      const result = await client.query('SELECT * FROM "task" WHERE id=$1;', [id]);
    
      return result.rows[0];
    
    } catch (error) {
    console.error('Erreur lors de la recherche de la tâche par ID :', error);
    throw error;
    }
  },

  // All the tasks of a specific user
  async findTaskByUserId(userId){
    
    try {
    
      if (!userId) {
        throw new Error('L\'identifiant du user est manquant.');
      }

      const result = await client.query('SELECT * FROM "task" JOIN user_has_task ON task.id = user_has_task.task_id WHERE user_has_task.user_id = $1;', [userId]);
    
      return result.rows;
    
    } catch (error) {
      console.error('Erreur lors de la recherche des tâches par user ID :', error);
      throw error;
    }
  },


  // ----------- CREATE TASK -----------

  // Create a new task
  async createTask(taskData) {

    try {

      if (!taskData) {
        throw new Error('Les données de la tâche sont manquantes.');
      }

      const { name, start_date, end_date, reward_point, priority, status, description, category_id } = taskData;
      
      const result = await client.query(
        'INSERT INTO "task" (name, start_date, end_date, reward_point, priority, status, description, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
        [name, start_date, end_date, reward_point, priority, status, description, category_id]
      );

      return result.rows[0];
    
    } catch (error) {
      console.error('Erreur lors de la création d\'une nouvelle tâche :', error);
      throw error;
    }
  },

  // ----------- UPDATE TASK -----------

  async updateTask(id, taskData) {
    try {

      if (!id || !taskData) {
        throw new Error('L\'identifiant ou les données de la tâche sont manquants.');
      }

      const { name, start_date, end_date, reward_point, priority, status, description, category_id } = taskData;
      
      const result = await client.query(
        'UPDATE "task" SET name = $1, start_date = $2, end_date = $3, reward_point = $4, priority = $5, status = $6, description = $7, category_id = $8 WHERE id = $9 RETURNING *;',
        [name, start_date, end_date, reward_point, priority, status, description, category_id, id]
      );

      return result.rows[0];
      
    
    } catch (error) {
      console.error('Erreur lors de la modification de la tâche :', error);
      throw error;
    }
  },


  // ----------- DELETE TASK -----------

  // Delete a task by its id
  async deleteTaskById(id) {

    try {

      if (!id) {
        throw new Error('L\'identifiant de la tâche est manquant.');
      }

      await client.query('DELETE FROM "task" WHERE id = $1;', [id]);
      return true;
    
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche par ID :', error);
      throw error;
    }
  }
}

export default taskDataMapper;