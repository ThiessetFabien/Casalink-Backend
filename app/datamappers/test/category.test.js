/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import categoryData from '../category.datamapper.js';

describe('Casalink generates the list of category', () => {
  it('should return a list of categorys', async () => {
    const categoryList = await categoryData.findAllCategory();
    expect(categoryList).to.be.an('array');
    categoryList.forEach((category) => {
      expect(category).to.have.property('name');
      expect(category).to.have.property('color');
    });
  });

  it('should return a category by ID', async () => {
    const categoryId = 1;
    const category = await categoryData.findCategoryById(categoryId);
    expect(category).to.be.an('object');
    expect(category).to.have.property('name');
    expect(category).to.have.property('color');
  });

  it('should create a new category', async () => {
    const newcategory = {
      name: 'OColor',
      color: 'Fab',
    };
    const category = await categoryData.createCategory(newcategory);
    expect(category).to.be.an('object');
  });

  it('should update a category', async () => {
    const categoryId = 4;
    const updatecategory = {
      name: 'OColor',
      color: 'Fab00',
    };
    const category = await categoryData.updateCategory(categoryId, updatecategory);
  });

  it('should delete a category', async () => {
    const categoryId = 4;
    const result = await categoryData.deleteCategoryById(categoryId);
    expect(result).to.be.true;
  });
});
