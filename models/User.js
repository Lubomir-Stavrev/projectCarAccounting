const mongoose = require('mongoose');

const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');

const UserScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'The email is already in use'],
        validate: [isEmail, 'Invalid email']
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'The username should be atleast 5 characters long'],
        maxlength: [20, 'The username should be no more than 20 characters long'],
    },
    password: {
        type: String,
        required: true,
        validate: [isStrongPassword, 'The password is too weak']
    },
    likedCars: [{
        type: mongoose.Types.ObjectId,
    }]
})


module.exports = mongoose.model('User', UserScheme);