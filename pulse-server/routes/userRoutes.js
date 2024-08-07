import { Router } from 'express';
import { registerUser } from '../controllers/registerController.js';
import { authenticateUser } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);

export default router;