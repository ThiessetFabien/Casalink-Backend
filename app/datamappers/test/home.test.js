/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import homeData from '../home.datamapper.js';

describe('Casalink generates the list of home', () => {
  it('should return a list of homes', async () => {
    const homeList = await homeData.findAllHomes();
    expect(homeList).to.be.an('array');
    homeList.forEach((home) => {
      expect(home).to.have.property('shopping_list');
      expect(home).to.have.property('name');
    });
  });

  it('should return a home by ID', async () => {
    const homeId = 1;
    const home = await homeData.findHomeById(homeId);
    expect(home).to.be.an('object');
    expect(home).to.have.property('shopping_list');
    expect(home).to.have.property('name');
  });

  it('should create a new home', async () => {
    const newhome = {
      shopping_list: '{item1,item2,item3}',
      name: 'Test',
    };
    const home = await homeData.createHome(newhome);
    expect(home).to.be.an('object');
  });

  it('should update a home', async () => {
    const homeId = 3;
    const updatehome = {
      shopping_list: '{item1,item2,item3}',
      name: 'helloWorld',
    };
    const home = await homeData.updateHome(homeId, updatehome);
  });

  it('should delete a home', async () => {
    const homeId = 3;
    const result = await homeData.deleteHomeById(homeId);
    expect(result).to.be.true;
  });
});
