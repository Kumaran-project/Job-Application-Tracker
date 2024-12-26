const express = require('express');
const { getProfile, saveProfile, updateProfile } = require('../controllers/profile');
const router = express.Router();
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware.authenticateUser, getProfile);
router.post('/', authMiddleware.authenticateUser, saveProfile);
router.put('/', authMiddleware.authenticateUser, updateProfile);

module.exports = router;