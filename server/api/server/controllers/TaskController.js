import TaskService from '../services/TaskService';
import Util from '../utils/Utils';

const util = new Util();

class TaskController {
    static async getAllTasks(req, res) {
        try {
            const { name, description, status, assigner, assignee, score } = req.query;
            const allTasks = await TaskService.getAllTasks(name, description, status, assigner, assignee, score);
            if (allTasks.length > 0) {
                util.setSuccess(200, 'Tasks retrieved', allTasks);
            } else {
                util.setSuccess(200, 'No Task found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addTask(req, res) {
        if (!req.body.name || !req.body.description || !req.body.score || !req.body.status || !req.body.assigner || !req.body.project) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newTask = req.body;
        try {
            const createdTask = await TaskService.addTask(newTask);
            util.setSuccess(201, 'Task Added!', createdTask);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedTask(req, res) {
        const alteredTask = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateTask = await TaskService.updateTask(id, alteredTask);
            if (!updateTask) {
                util.setError(404, `Cannot find Task with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Task updated', updateTask);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getATask(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const theTask = await TaskService.getATask(id);
            if (!theTask) {
                util.setError(404, `Cannot find Task with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Task', theTask);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteTask(req, res) {
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }
        try {
            const TaskToDelete = await TaskService.deleteTask(id);

            if (TaskToDelete) {
                util.setSuccess(200, 'Task deleted');
            } else {
                util.setError(404, `Task with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default TaskController;