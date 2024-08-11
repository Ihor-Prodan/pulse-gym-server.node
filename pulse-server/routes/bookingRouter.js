import express from 'express';
import bookingWorkout from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', bookingWorkout);

export default router;