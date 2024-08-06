import express from 'express';
import {
  getAllTrainings,
  getTrainingById,
} from '../controllers/trainingController';

const router = express.Router();

router.get('/', getAllTrainings);
router.get('/:id', getTrainingById);
