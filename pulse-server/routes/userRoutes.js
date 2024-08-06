import { Router } from 'express';
import { registerUser } from '../controllers/registerController';
import { authenticateUser } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);

export default router;