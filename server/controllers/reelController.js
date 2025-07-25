import Reel from '../models/Reel.js';
import { validationResult } from 'express-validator';

export const createReel = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const reel = await Reel.create({ ...req.body, user: req.user._id });
    res.status(201).json(reel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getReels = async (req, res) => {
  try {
    const reels = await Reel.find().populate('user', '-password').sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const likeReel = async (req, res) => {
  try {
    const reel = await Reel.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: 'Reel not found' });
    const index = reel.likes.indexOf(req.user._id);
    if (index === -1) {
      reel.likes.push(req.user._id);
    } else {
      reel.likes.splice(index, 1);
    }
    await reel.save();
    res.json({ likes: reel.likes.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const incrementView = async (req, res) => {
  try {
    const reel = await Reel.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ views: reel.views });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};