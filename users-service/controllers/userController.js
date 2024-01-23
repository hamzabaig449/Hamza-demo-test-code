// controllers/userController.js
const mysqlConnection = require('../config/sqlDatabase'); // Import MySQL

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;

        const userQuery = `SELECT * FROM users WHERE id = ${userId};`;

        const [userResult] = await mysqlConnection.promise().query(userQuery);
        const user = userResult[0];

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create user
const createUser = async (req, res) => {
    try {
        const { id, name, email } = req.body;

        // Insert user data into MySQL
        const userInsertQuery = `
            INSERT INTO users (id, name, email)
            VALUES (?, ?, ?);
        `;

        const [result] = await mysqlConnection.promise().query(userInsertQuery, [id, name, email]);

        res.json({ message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// This is the demo project, that's why I create only 2 user services 

module.exports = { getUserById, createUser };
