/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable import/extensions */
import ApiError from '../errors/api.error.js';
import subtaskDataMapper from '../datamappers/subtask.datamapper.js';

const subtaskController = {

  // QUERY GET

  getSubtaskById: async (req, res, next) => {
    const { id } = req.params;
    if (!parseInt(id)) {
      return next(new ApiError(401, 'L\'identifiant de la sous-tâche est incorrect.'));
    }
    const subtask = await subtaskDataMapper.findSubtaskById(id);
    console.log('subtask', subtask);
    if (!subtask[0]) {
      return next(new ApiError(404, 'La sous-tâche n\'existe pas.'));
    }
    res.json({ status: 'success', data: { subtask } });
  },

  getSubtaskByTaskId: async (req, res) => {
    const { id } = req.params;
    const subtasks = await subtaskDataMapper.findSubtasksByTaskId(id);
    if (!subtasks) {
      res.status(404).send('Ces sous-taches n\'existent pas');
    }
    res.json({ status: 'success', data: { subtasks } });
  },

  // QUERY POST
  createOneSubtask: async (req, res) => {
    const subtaskData = req.body;
    const subtask = await subtaskDataMapper.createSubtask(subtaskData);
    res.json({ status: 'success', data: { subtask } });
  },

  updateOneSubtask: async (req, res, next) => {
    const { id } = req.params;
    const newSubtaskData = req.body;

    const currentSubtask = await subtaskDataMapper.findSubtaskById(id);

    if (!currentSubtask) {
      return next(new ApiError(404, "La sous-tâche n'existe pas."));
    }

    const updateSubtaskData = { ...currentSubtask, ...newSubtaskData };

    const subtask = await subtaskDataMapper.updateSubtask(id, updateSubtaskData);
    res.json({ status: 'success', data: { subtask } });
  },

  deleteOneSubtask: async (req, res) => {
    const { id } = req.params;
    await subtaskDataMapper.deleteSubtaskById(id);
    res.json({ status: 'success', message: 'La sous-tache a bien été supprimée' });
  },
};

export default subtaskController;
