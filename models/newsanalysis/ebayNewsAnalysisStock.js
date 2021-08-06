const mongoose = require('mongoose');

const ebayNewsSentiment = new mongoose.Schema({
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

const ebayNewsSentimentCollection = mongoose.model('EBAY News', ebayNewsSentiment, 'EBAY News');

module.exports = ebayNewsSentimentCollection;
