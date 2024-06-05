/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import taskData from '../task.datamapper.js';

describe('Casalink generates the list of task', () => {
  it('should return a list of tasks', async () => {
    const taskList = await taskData.findAllTask();
    expect(taskList).to.be.an('array');
    taskList.forEach((task) => {
      expect(task).to.have.property('name');
      expect(task).to.have.property('start_date');
      expect(task).to.have.property('end_date');
      expect(task).to.have.property('reward_point');
      expect(task).to.have.property('priority');
      expect(task).to.have.property('status');
      expect(task).to.have.property('description');
      expect(task).to.have.property('category_id');
    });
  });

  it('should return a task by ID', async () => {
    const taskId = 1;
    const task = await taskData.findTaskById(taskId);
    expect(task).to.be.an('object');
    expect(task).to.have.property('name');
    expect(task).to.have.property('start_date');
    expect(task).to.have.property('end_date');
    expect(task).to.have.property('reward_point');
    expect(task).to.have.property('priority');
    expect(task).to.have.property('status');
    expect(task).to.have.property('description');
    expect(task).to.have.property('category_id');
  });

  it('should create a new task by profil', async () => {
    const newTask = {
      name: 'Test',
      start_date: '2021-01-01',
      end_date: '2021-01-02',
      reward_point: 5,
      description: 'Test',
      category_id: 1,
      account_id: 4,
    };
    const task = await taskData.createTaskByProfileId(newTask);
    expect(task).to.be.an('object');
  });

  it('should update a task', async () => {
    const taskId = 4;
    const updatetask = {
      name: 'helloWorld',
      start_date: '2021-01-01',
      end_date: '2021-01-02',
      reward_point: 5,
      priority: 1,
      status: 'todo',
      description: 'Test',
      category_id: 1,
    };
    const task = await taskData.updateTask(taskId, updatetask);
  });

  it('should delete a task', async () => {
    const taskId = 4;
    const result = await taskData.deleteTaskById(taskId);
    expect(result).to.be.an('object');
  });
});
