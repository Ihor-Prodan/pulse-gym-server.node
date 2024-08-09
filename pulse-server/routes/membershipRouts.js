import express from 'express';
import { createMembership, getMembershipById } from '../controllers/membershipController.js';

const router = express.Router();

router.post('/', createMembership);
router.get('/:id', getMembershipById);

export default router;
