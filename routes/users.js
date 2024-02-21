const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/auth');
const { register, login } = require('../controllers/authController');
const { getUserData } = require('../controllers/userController');
router.post('/register', register);
router.post('/login', login);
router.get('/user', isAuthenticated, getUserData);
module.exports = router;
