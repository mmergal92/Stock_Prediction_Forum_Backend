const mongoose = require('mongoose');

const NetflixStockSchema = new mongoose.Schema({
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

const netflixStockCollection = mongoose.model('NFLX', NetflixStockSchema, 'NETFLIX');

module.exports = netflixStockCollection;
