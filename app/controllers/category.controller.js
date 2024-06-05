/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import categoryDataMapper from '../datamappers/category.datamapper.js';

const categoryController = {

  // QUERY GET
  getCategoryById: async (req, res) => {
    const { id } = req.params;
    const category = await categoryDataMapper.findCategoryById(id);
    if (!category) {
      res.status(404).send('Cette category n\'existe pas');
    }
    res.json({ status: 'success', data: { category } });
  },

  getCategoryByTaskId: async (req, res) => {
    const { id } = req.params;
    const category = await categoryDataMapper.findCategoryByTaskId(id);
    if (!category) {
      res.status(404).send('Cette categorie n\'existe pas');
    }
    res.json({ status: 'success', data: { category } });
  },

  // QUERY POST
  createOneCategory: async (req, res) => {
    const categoryData = req.body;
    const category = await categoryDataMapper.createCategory(categoryData);
    res.json({ status: 'success', data: { category } });
  },

  updateOneCategory: async (req, res) => {
    const { id } = req.params;
    const newCategoryData = req.body;
    const currentCategoryData = await categoryDataMapper.findCategoryById(id);
    if (!currentCategoryData) {
      return res.status(404).send('Cette categorie n\'existe pas');
    }
    const updateCategoryData = { ...currentCategoryData, ...newCategoryData };
    const updateCategory = await categoryDataMapper.updateCategory(id, updateCategoryData);
    res.json({ status: 'success', data: { updateCategory } });
  },

  deleteOneCategory: async (req, res) => {
    const { id } = req.params;
    await categoryDataMapper.deleteCategoryById(id);
    res.json({ status: 'success', message: 'La categorie a bien été supprimée' });
  },
};

export default categoryController;
