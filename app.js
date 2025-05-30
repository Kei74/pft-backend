const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes')

app.use(authRoutes);

// Set up Global configuration access
dotenv.config();

module.exports = app;