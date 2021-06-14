const mongoose = require('mongoose');

const MicrosoftStockSchema = new mongoose.Schema({
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

const microsoftStockCollection = mongoose.model('MSFT', MicrosoftStockSchema, 'MICROSOFT');

module.exports = microsoftStockCollection;