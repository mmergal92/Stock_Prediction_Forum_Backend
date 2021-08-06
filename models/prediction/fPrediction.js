const mongoose = require('mongoose');

const fPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const fPredictionCollection = mongoose.model('F Prediction', fPrediction, 'F Prediction');

module.exports = fPredictionCollection;