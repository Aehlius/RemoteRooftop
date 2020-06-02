import database from '../src/models';
import { Sequelize } from 'sequelize';

class ProjectService {
  static async getAllProjects(name, body, status, assigner, assignee, score) {
    try {
        var options = {where: {}}
        if (name) options.where.name = String(name);
        if (body) options.where.body = String(body);
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

        var allFilteredProjects = await database.Project.findAll(options);
        /*
        if (score) {
            var filteredByScoreProject = []
            await allFilteredProjects.forEach(async project => {
                var tasks = await database.Task.findAll({ where: { project: project.id}})
                var toInclude = true;
                await tasks.map(task => {
                    console.log(task.score)
                     if (task.score < score) toInclude = false;
                    })
                  console.log(toInclude)
                if (toInclude == true) {
                    filteredByScoreProject = [...filteredByScoreProject, project] 
                    console.log(filteredByScoreProject)
                }
            })
            allFilteredProjects = filteredByScoreProject
        }
        */
        return allFilteredProjects;
    } catch (error) {
        throw error;
    }
  }

  static async addProject(newProject) {
    try {
      return await database.Project.create(newProject);
    } catch (error) {
      throw error;
    }
  }

  static async updateProject(id, updateProject) {
    try {
      const ProjectToUpdate = await database.Project.findOne({
        where: { id: Number(id) }
      });

      if (ProjectToUpdate) {
        await database.Project.update(updateProject, { where: { id: Number(id) } });

        return updateProject;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAProject(id) {
    try {
      const theProject = await database.Project.findOne({
        where: { id: Number(id) }
      });

      return theProject;
    } catch (error) {
      throw error;
    }
  }

  static async deleteProject(id) {
    try {
      const ProjectToDelete = await database.Project.findOne({ where: { id: Number(id) } });

      if (ProjectToDelete) {
        const deletedProject = await database.Project.destroy({
          where: { id: Number(id) }
        });
        return deletedProject;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default ProjectService;