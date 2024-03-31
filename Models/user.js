const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {  
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

const User = mongoose.model('User', userSchema);

module.exports = User;