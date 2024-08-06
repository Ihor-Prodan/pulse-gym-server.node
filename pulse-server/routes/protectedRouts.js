import express from 'express';
import { authenticateToken } from '../middleware/midlwareJWT.js';

const router = express.Router();

router.get('/protected-route', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

export default router;
