import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getProfile, followUser } from '../controllers/userController.js';

const router = Router();

router.get('/:id', getProfile);
router.put('/:id/follow', authMiddleware, followUser);

export default router;