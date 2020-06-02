import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.addProject);
router.get('/:id', ProjectController.getAProject);
router.put('/:id', ProjectController.updatedProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;