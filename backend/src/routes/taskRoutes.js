import express from 'express';
import {
  deleteTask,
  editTask,
  getTasks,
  newTask,
} from '../controllers/taskController.js';
import { verifyUser } from '../middlewares/verify.js';

const router = express.Router();

router.post('/add-task', verifyUser, newTask);

router.get('/get-tasks', verifyUser, getTasks);

router.put('/edit-task/:id', verifyUser, editTask);

router.delete('/delete-task/:id', verifyUser, deleteTask);

export default router;
