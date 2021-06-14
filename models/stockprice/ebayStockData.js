const mongoose = require('mongoose');

const EbayStockSchema = new mongoose.Schema({
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

const ebayStockCollection = mongoose.model('EBAY', EbayStockSchema, 'EBAY');

module.exports = ebayStockCollection;
