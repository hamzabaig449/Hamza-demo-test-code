// app.js
const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/bookingRoutes');


const app = express();
app.use(bodyParser.json());



// Use booking routes
app.use('/booking', bookingRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Booking Microservice is running on port ${PORT}`);
});

module.exports = app;