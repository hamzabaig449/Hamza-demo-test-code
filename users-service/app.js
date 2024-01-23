// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');


const app = express();
app.use(bodyParser.json());

// Use user routes
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Users Microservice is running on port ${PORT}`);
});
