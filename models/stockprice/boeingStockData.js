const mongoose = require('mongoose');

const BoeingStockSchema = new mongoose.Schema({
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

const boeingStockCollection = mongoose.model('BA', BoeingStockSchema, 'BOEING');

module.exports = boeingStockCollection;
