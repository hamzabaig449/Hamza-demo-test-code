// models/hotelModel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    // Define hotel schema properties
    // ...
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
