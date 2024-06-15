const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

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

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Corrected the export statement
module.exports = mongoose.model('User', UserSchema);
