const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide valid email',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    numberphone: {
        type: String,
        required: [true, 'Please provide valid numberphone']
    }
})

module.exports = mongoose.model('User', UserSchema)