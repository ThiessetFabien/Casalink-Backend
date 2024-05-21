import { describe, it } from "mocha";
import { expect } from "chai";
import profileData from "./profile.js";

describe('Casalink generates the list of profile', () => {
    it('should return a profile by ID', async () => {
        const profileId = 1; 
        const profile = await profileData.findProfileById(profileId);
        expect(profile).to.be.an('object');
        expect(profile).to.have.property('name'); 
        expect(profile).to.have.property('role');
        expect(profile).to.have.property('pin');
        expect(profile).to.have.property('score');
        expect(profile).to.have.property('birthdate');
        expect(profile).to.have.property('image');
        expect(profile).to.have.property('email');
        expect(profile).to.have.property('account_id');
   });

   it('should return a profile by AccountId', async () => {
    const profileAccountId = 1; 
    const profile = await profileData.findProfileByAccountId(profileAccountId);
    expect(profile).to.be.an('object');
    expect(profile).to.have.property('name'); 
    expect(profile).to.have.property('role');
    expect(profile).to.have.property('pin');
    expect(profile).to.have.property('score');
    expect(profile).to.have.property('birthdate');
    expect(profile).to.have.property('image');
    expect(profile).to.have.property('email');
    expect(profile).to.have.property('account_id');
});

it('should return a profile by HomeId', async () => {
  const profileHomeId = 1; 
  const profile = await profileData.findProfileByHomeId(profileHomeId);
  expect(profile).to.be.an('object');
  expect(profile).to.have.property('name'); 
  expect(profile).to.have.property('role');
  expect(profile).to.have.property('pin');
  expect(profile).to.have.property('score');
  expect(profile).to.have.property('birthdate');
  expect(profile).to.have.property('image');
  expect(profile).to.have.property('email');
  expect(profile).to.have.property('account_id');
});

    it('should create a new profile', async () => {
      const newProfile = {
        name: "HackAdrien",
        role: "adult",
        pin: "1234",
        score: 0,
        birthdate: "1997-09-25",
        image: "hackadrien.jpg",
        email: "adrienhack@test.com",
        account_id: 1
    };
    const profile = await profileData.createProfile(newProfile);
    expect(profile).to.be.an('object');
});

    it('should update a profile', async () => {
      const profileId = 3;
      const updateProfile = {
          name: "El_Professor",
          role: "adult",
          pin: "1234",
          score: 0,
          birthdate: "1997-09-25",
          image: "hackadrien.jpg",
          email: "adrienhack@test.com",
          account_id: 1
      };
      const profile = await profileData.updateProfile(profileId, updateProfile);
      expect(profile).to.be.an('object');
      expect(profile).to.have.property('name', 'El_Professor');
  });

  it('should delete a profile', async () => {
    const profileId = 3;
    const result = await profileData.deleteProfileById(profileId);
    expect(result).to.be.true;
  });
});