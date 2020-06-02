import { Router } from 'express';
import TaskController from '../controllers/TaskController';

const router = Router();

router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.addTask);
router.get('/:id', TaskController.getATask);
router.put('/:id', TaskController.updatedTask);
router.delete('/:id', TaskController.deleteTask);

export default router;