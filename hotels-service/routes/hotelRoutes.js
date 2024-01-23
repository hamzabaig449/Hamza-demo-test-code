// routes/hotelRoutes.js
const express = require('express');
const hotelController = require('../controllers/hotelController');

const router = express.Router();

// Get hotel by ID
router.get('/:hotelId', hotelController.getHotelById);
router.post('/', hotelController.createHotel);

module.exports = router;
