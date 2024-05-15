import { describe, it } from "mocha";
import { expect } from "chai";
import casalinkData from "../services/index";


describe('Casalink génére la liste des users', () => {
    it('should return a object', async () => {
        expect(typeof casalinkData).to.be.an('object');
        });
    it('should return a list of users', async () => {
        const usersList = await casalinkData.findAllMember();
        expect(usersList).to.be.an('array');
        usersList.forEach(member => {
         expect(member).to.have.property('firstname'); 
         expect(member).to.have.property('lastname');
         expect(member).to.have.property('email');
         expect(member).to.have.property('role');
         expect(member).to.have.property('status');
            });
          });
 it('should return a member by ID', async () => {
    const memberId = 1; 
    const member = await casalinkData.findOneMember(memberId);
    expect(member).to.be.an('object');
    expect(member).to.have.property('firstname');
    expect(member).to.have.property('lastname');
    expect(member).to.have.property('email');
    expect(member).to.have.property('birthdate');
    expect(member).to.have.property('role');
    expect(member).to.have.property('pin');
    expect(member).to.have.property('score');
    expect(member).to.have.property('password');
  });
});