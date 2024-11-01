const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const USER = mongoose.model('User', UserSchema)

module.exports = USER