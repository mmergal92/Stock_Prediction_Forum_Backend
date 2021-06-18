const mongoose = require('mongoose');

const QualcommStockSchema = new mongoose.Schema({
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

const qualcommStockCollection = mongoose.model('QCOM', QualcommStockSchema, 'QUALCOMM');

module.exports = qualcommStockCollection;
