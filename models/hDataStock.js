const mongoose = require('mongoose');

const hDataStockSchema = new mongoose.Schema({
    symbol: String,
    date: String,
    open: Number, 
    close: Number,
    changeActual: Number,
    changePercent: Number,
    volume: String,
    vwap: Number,
    label: String
}, );

const hDataStock = mongoose.model('hDataStock', hDataStockSchema);

module.exports = hDataStock;