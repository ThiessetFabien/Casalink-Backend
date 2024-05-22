import { describe, it } from "mocha";
import { expect } from "chai";
import subtaskData from "./subtask.js";

describe('Casalink generates the list of subtask', () => {

    it('should return a subtask by ID', async () => {
        const subtaskId = 1; 
        const subtask = await subtaskData.findSubtaskById(subtaskId);
        expect(subtask).to.be.an('object');
        expect(subtask).to.have.property('description'); 
        expect(subtask).to.have.property('name');
        expect(subtask).to.have.property('task_id');
    });

    it('should create a new subtask', async () => {
        const newsubtask = {
            description: "jardin",
            name: "Adrien",
            task_id:"1"
        };
        const subtask = await subtaskData.createSubtask(newsubtask);
        expect(subtask).to.be.an('object');
    });

    it('should update a subtask', async () => {
        const subtaskId = 1; 
        const updatesubtask = {
            description: "Code",
            name: "IAdrien",
            task_id:"1"
    };
      const subtask = await subtaskData.updateSubtask(subtaskId, updatesubtask);
        });

    it('should delete a subtask', async () => {
      const subtaskId = 4;
      const result = await subtaskData.deleteSubtaskById(subtaskId);
      expect(result).to.be.true;
    });
});