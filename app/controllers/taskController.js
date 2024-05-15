import { findAllTask, findTaskById, findTaskByUserId, createTask, updateTask, deleteTaskById } from '../datamappers/task'


const taskController = {

  // REQUETE GET
  getAlltasks: async (req, res) => {
    try {
      const tasks = await findAllTask()
      res.json({ status: 'success', data: { tasks } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  getTaskById: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await findTaskById(id)

      if(!task) {
        res.status(404).send('Cette tache n\'existe pas')
      }

      res.json({ status: 'success', data: { task } });
  
    } catch(error) {
  
      return res.status(500).json({ status: 'error', message: error.message });
  
    }
  },

  getTaskByUserId: async (req, res) => {
    try {
      const id = req.params.id;
      const tasks = await findTaskByUserId(id)

      if(!tasks) {
        res.status(404).send('Ces taches n\'existe pas')
      }

      res.json({ status: 'success', data: { tasks } });
  
    } catch(error) {
  
      return res.status(500).json({ status: 'error', message: error.message });
  
    }
  },
 
  // QUERY POST
  createOneTask: async (req, res) => {
    try {
      const taskData = req.body;
      const task = await createTask(taskData)
      res.json({ status: 'success', data: { task } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  updateOneTask: async (req, res) => {
    try {
      const id = req.params.id;
      const taskData = req.body;
      const task = await updateTask(id, taskData)
      res.json({ status: 'success', data: { task } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  deleteOneTask: async (req, res) => {
    try {
      const id = req.params.id;
      await deleteTaskById(id)
      res.json({ status: 'success', message: 'La tache a bien été supprimée' });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  }



}

export default taskController;