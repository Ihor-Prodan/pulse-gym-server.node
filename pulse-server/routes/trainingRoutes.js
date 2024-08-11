import express from 'express';
import { getAllTrainings, getTrainingById } from '../controllers/trainingController.js';
import bookingWorkout from '../controllers/bookingController.js';
import removeWorkoutById from '../controllers/removeWorkouts.js';

const router = express.Router();

router.get('/', getAllTrainings);
router.get('/:id', getTrainingById);
router.post('/', bookingWorkout);
router.delete('/remove/:workoutId', removeWorkoutById);

export default router;
