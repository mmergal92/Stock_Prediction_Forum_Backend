const mongoose = require('mongoose');

const twtrPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const twtrPredictionCollection = mongoose.model('TWTR Prediction', twtrPrediction, 'TWTR Prediction');

module.exports = twtrPredictionCollection;