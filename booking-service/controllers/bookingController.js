// controllers/bookingController.js
const Booking = require('../models/bookingModel');
const connectMongoDB = require('../config/mongoDatabase'); // Adjust the path accordingly
const axios = require('axios');

//MongoDB Connection
connectMongoDB();

// Create booking
const createBooking = async (req, res) => {
    try {
        const { userId, hotelId } = req.body;

        // Add logic to prevent double-booking
        const existingBooking = await Booking.findOne({ userId, hotelId });
        if (existingBooking) {
            return res.status(400).json({ error: 'User already booked for this hotel' });
        }

        // Save booking to MongoDB
        const booking = new Booking({ userId, hotelId });
        const savedBooking = await booking.save();

        res.json(savedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update booking
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { userId, hotelId } = req.body;

        // Update booking in MongoDB
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, { userId, hotelId }, { new: true });

        if (!updatedBooking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            res.json(updatedBooking);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete booking
const deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        // Delete booking from MongoDB
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            res.json({ message: 'Booking deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get booking
const getBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        // Retrieve booking from MongoDB
        const booking = await Booking.findById(bookingId);
        

        if (!booking) {
            res.status(404).json({ error: 'Booking not found' });
        } else {
            
            // Retrieve additional user details from Users Microservice
            const userResponse = await axios.get(`http://localhost:3001/user/${booking.userId}`);
            const user = userResponse.data;

            // Retrieve hotel details from Hotels Microservice
            const hotelResponse = await axios.get(`http://localhost:3002/hotel/${booking.hotelId}`);
            const hotel = hotelResponse.data;

            // Include booking, user, and hotel information in the response
            res.json({ booking, user, hotel });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createBooking, updateBooking, deleteBooking, getBooking };
