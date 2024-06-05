/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import accountData from '../account.datamapper.js';

describe('Casalink generates the list of accounts', () => {
  it('should return a list of accounts', async () => {
    const accountsList = await accountData.findAllAccounts();
    expect(accountsList).to.be.an('array');
    accountsList.forEach((account) => {
      expect(account).to.have.property('firstname');
      expect(account).to.have.property('lastname');
      expect(account).to.have.property('email');
      expect(account).to.have.property('role');
      expect(account).to.have.property('password');
      expect(account).to.have.property('home_id');
    });
  });

  it('should return an account by ID', async () => {
    const accountId = 4;
    const account = await accountData.findAccountById(accountId);
    if (account.length === 0) {
      expect(account).to.be.an('array').that.is.empty;
    } else {
      expect(account[0]).to.be.an('object');
      expect(account[0]).to.have.property('firstname');
      expect(account[0]).to.have.property('lastname');
      expect(account[0]).to.have.property('email');
      expect(account[0]).to.have.property('role');
      expect(account[0]).to.have.property('password');
      expect(account[0]).to.have.property('home_id');
    }
  });

  it('should return a account by home ID', async () => {
    const homeId = 1;
    const accounts = await accountData.findAccountsByHomeId(homeId);
    expect(accounts).to.be.an('array');
    accounts.forEach((account) => {
      expect(account).to.have.property('firstname');
      expect(account).to.have.property('lastname');
      expect(account).to.have.property('email');
      expect(account).to.have.property('role');
      expect(account).to.have.property('password');
      expect(account).to.have.property('home_id');
    });
  });

  it('should create a new account', async () => {
    const newaccount = {
      firstname: 'Adrien',
      lastname: 'Hack',
      email: 'Adrien@gmail.com',
      password: 'Adrienhack#123',
      confirmPassword: 'Adrienhack#123',
    };
    const account = await accountData.createAccount(newaccount);
    expect(account).to.be.an('object');
  });

  it('should update an account', async () => {
    const accountId = 5;
    const updateAccount = {
      email: 'adrien.Hack@gmail.com',
      firstname: 'IAdrien',
      lastname: 'The Best',
      password: 'IAhelper',
      home_id: '1',
    };
    const account = await accountData.updateAccount(accountId, updateAccount);
    expect(account).to.not.be.undefined;
    expect(account).to.be.an('object');
  });

  it('should delete an account', async () => {
    const accountId = 5;
    const result = await accountData.deleteAccountById(accountId);
    expect(result).to.be.an('object');
    expect(result).to.have.property('success', true);
  });
});
