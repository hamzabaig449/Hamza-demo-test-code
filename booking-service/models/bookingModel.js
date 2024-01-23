// models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: String,
    hotelId: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
