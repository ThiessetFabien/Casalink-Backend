/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable radix */
import ApiError from '../errors/api.error.js';
import taskDataMapper from '../datamappers/task.datamapper.js';

const taskController = {

  // QUERY GET
  getAllTasks: async (_, res) => {
    const tasks = await taskDataMapper.findAllTask();
    return res.json({ status: 'success', data: { tasks } });
  },

  getTaskById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant de la tâche est incorrect."));
    }
    const task = await taskDataMapper.findTaskById(id);
    if (!task) {
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

  getTaskByAccountId: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, "L'identifiant du compte est incorrect."));
    }
    const tasks = await taskDataMapper.findAllTaskByAccountId(id);
    if (!tasks[0]) {
      return next(new ApiError(404, "Aucune tâche n'a été trouvée."));
    }
    return res.json({ status: 'success', data: { tasks } });
  },

  // QUERY POST
  createOneTaskByAccountId: async (req, res, next) => {
    const taskData = req.body;
    const { id: account_id } = req.params;
    const { name, start_date } = taskData;
    if (!name || !start_date) {
      return next(new ApiError(400, 'Les données de la tâche sont incorrectes.'));
    }
    const task = await taskDataMapper.createTaskByAccountId(taskData, account_id);
    return res.json({ status: 'success', data: { task } });
  },

  createOneTaskByProfileId: async (req, res, next) => {
    const taskData = req.body;
    const { id: profile_id } = req.params;
    const { name, start_date, account_id } = taskData;
    if (!name || !start_date || !account_id) {
      return next(new ApiError(400, 'Les données de la tâche sont incorrectes.'));
    }
    const task = await taskDataMapper.createTaskByProfileId(taskData, profile_id, account_id);
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
    const currentTask = await taskDataMapper.findTaskById(id);
    if (!currentTask) {
      return next(new ApiError(404, "La tâche n'existe pas."));
    }

    const updateTaskData = { ...currentTask, ...newTaskData };

    const task = await taskDataMapper.updateTask(id, updateTaskData);

    res.json({ status: 'success', data: { task } });
  },
  validateTask: async (req, res, next) => {
    const { id: task_id } = req.params;
    const { profile_role } = req.body;

    try {
      const task = await taskDataMapper.findTaskById(task_id);
      if (!task) {
        return next(new ApiError(404, "La tâche n'existe pas."));
      }

      if (profile_role === 'child') {
        try {
          const updatedTask = await taskDataMapper.validateTaskByChild(task_id);
          if (!updatedTask) {
            return next(new ApiError(500, 'La validation de la tâche par un enfant a échoué.'));
          }
          return res.json({ status: 'success', message: 'La tâche a été validée avec succès.' });
        } catch (error) {
          return next(new ApiError(500, 'Une erreur est survenue lors de la validation de la tâche par un enfant.', error));
        }
      }

      if (profile_role === 'adult') {
        try {
          const updatedTask = await taskDataMapper.validateTaskByAdult(task_id);
          if (!updatedTask) {
            return next(new ApiError(500, 'La validation de la tâche par un adulte a échoué.'));
          }
          return res.json({ status: 'success', message: 'La validation par un adulte a été effectuée avec succès.' });
        } catch (error) {
          return next(new ApiError(500, 'Une erreur est survenue lors de la validation de la tâche par un adulte.', error));
        }
      }
      return next(new ApiError(400, 'Le rôle du profil doit être soit "child" soit "adult".'));
    } catch (error) {
      return next(new ApiError(500, 'Une erreur est survenue lors de la validation de la tâche.', error));
    }
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
    await taskDataMapper.deleteTaskById(id);
    res.json({ status: 'success', message: 'La tache a bien été supprimée' });
  },
};

export default taskController;
