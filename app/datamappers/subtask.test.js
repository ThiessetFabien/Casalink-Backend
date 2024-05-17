import { describe, it } from "mocha";
import { expect } from "chai";
import subtaskData from "./subtask.js";

describe('Casalink generates the list of subtask', () => {
    it('should return a list of subtasks', async () => {
        const subtaskList = await subtaskData.findAllsubtask();
        expect(subtaskList).to.be.an('array');
        subtaskList.forEach(subtask => {
         expect(subtask).to.have.property('description'); 
         expect(subtask).to.have.property('name');
         expect(subtask).to.have.property('task_id');
        });
    });

    it('should return a subtask by ID', async () => {
        const subtaskId = 1; 
        const subtask = await subtaskData.findsubtaskById(subtaskId);
        expect(subtask).to.be.an('object');
        expect(subtask).to.have.property('description'); 
        expect(subtask).to.have.property('name');
        expect(subtask).to.have.property('task_id');
  });

    it('should create a new subtask', async () => {
        const newsubtask = {
            description: "jardin",
            name: "Adrien",
            task_id:"4"
        };
        const subtask = await subtaskData.createsubtask(newsubtask);
        expect(subtask).to.be.an('object');
    });

    it('should update a subtask', async () => {
        const subtaskId = 4; 
        const updatesubtask = {
            description: "Code",
            name: "IAdrien",
            task_id:"4"
      };
      const subtask = await subtaskData.updatesubtask(subtaskId, updatesubtask);
        });
    
  it('should delete a subtask', async () => {
    const subtaskId = 4;
    const result = await subtaskData.deletesubtaskById(subtaskId);
    expect(result).to.be.true;
  });
});