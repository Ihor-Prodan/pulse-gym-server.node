import { Router } from 'express';
import { registerUser } from '../controllers/registerController.js';
import { authenticateUser, getUserById } from '../controllers/authController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/find-user/:userId', getUserById);

export default router;