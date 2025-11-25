require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://my-portfolio-frontend-five-steel.vercel.app"   // your real Vercel domain
    ],
    credentials: true,
}));

app.use(express.json());

const messageRoutes = require('./routes/message');
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('Backend server is running 🚀');
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("MONGO_URI is missing");
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error("MongoDB connection failed", err);
        process.exit(1);
    });
