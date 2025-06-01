const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

app.use(authRoutes);
app.use(transactionRoutes);

// Set up Global configuration access
dotenv.config();

app.get('/status', (req, res) => {
	res.send("Server running");
});

module.exports = app;