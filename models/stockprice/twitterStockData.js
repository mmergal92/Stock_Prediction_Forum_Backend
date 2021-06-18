const mongoose = require('mongoose');

const TwitterStockSchema = new mongoose.Schema({
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

const twitterStockCollection = mongoose.model('TWTR', TwitterStockSchema, 'TWITTER');

module.exports = twitterStockCollection;
