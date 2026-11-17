
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String,
        default: 'India'
    },

    description: {
        type: String,
        required: true
    },

    skills: {
        type: [String],
        default: []
    },

    category: {
        type: String,
        default: 'Technology'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Job', jobSchema);
