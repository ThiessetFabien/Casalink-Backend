import taskDataMapper from '../datamappers/task.js'


const taskController = {

  // REQUETE GET
  getAlltasks: async (req, res) => {
    try {
      const tasks = await taskDataMapper.findAllTask()
      res.json({ status: 'success', data: { tasks } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  getTaskById: async (req, res) => {
    try {
      const id = req.params.id;
      const task = await taskDataMapper.findTaskById(id)

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
      const tasks = await taskDataMapper.findTaskByUserId(id)

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
      const task = await taskDataMapper.createTask(taskData)
      res.json({ status: 'success', data: { task } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  updateOneTask: async (req, res) => {
    try {
      const id = req.params.id;
      const taskData = req.body;
      const task = await taskDataMapper.updateTask(id, taskData)
      res.json({ status: 'success', data: { task } });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  },

  deleteOneTask: async (req, res) => {
    try {
      const id = req.params.id;
      await taskDataMapper.deleteTaskById(id)
      res.json({ status: 'success', message: 'La tache a bien été supprimée' });

    } catch(error) {

      return res.status(500).json({ status: 'error', message: error.message });

    }
  }



}

export default taskController;