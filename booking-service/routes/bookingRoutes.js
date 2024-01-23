// routes/bookingRoutes.js
const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

// Create booking
router.post('/', bookingController.createBooking);

// Update booking
router.put('/:bookingId', bookingController.updateBooking);

// Delete booking
router.delete('/:bookingId', bookingController.deleteBooking);

// Get booking
router.get('/:bookingId', bookingController.getBooking);

module.exports = router;
