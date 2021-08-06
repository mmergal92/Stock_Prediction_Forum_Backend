const mongoose = require('mongoose');

const tslaPrediction = new mongoose.Schema({
    stock: String,
    date: String,
    predictionWasAccurated: Number,
    marketOpen: Boolean 

}, );

const tslaPredictionCollection = mongoose.model('TSLA Prediction', tslaPrediction, 'TSLA Prediction');

module.exports = tslaPredictionCollection;