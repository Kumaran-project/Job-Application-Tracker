const Profile = require('../models/Profile'); // Import the Profile model
const User = require('../models/userModel'); // Import the User model


module.exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (profile) {
      res.json({ success: true, data: profile });
    } else {
      res.json({ success: false, message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
};


module.exports.saveProfile = async (req, res) => {
  try {
    const { name, email, occupation, college, degree, careerGoals, linkedInUrl } = req.body;
    const userId = req.user.id;

    const profile = await Profile.create({
      userId,
      name,
      email,
      occupation,
      college,
      degree,
      careerGoals,
      linkedInUrl,
    });

    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to save profile' });
  }
};


module.exports.updateProfile = async (req, res) => {
  try {
    const { name, email, occupation, college, degree, careerGoals, linkedInUrl } = req.body;
    const userId = req.user.id;

    const profile = await Profile.findOne({ where: { userId } });
    if (profile) {
      await profile.update({ name, email, occupation, college, degree, careerGoals, linkedInUrl });
      res.json({ success: true, data: profile });
    } else {
      res.status(404).json({ success: false, message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
};
