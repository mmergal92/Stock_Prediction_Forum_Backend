const mongoose = require('mongoose');

const TeslaStockSchema = new mongoose.Schema({
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

const teslaStockCollection = mongoose.model('TSLA', TeslaStockSchema, 'TESLA');

module.exports = teslaStockCollection;
