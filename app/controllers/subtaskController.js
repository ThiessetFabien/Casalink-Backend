import subtaskDataMapper from '../datamappers/subtask.js'
import controllerWrapper from '../middlewares/controller.wrapper.js';

const subtaskController = {

  // REQUETE GET

  getSubtaskById: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const subtask = await subtaskDataMapper.findSubtaskById(id)

    if(!subtask) {
      res.status(404).send('Cette sous-tache n\'existe pas')
    }

    res.json({ status: 'success', data: { subtask } });
  
  }),

  getSubtaskByTaskId: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const subtasks = await subtaskDataMapper.findSubtasksByTaskId(id)

    if(!subtasks) {
      res.status(404).send('Ces sous-taches n\'existent pas')
    }

    res.json({ status: 'success', data: { subtasks } });

  }),
 
  // QUERY POST
  createOneSubtask: controllerWrapper(async (req, res) => {

    const subtaskData = req.body;
    const subtask = await subtaskDataMapper.createSubtask(subtaskData)
    res.json({ status: 'success', data: { subtask } });

  }),

  updateOneSubtask: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const subtaskData = req.body;
    const subtask = await subtaskDataMapper.updateSubtask(id, subtaskData)
    res.json({ status: 'success', data: { subtask } });

  }),

  deleteOneSubtask: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    await subtaskDataMapper.deleteSubtaskById(id)
    res.json({ status: 'success', message: 'La sous-tache a bien été supprimée' });

  })

}

export default subtaskController;