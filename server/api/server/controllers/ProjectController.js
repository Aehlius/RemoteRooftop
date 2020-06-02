import ProjectService from '../services/ProjectService';
import Util from '../utils/Utils';

const util = new Util();

class ProjectController {
    static async getAllProjects(req, res) {
        try {
            const { name, body, status, assigner, assignee, score } = req.query;
            const allProjects = await ProjectService.getAllProjects(name, body, status, assigner, assignee, score);
            if (allProjects.length > 0) {
                util.setSuccess(200, 'Projects retrieved', allProjects);
            } else {
                util.setSuccess(200, 'No Project found');
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addProject(req, res) {
        if (!req.body.name || !req.body.body || !req.body.status || !req.body.assigner) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newProject = req.body;
        try {
            const createdProject = await ProjectService.addProject(newProject);
            util.setSuccess(201, 'Project Added!', createdProject);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedProject(req, res) {
        const alteredProject = req.body;
        const { id } = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updateProject = await ProjectService.updateProject(id, alteredProject);
            if (!updateProject) {
                util.setError(404, `Cannot find Project with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Project updated', updateProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAProject(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const theProject = await ProjectService.getAProject(id);

            if (!theProject) {
                util.setError(404, `Cannot find Project with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Project', theProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteProject(req, res) {
        const { id } = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const ProjectToDelete = await ProjectService.deleteProject(id);

            if (ProjectToDelete) {
                util.setSuccess(200, 'Project deleted');
            } else {
                util.setError(404, `Project with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }
}

export default ProjectController;