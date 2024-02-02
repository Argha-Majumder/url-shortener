const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const linkSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: () => nanoid(6)
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    expiryDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;