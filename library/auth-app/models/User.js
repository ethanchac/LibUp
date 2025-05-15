const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    libraryItems: {
        type: [
            {
                title: { type: String, required: true},
                author: {type: String, required: true},
                urgency: { type: String, required: true},
                read: { type: Boolean, required: true},
            }
        ],
        default: []
    }
})
module.exports = mongoose.model('User', UserSchema);