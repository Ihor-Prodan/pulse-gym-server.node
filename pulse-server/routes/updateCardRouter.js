import express from 'express';
import { updateCardData } from '../controllers/updateUserController.js';

const router = express.Router();

router.put('/update', updateCardData);

export default router;