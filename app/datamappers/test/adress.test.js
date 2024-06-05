/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import adressData from '../address.datamapper.js';

describe('Casalink generates the list of adress', () => {
  it('should return a list of adresss', async () => {
    const adressList = await adressData.findAllAddress();
    expect(adressList).to.be.an('array');
    adressList.forEach((adress) => {
      expect(adress).to.have.property('street');
      expect(adress).to.have.property('city');
      expect(adress).to.have.property('additional_information');
      expect(adress).to.have.property('postal_code');
      expect(adress).to.have.property('country');
    });
  });

  it('should return a adress by ID', async () => {
    const adressId = 1;
    const adress = await adressData.findAddressById(adressId);
    expect(adress).to.be.an('array').that.has.lengthOf(1);
    expect(adress[0]).to.have.property('street');
    expect(adress[0]).to.have.property('city');
    expect(adress[0]).to.have.property('additional_information');
    expect(adress[0]).to.have.property('postal_code');
    expect(adress[0]).to.have.property('country');
  });

  it('should create a new adress', async () => {
    const newadress = {
      street: '46 rue de la paix',
      city: 'Paris',
      additional_information: 'porte 2',
      postal_code: '75001',
      country: 'France',
    };
    const adress = await adressData.createAddress(newadress);
    expect(adress).to.be.an('object');
  });

  it('should update a adress', async () => {
    const adressId = 3;
    const updateadress = {
      street: '50 rue de la paix',
      city: 'Ivry sur seine',
      additional_information: 'Chateau 2',
      postal_code: '94200',
      country: 'France',
    };

    const adress = await adressData.updateAddress(adressId, updateadress);
  });

  it('should delete a adress', async () => {
    const adressId = 3;
    const result = await adressData.deleteAddressById(adressId);
    expect(result).to.be.an('array').that.is.empty;
  });
});
