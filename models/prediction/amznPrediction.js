const mongoose = require('mongoose');

const amznPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const amznPredictionCollection = mongoose.model('AMZN Prediction', amznPrediction, 'AMZN Prediction');

module.exports = amznPredictionCollection;