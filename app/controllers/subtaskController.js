import subtaskDataMapper from '../datamappers/subtask.js'

const subtaskController = {

  // REQUETE GET

  getSubtaskById: async (req, res) => {

    const id = req.params.id;
    const subtask = await subtaskDataMapper.findSubtaskById(id)

    if(!subtask) {
      res.status(404).send('Cette sous-tache n\'existe pas')
    }

    res.json({ status: 'success', data: { subtask } });
  
  },

  getSubtaskByTaskId: async (req, res) => {

    const id = req.params.id;
    const subtasks = await subtaskDataMapper.findSubtasksByTaskId(id)

    if(!subtasks) {
      res.status(404).send('Ces sous-taches n\'existent pas')
    }

    res.json({ status: 'success', data: { subtasks } });

  },
 
  // QUERY POST
  createOneSubtask: async (req, res) => {

    const subtaskData = req.body;
    const subtask = await subtaskDataMapper.createSubtask(subtaskData)
    res.json({ status: 'success', data: { subtask } });

  },

  updateOneSubtask: async (req, res) => {

    const id = req.params.id;
    const subtaskData = req.body;
    const subtask = await subtaskDataMapper.updateSubtask(id, subtaskData)
    res.json({ status: 'success', data: { subtask } });

  },

  deleteOneSubtask: async (req, res) => {

    const id = req.params.id;
    await subtaskDataMapper.deleteSubtaskById(id)
    res.json({ status: 'success', message: 'La sous-tache a bien été supprimée' });

  }
}

export default subtaskController;