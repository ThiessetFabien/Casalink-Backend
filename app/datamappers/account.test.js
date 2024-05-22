import { describe, it } from "mocha";
import { expect } from "chai";
import accountData from "./account.js";

describe('Casalink generates the list of accounts', () => {
    it('should return a list of accounts', async () => {
        const accountsList = await accountData.findAllAccounts();
        expect(accountsList).to.be.an('array');
        accountsList.forEach(account => {
        expect(account).to.have.property('firstname'); 
        expect(account).to.have.property('lastname');
        expect(account).to.have.property('email');
        expect(account).to.have.property('role');
        expect(account).to.have.property('password');
        expect(account).to.have.property('home_id');
        });
    });

    it('should return a account by ID', async () => {
        const accountId = 1; 
        const account = await accountData.findAccountById(accountId);
        expect(account).to.be.an('object');
        expect(account).to.have.property('firstname');
        expect(account).to.have.property('lastname');
        expect(account).to.have.property('email');
        expect(account).to.have.property('role');
        expect(account).to.have.property('password');
        expect(account).to.have.property('home_id');
    });

    it('should return a account by home ID', async () => {
        const homeId = 1; 
        const accounts = await accountData.findAccountsByHomeId(homeId);
        expect(accounts).to.be.an('array');
        accounts.forEach(account => {
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
            email: "adrien.Hack@gmail.com",
            firstname: "Adrien",
            lastname: "Hack",
            birthdate: "1990-01-01",
            role: "user",
            pin: "1234",
            score: 0,
            password: "helper",
            home_id: '1'
        };
        const account = await accountData.createAccount(newaccount);
        expect(account).to.be.an('object');
    });

    it('should update an account', async () => {
        const accountId = 4; 
        const updateAccount = {
            email: "adrien.Hack@gmail.com",
            firstname: "IAdrien",
            lastname: "The Best",
            role: "user",
            password: "IAhelper",
            home_id: '1'
        };
        const account = await accountData.updateAccount(accountId, updateAccount);
        expect(account).to.be.an('object');
    });

    it('should delete an account', async () => {
        const accountId = 4;
        const result = await accountData.deleteAccountById(accountId);
        expect(result).to.be.true;
    });
});