// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // user schema properties
    // ...
});

const User = mongoose.model('User', userSchema);

module.exports = User;
