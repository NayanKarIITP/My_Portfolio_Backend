const express = require('express');
const router = express.Router();
// Path updated to correctly locate the model from within the src directory
const Message = require('../model/message'); 

router.post('/', async (req, res) => {
    try {
        // Destructure name, email, and message from the request body
        const { name, email, message } = req.body;

        // Simple server-side validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                msg: 'Please ensure all fields are filled out.'
            });
        }

        // Create a new message instance using the Mongoose model
        const newMessage = new Message({
            name,
            email,
            message
        });

        // Save the new message to the database
        const savedMessage = await newMessage.save();

        // Send a success response back to the client
        res.status(201).json({
            success: true,
            msg: 'Your message has been sent successfully!',
            data: savedMessage
        });

    } catch (err) {
        // Handle potential errors, such as validation errors from the model
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ success: false, msg: messages.join(' ') });
        }
        
        console.error('Server Error:', err.message);
        res.status(500).json({ success: false, msg: 'Something went wrong on the server.' });
    }
});

module.exports = router;
