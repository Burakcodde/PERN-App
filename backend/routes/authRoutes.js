const express = require('express');
const { register, login, updateProfile, getUser } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile', authenticate, updateProfile);
router.get('/me', authenticate, getUser);

module.exports = router;