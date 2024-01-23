const mongoose = require('mongoose');

const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/hotelbooking', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("MongoDB connected");
    } catch (err) {
        console.log("MongoDB Error: Failed to connect");
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectMongoDB;
