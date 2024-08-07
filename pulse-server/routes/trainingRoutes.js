import express from 'express';
import { getAllTrainings, getTrainingById } from '../controllers/trainingController.js';

const router = express.Router();

router.get('/', getAllTrainings);
router.get('/:id', getTrainingById);

export default router;
