// --- Package Imports ---
require('dotenv').config(); // <-- FIXED: loads Render env vars automatically

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// --- Express App Initialization ---
const app = express();

// --- CORS Configuration ---
app.use(cors({
    origin: [
        'http://35.154.177.95',
        'http://localhost:3000',
        'https://your-frontend-url.vercel.app'
    ],
    credentials: true,
}));
app.use(express.json());

// Routes
const messageRoutes = require('./routes/message.js'); 
app.use('/api/messages', messageRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('Backend server is running 🚀');
});

// --- Database Connection & Server Startup ---
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
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
