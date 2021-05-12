const mongoose = require('mongoose');

const carScheme = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: false,
        maxlength: 4,
    },
    description: {
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?/, 'Image should start with http or https !'],
    },
    createdAt: { type: Date, default: Date.now },
    ownerId: {
        type: String,
        required: true
    },
    parts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Parts',
        required: true,
    }]
})

module.exports = mongoose.model('car', carScheme);