import { Router } from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createReel, getReels, likeReel, incrementView } from '../controllers/reelController.js';

const router = Router();

router.get('/', getReels);

router.post(
  '/',
  authMiddleware,
  [body('videoUrl').notEmpty()],
  createReel
);

router.put('/:id/like', authMiddleware, likeReel);

router.put('/:id/view', incrementView);

export default router;