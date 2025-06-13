const express = require('express');
const { register, login } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Optional protected test route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` });
});

module.exports = router;
