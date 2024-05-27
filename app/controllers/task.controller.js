import ApiError from '../errors/api.error.js';
import taskDataMapper from '../datamappers/task.datamapper.js'

const taskController = {

  // QUERY GET
  getAllTasks: async (_, res) => {
    const tasks = await taskDataMapper.findAllTask()
    return res.json({ status: 'success', data: { tasks } });
  },

  getTaskById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant de la tâche est incorrect."));
    }
    const task = await taskDataMapper.findTaskById(id);
    if(!task) {
      return next(new ApiError(404, "La tâche n'existe pas."));
    }
    return res.json({ status: 'success', data: { task } });
  },

  getTaskByProfileId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant du compte est incorrect."));
    }
    const tasks = await taskDataMapper.findTaskByProfileId(id);
    if (!tasks[0]) {
      return next(new ApiError(404, "Aucune tâche n'a été trouvée."));
    }
    return res.json({ status: 'success', data: { tasks } });
  },

  // QUERY POST
  createOneTask: async (req, res, next) => {
    const taskData = req.body;
    const { name, start_date } = taskData;
    if (!name || !start_date) {
      return next(new ApiError(400, 'Les données de la tâche sont incorrectes.'));
    }
    const task = await taskDataMapper.createTask(taskData);
    return res.json({ status: 'success', data: { task } });
  },

  updateOneTask: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant de la tâche est incorrect."));
    }
    const newTaskData = req.body;
    if (!newTaskData) {
      return next(new ApiError(400, 'Le nom et la date de début de la tâche sont incorrectes.'));
    }
    const currentTask = await taskDataMapper.findTaskById(id)
    if (!currentTask) {
      return next(new ApiError(404, "La tâche n'existe pas."));
    }

    const updateTaskData = { ...currentTask, ...newTaskData };

    const task = await taskDataMapper.updateTask(id, updateTaskData)
    
    res.json({ status: 'success', data: { task } });
  },

  deleteOneTask: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant de la tâche est incorrect."));
    }
    const currentTask = await taskDataMapper.findTaskById(id);
    if (!currentTask) {
      return next(new ApiError(404, "La tâche n'existe pas."));
    }
    await taskDataMapper.deleteTaskById(id)
    res.json({ status: 'success', message: 'La tache a bien été supprimée' });
  }
}

export default taskController;