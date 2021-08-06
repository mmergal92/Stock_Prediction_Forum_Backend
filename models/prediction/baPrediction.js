const mongoose = require('mongoose');

const baPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const baPredictionCollection = mongoose.model('BA Prediction', baPrediction, 'BA Prediction');

module.exports = baPredictionCollection;