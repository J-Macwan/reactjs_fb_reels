import { Router } from 'express';
import { body } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';
import { addComment, getComments } from '../controllers/commentController.js';

const router = Router();

router.get('/:reelId', getComments);

router.post(
  '/',
  authMiddleware,
  [body('text').notEmpty(), body('reel').notEmpty()],
  addComment
);

export default router;