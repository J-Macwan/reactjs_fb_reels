import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('followers following', 'username avatar');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const followUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const me = await User.findById(req.user._id);
    if (!target) return res.status(404).json({ message: 'User not found' });
    if (target.followers.includes(me._id)) {
      target.followers.pull(me._id);
      me.following.pull(target._id);
    } else {
      target.followers.push(me._id);
      me.following.push(target._id);
    }
    await target.save();
    await me.save();
    res.json({ followers: target.followers.length, following: me.following.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};