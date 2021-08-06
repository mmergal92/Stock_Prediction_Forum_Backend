const mongoose = require('mongoose');

const ebayPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const ebayPredictionCollection = mongoose.model('EBAY Prediction', ebayPrediction, 'EBAY Prediction');

module.exports = ebayPredictionCollection;

