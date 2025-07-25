import Comment from '../models/Comment.js';
import { validationResult } from 'express-validator';

export const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const comment = await Comment.create({ ...req.body, user: req.user._id });
    const populated = await comment.populate('user', '-password');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ reel: req.params.reelId })
      .populate('user', '-password')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};