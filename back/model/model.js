const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,  // Corrected 'Type' to 'type'
        required: true // Corrected 'require' to 'required'
    },
    email: {
        type: String,
        required: true,
        unique: true  // Ensures email is unique
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,  // Optional field for storing avatar URL
        // required: true
        
    }
});

// Corrected the export statement
module.exports = mongoose.model('User', UserSchema);
