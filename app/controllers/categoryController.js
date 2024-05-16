import categoryDataMapper from '../datamappers/category.js'
import controllerWrapper from '../middlewares/controller.wrapper.js';

const categoryController = {

  // REQUETE GET

  getCategoryById: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const category = await categoryDataMapper.findCategoryById(id)

    if(!category) {
      res.status(404).send('Cette category n\'existe pas')
    }

    res.json({ status: 'success', data: { category } });
  
  }),

  getCategoryByTaskId: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const category = await categoryDataMapper.findCategoryByTaskId(id)

    if(!category) {
      res.status(404).send('Cette categorie n\'existe pas')
    }

    res.json({ status: 'success', data: { category } });

  }),
 
  // QUERY POST
  createOneCategory: controllerWrapper(async (req, res) => {

    const categoryData = req.body;
    const category = await categoryDataMapper.createCategory(categoryData)
    res.json({ status: 'success', data: { category } });

  }),

  updateOneCategory: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    const categoryData = req.body;
    const category = await categoryDataMapper.updateCategory(id, categoryData)
    res.json({ status: 'success', data: { category } });

  }),

  deleteOneCategory: controllerWrapper(async (req, res) => {

    const id = req.params.id;
    await categoryDataMapper.deleteCategoryById(id)
    res.json({ status: 'success', message: 'La categorie a bien été supprimée' });

  })

}

export default categoryController;