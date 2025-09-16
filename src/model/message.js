const mongoose = require('mongoose');

// Define the structure of a message document
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name.'], // Name is required
        trim: true // Removes whitespace from both ends
    },
    email: {
        type: String,
        required: [true, 'Please provide an email.'], // Email is required
        trim: true,
        lowercase: true, // Store email in lowercase
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email address.'
        ] // Regex for basic email validation
    },
    message: {
        type: String,
        required: [true, 'Please provide a message.'], // Message is required
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically sets the creation date
    }
});

// Create and export the model.
// Mongoose will create a collection named 'messages' (plural, lowercase)
module.exports = mongoose.model('Message', messageSchema);
