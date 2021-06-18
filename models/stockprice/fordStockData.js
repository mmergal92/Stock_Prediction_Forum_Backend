const mongoose = require('mongoose');

const FordStockSchema = new mongoose.Schema({
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

const fordStockCollection = mongoose.model('F', FordStockSchema, 'FORD');

module.exports = fordStockCollection;
