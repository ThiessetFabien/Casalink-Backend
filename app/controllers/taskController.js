import taskDataMapper from '../datamappers/task.js'
import controllerWrapper from '../middlewares/controller.wrapper.js';

const taskController = {

  // REQUETE GET
  getAllTasks: controllerWrapper(async (req, res) => {

    const tasks = await taskDataMapper.findAllTask()
    res.json({ status: 'success', data: { tasks } });

  }),

  getTaskById: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const task = await taskDataMapper.findTaskById(id)

    if(!task) {
      res.status(404).send('Cette tache n\'existe pas')
    }

    res.json({ status: 'success', data: { task } });
  
  }),

  getTaskByUserId: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const tasks = await taskDataMapper.findTaskByUserId(id)

    if(!tasks) {
      res.status(404).send('Ces taches n\'existe pas')
    }

    res.json({ status: 'success', data: { tasks } });

  }),
 
  // QUERY POST
  createOneTask: controllerWrapper(async (req, res) => {

    const taskData = req.body;
    const task = await taskDataMapper.createTask(taskData)
    res.json({ status: 'success', data: { task } });

  }),

  updateOneTask: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const taskData = req.body;
    const task = await taskDataMapper.updateTask(id, taskData)
    res.json({ status: 'success', data: { task } });

  }),

  deleteOneTask: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    await taskDataMapper.deleteTaskById(id)
    res.json({ status: 'success', message: 'La tache a bien été supprimée' });

  })

}

export default taskController;