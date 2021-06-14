const mongoose = require('mongoose');

const AmazonStockSchema = new mongoose.Schema({
    symbol: String,
    date: {type: String, unique: true},
    open: Number, 
    close: Number,
    changeActual: Number,
    changePercent: Number,
    volume: String,
    vwap: Number,
    label: String
}, );

const amazonStockCollection = mongoose.model('AMZN', AmazonStockSchema, 'AMAZON');

module.exports = amazonStockCollection;
