const mongoose = require('mongoose');

const AppleStockSchema = new mongoose.Schema({
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

const appleStockCollection = mongoose.model('AAPL', AppleStockSchema, 'APPLE');

module.exports = appleStockCollection;
