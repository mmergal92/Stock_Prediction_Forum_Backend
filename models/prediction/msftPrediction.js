const mongoose = require('mongoose');

const msftPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const msftPredictionCollection = mongoose.model('MSFT Prediction', msftPrediction, 'MSFT Prediction');

module.exports = msftPredictionCollection;