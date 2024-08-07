import express from 'express';
import { getAllWorkout, getWorkoutById } from '../controllers/workoutController.js';

const router = express.Router();

router.get('/', getAllWorkout);
router.get('/:id', getWorkoutById);

export default router;
