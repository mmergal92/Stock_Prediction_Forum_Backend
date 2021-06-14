// Importing Dependencies

const express = require('express');
const router = express.Router();
const hDataStock = require('../models/stockprice/hDataStock.js');
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');

// Stock Collections

const amazonStockCollection = require('../models/stockprice/amazonStockData.js');
const appleStockCollection = require('../models/stockprice/appleStockData.js');
const boeingStockCollection = require('../models/stockprice/boeingStockData.js');
const ebayStockCollection = require('../models/stockprice/ebayStockData.js');
const fordStockCollection = require('../models/stockprice/fordStockData.js');
const microsoftStockCollection = require('../models/stockprice/microsoftStockData.js');
const qualcommStockCollection = require('../models/stockprice/qualcommStockData.js');
const teslaStockCollection = require('../models/stockprice/teslaStockData.js');
const twitterStockCollection = require('../models/stockprice/twitterStockData.js');
const netflixStockCollection = require('../models/stockprice/netflixStockData.js');



// Middleware

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))


// Variables used to seed Data

// let open;
// let symbol;
// let date;
// let close;
// let changeActual;
// let changePercent;
// let volume;
// let vwap;
// let label;


// Index Route

router.get('/', (req, res) =>{
    res.send('Add the company stock symbol to the URL e.g. api/stock/TSLA')
})


// Seed Data Route /api/go change the URL 

router.get("/go", (req, res) =>{

    //UNCOMMENT THIS TO SEED NEW DATA

    // console.log('correct page')
    // fetch('https://financialmodelingprep.com/api/v3/historical-price-full/NFLX?apikey=305952e0741dadc3ef05bf897cba9326')
    // .then(res => res.json())
    // .then((stockPrice) => {
       
        
    //     symbol = stockPrice.symbol;

    //     for (let apiStockArray = 0; apiStockArray < stockPrice.historical.length; apiStockArray++){
    //         open = stockPrice.historical[apiStockArray].open;
    //         date = stockPrice.historical[apiStockArray].date;
    //         close = stockPrice.historical[apiStockArray].close;
    //         changeActual = stockPrice.historical[apiStockArray].change;
    //         changePercent = stockPrice.historical[apiStockArray].changePercent;
    //         volume = stockPrice.historical[apiStockArray].volume;
    //         vwap = stockPrice.historical[apiStockArray].vwap;
    //         label = stockPrice.historical[apiStockArray].label;

    //         const seedData = () => {

    //             hDataStock.create([{
    //                 symbol: symbol,
    //                 open: open,
    //                 date: date,
    //                 close: close,
    //                 changeActual: changeActual,
    //                 changePercent: changePercent,
    //                 volume: volume,
    //                 vwap: vwap,
    //                 label: label
    //             }],(error, createdStockData) => {

    //                 console.log(`Seeding ${symbol} Data Now ${date}`)
    //                 if(error){
    //                     return console.log(error)
    //                 }
                    

    //             })

    //         }
            
           
    //         seedData(); // At the end of the array it runs the function to add the information into the DB

    //     }
    //     console.log('Data Fully Seeded')
    // })
    
    
});

// Stock Price Routes for the API

// Amazon

router.get('/stock/price/AMZN', (req, res) => {
    amazonStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Apple

router.get('/stock/price/AAPL', (req, res) => {
    appleStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Boeing

router.get('/stock/price/BA', (req, res) => {
    boeingStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// eBay

router.get('/stock/price/EBAY', (req, res) => {
    ebayStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Ford

router.get('/stock/price/F', (req, res) => {
    fordStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Microsoft

router.get('/stock/price/MSFT', (req, res) => {
    microsoftStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Qualcomm

router.get('/stock/price/QCOM', (req, res) => {
    qualcommStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

//  Tesla

router.get('/stock/price/TSLA', (req, res) => {
    teslaStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Twitter 

router.get('/stock/price/TWTR', (req, res) => {
    twitterStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});

// Netflix

router.get('/stock/price/NFLX', (req, res) => {
    netflixStockCollection.find({}, (error, Data) => {
        res.json(Data)
    })

});



// EXPORT
module.exports = router;