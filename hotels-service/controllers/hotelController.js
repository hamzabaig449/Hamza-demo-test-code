// controllers/hotelController.js
const Hotel = require('../models/hotelModel');
const mysqlConnection = require('../config/sqlDatabase'); // Import MySQL


// Get hotel by ID
const getHotelById = async (req, res) => {
    try {
        const hotelId = req.params.hotelId;

        const hotelQuery = `SELECT * FROM hotels WHERE id = ${hotelId};`;

        const [hotelResult] = await mysqlConnection.promise().query(hotelQuery);
        const hotel = hotelResult[0];

        res.json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Create a new hotel
const createHotel = async (req, res) => {
    try {
        const { userId, location } = req.body;

        // Validate input data (you may want to add more validation)
        if (!userId || !location) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const createHotelQuery = `
            INSERT INTO hotels (user_id, location)
            VALUES (?, ?);
        `;

        const [result] = await mysqlConnection.promise().query(createHotelQuery, [userId, location]);

        // Get the ID of the newly created hotel
        const createdHotelId = result.insertId;

        // Retrieve the created hotel for response
        const getHotelQuery = `
            SELECT * FROM hotels WHERE id = ?;
        `;

        const [hotelResult] = await mysqlConnection.promise().query(getHotelQuery, [createdHotelId]);
        const createdHotel = hotelResult[0];

        res.status(201).json(createdHotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// This is the demo project, that's why I create only 2 user services 

module.exports = { getHotelById,createHotel };
