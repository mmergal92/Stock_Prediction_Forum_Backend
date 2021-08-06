const mongoose = require('mongoose');

const aaplPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurate: Number,
    marketOpen: Boolean 

}, );

const aaplPredictionCollection = mongoose.model('AAPL Prediction', aaplPrediction, 'AAPL Prediction');

module.exports = aaplPredictionCollection;