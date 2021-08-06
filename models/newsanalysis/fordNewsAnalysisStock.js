const mongoose = require('mongoose');

const fordNewsSentiment = new mongoose.Schema({
    stock: String,
    date: String,
    hour: String,
    timezone: String,
    ratings: Array,
    overallScore: {
        type : { type: String },
        score: {type: Number},
    },
    ratios: {
        upPercent: {type: Number},
        downPercent: {type: Number},
    },
    price: Number
}, );

const fordNewsSentimentCollection = mongoose.model('F News', fordNewsSentiment, 'F News');

module.exports = fordNewsSentimentCollection;
