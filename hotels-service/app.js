// app.js
const express = require('express');
const bodyParser = require('body-parser');
const hotelRoutes = require('./routes/hotelRoutes');


const app = express();
app.use(bodyParser.json());



// Use hotel routes
app.use('/hotel', hotelRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Hotels Microservice is running on port ${PORT}`);
});
