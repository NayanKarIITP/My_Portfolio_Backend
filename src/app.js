
// --- Package Imports ---
const path = require('path'); 

// Configure and load environment variables from the .env file
const dotenvResult = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// If dotenv encounters an error, log it and exit
if (dotenvResult.error) {
    console.error('Error loading .env file:', dotenvResult.error);
    process.exit(1);
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Express App Initialization ---
const app = express();

// --- CORS Configuration ---
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));
app.use(express.json());

const messageRoutes = require('./routes/message.js'); 

// Register the message routes.
app.use('/api/messages', messageRoutes);

// --- Database Connection & Server Startup ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Explicitly check if the MONGO_URI was loaded before trying to connect
if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined. Please check your .env file for formatting errors.");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    });