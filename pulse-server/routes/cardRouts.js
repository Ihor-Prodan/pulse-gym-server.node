import express from 'express';
import { createCardData } from '../controllers/dataCardController.js';

const router = express.Router();

router.post('/', createCardData);

export default router;
