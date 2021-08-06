const mongoose = require('mongoose');

const nflxPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const nflxPredictionCollection = mongoose.model('NFLX Prediction', nflxPrediction, 'NFLX Prediction');

module.exports = nflxPredictionCollection;