// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);

module.exports = router;
