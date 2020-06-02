import database from '../src/models';
import { Sequelize } from 'sequelize';

class TaskService {
  static async getAllTasks(name, description, status, assigner, assignee, score) {
    try {
        var options = {where: {}}
        if (name) options.where.name = String(name);
        if (description) options.where.description = String(description);
        if (status) {
          var statusArray = status.split(',');
          options.where.status = { [Sequelize.Op.in]: statusArray }
        }

        if (assigner) {
          var assignerArray = assigner.split(',');
          options.where.assigner = { [Sequelize.Op.in]: assignerArray }
        }

        if (assignee) {
          var assigneeArray = assignee.split(',');
          options.where.assignee = { [Sequelize.Op.in]: assigneeArray }
        }

        if (score) { 
          options.where.score = { [Sequelize.Op.gte]: score}
        }
        
        return await database.Task.findAll(options);
    } catch (error) {
        throw error;
    }
  }

  static async addTask(newTask) {
    try {
      return await database.Task.create(newTask);
    } catch (error) {
      throw error;
    }
  }

  static async updateTask(id, updateTask) {
    try {
      const TaskToUpdate = await database.Task.findOne({
        where: { id: Number(id) }
      });

      if (TaskToUpdate) {
        await database.Task.update(updateTask, { where: { id: Number(id) } });

        return updateTask;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getATask(id) {
    try {
      const theTask = await database.Task.findOne({
        where: { id: Number(id) }
      });

      return theTask;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTask(id) {
    try {
      const TaskToDelete = await database.Task.findOne({ where: { id: Number(id) } });

      if (TaskToDelete) {
        const deletedTask = await database.Task.destroy({
          where: { id: Number(id) }
        });
        return deletedTask;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default TaskService;