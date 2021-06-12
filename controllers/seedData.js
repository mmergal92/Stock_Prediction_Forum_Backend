// Importing Dependencies

const express = require('express');
const router = express.Router();
const hDataStock = require('../models/hDataStock.js');
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))

let open;
let symbol;
let date;
let close;
let changeActual;
let changePercent;
let volume;
let vwap;
let label;

router.get('/', (req, res) =>{
    res.send('Data Seeded!')
})

router.post("/", (req, res) =>{
    // fetch('https://financialmodelingprep.com/api/v3/historical-price-full/TSLA?apikey=305952e0741dadc3ef05bf897cba9326')
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
    //                 if(error){
    //                     return console.log(error)
    //                 }
                    

    //             })

    //         }
            

    //         seedData(); // At the end of the array it runs the function to add the information into the DB

    //     }
    
    // })
    
    
});

router.get('/show', (req, res) => {
    hDataStock.find({}, (error, Data) => {
        res.json(Data)
    })

});

// EXPORT
module.exports = router;