const mongoose = require('mongoose');

const qcomPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const qcomPredictionCollection = mongoose.model('QCOM Prediction', qcomPrediction, 'QCOM Prediction');

module.exports = qcomPredictionCollection;