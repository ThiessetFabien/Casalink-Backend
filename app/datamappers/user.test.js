import { describe, it } from "mocha";
import { expect } from "chai";
import userData from "./user.js";

describe('Casalink generates the list of users', () => {
    it('should return a list of users', async () => {
        const usersList = await userData.findAllUsers();
        expect(usersList).to.be.an('array');
        usersList.forEach(user => {
         expect(user).to.have.property('firstname'); 
         expect(user).to.have.property('lastname');
         expect(user).to.have.property('email');
         expect(user).to.have.property('role');
         expect(user).to.have.property('pin');
         expect(user).to.have.property('score');
         expect(user).to.have.property('password');
         expect(user).to.have.property('home_id');
        });
    });

    it('should return a user by ID', async () => {
        const userId = 1; 
        const user = await userData.findUserById(userId);
        expect(user).to.be.an('object');
        expect(user).to.have.property('firstname');
        expect(user).to.have.property('lastname');
        expect(user).to.have.property('email');
        expect(user).to.have.property('birthdate');
        expect(user).to.have.property('role');
        expect(user).to.have.property('pin');
        expect(user).to.have.property('score');
        expect(user).to.have.property('password');
        expect(user).to.have.property('home_id');
    });

    it('should return a user by home ID', async () => {
        const homeId = 1; 
        const users = await userData.findUsersByHomeId(homeId);
        expect(users).to.be.an('array');
        users.forEach(user => {
            expect(user).to.have.property('firstname');
            expect(user).to.have.property('lastname');
            expect(user).to.have.property('email');
            expect(user).to.have.property('birthdate');
            expect(user).to.have.property('role');
            expect(user).to.have.property('pin');
            expect(user).to.have.property('score');
            expect(user).to.have.property('password');
            expect(user).to.have.property('home_id');
        });
    });

    it('should create a new user', async () => {
        const newUser = {
            email: "adrien.Hack@gmail.com",
            firstname: "Adrien",
            lastname: "Hack",
            birthdate: "1990-01-01",
            role: "adult",
            pin: "1234",
            score: 0,
            password: "helper",
            home_id: '1'
        };
        const user = await userData.createUser(newUser);
        expect(user).to.be.an('object');
    });

    it('should update a user', async () => {
        const userId = 4; 
        const updateUser = {
            email: "adrien.Hack@gmail.com",
            firstname: "IAdrien",
            lastname: "The Best",
            birthdate: "1990-01-01",
            role: "adult",
            pin: "1234",
            score: 0,
            password: "IAhelper",
            home_id: '1'
        };
        const user = await userData.updateUser(userId, updateUser);
        expect(user).to.be.an('object');
    });
    
  it('should delete a user', async () => {
    const userId = 4;
    const result = await userData.deleteUserById(userId);
    expect(result).to.be.true;
  });
});
