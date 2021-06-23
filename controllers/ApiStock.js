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
    
    console.log(req.session.test)
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

/////////////////////// test





router.get("/test", (req, res) => {

    // let arr1 = [];
    // let arr2 = [];
    // let arr3 = [];
    // let newsdate;
    // let newstitle;
    // let newsdate2;
    // let newstitle2;
    // let sortedarr;


    // let news = [
    //     {
    //       _id: { $oid: "60cab16d1d17690ed52aefca" },
    //       title: "Monica Lozano joins Apple's board of directors - Apple Newsroom",
    //       link: "https://www.apple.com/newsroom/2021/01/monica-lozano-joins-apples-board-of-directors/",
    //       pubDate: "2021-01-05 08:00:00",
    //       __v: { $numberInt: "0" },
    //     },
    //     {
    //       _id: { $oid: "60cab16d1d17690ed52aefc9" },
    //       title: "Apple removes Parler from the App Store - The Verge",
    //       link: "https://www.theverge.com/2021/1/9/22221730/apple-removes-suspends-bans-parler-app-store",
    //       pubDate: "2021-01-09 08:00:00",
    //       __v: { $numberInt: "0" },
    //     },
    //     {
    //       _id: { $oid: "60cab16d1d17690ed52aefc8" },
    //       title:
    //         "Apple services entertain, inform, and connect the world in unprecedented year - Apple Newsroom",
    //       link: "https://www.apple.com/newsroom/2021/01/apple-services-entertain-inform-and-connect-the-world-in-unprecedented-year/",
    //       pubDate: "2021-01-06 08:00:00",
    //       __v: { $numberInt: "0" },
    //     },
    //     {
    //       _id: { $oid: "60cab16d1d17690ed52aefc7" },
    //       title:
    //         "Apple launches major new Racial Equity and Justice Initiative projects to challenge systemic racism, advance racial equity nationwide - Apple Newsroom",
    //       link: "https://www.apple.com/newsroom/2021/01/apple-launches-major-new-racial-equity-and-justice-initiative-projects-to-challenge-systemic-racism-advance-racial-equity-nationwide/",
    //       pubDate: "2021-01-13 08:00:00",
    //       __v: { $numberInt: "0" },
    //     },
    //     {
    //       _id: { $oid: "60cab16d1d17690ed52aefce" },
    //       title:
    //         "Apple Negotiating with Hyundai for Apple Car Production [Updated x2] - MacRumors",
    //       link: "https://www.macrumors.com/2021/01/07/apple-car-hyundai-negotiations/",
    //       pubDate: "2021-01-07 08:00:00",
    //       __v: { $numberInt: "0" },
    //     },
    //     {
    //       _id: { $oid: "60cab16d1d17690ed52aefcd" },
    //       title: "A glance at Apple’s plans for 2021 - Computerworld",
    //       link: "https://www.computerworld.com/article/3602791/a-glance-at-apple-s-plans-for-2021.html",
    //       pubDate: "2021-01-07 08:00:00",
    //       __v: { $numberInt: "0" },
    //     },
    //   ];

//       let organize = (array) => {
        


//       }

//       let check = (array) => {


//         for(let y = 0; y < array.length; y++){

//             newsdate2 = array[y].newsdate;
//             // checka = checka.slice(0, 10)
//             newstitle2 = array[y].title

//             arr2.push({date: newsdate2, title: newstitle2})

//         }

//         organize(arr2);

//     }

//       let run = () => {


//           for(let x = 0; x < news.length; x++){
//           newsdate = news[x].pubDate.slice(0, 10);
//           newstitle = news[x].title;
//         //   checka = newsdate;
//         //   if(checka)
//         console.log(newsdate)
//       arr1.push({newsdate: new Date(newsdate), title: newstitle})

      
    
//     }
    
//     sortedarr = arr1.sort((a, b) => b.newsdate - a.newsdate)
//     check(sortedarr);
// }
//     run();

//       for(let x = 0; x < news.length; x++){

          
//           for(let y = 0; y < news.length; y++){
//               if(!arr1.length){
//                   arr1.push({date: news[x].pubDate})
//               }
              
//               if (news[x].pubDate === arr1.date){
//                   arr1.date.push(news[x].title)
//               }
//           }
//       }
    
    
//     res.json(arr1);  REPLIT CODE HERE
//     const fetch = require('node-fetch')

// let news = [
// {
// date: "2021-01-13T00:00:00.000Z",
// title: "Apple Launches"
// },
// {
// date: "2021-01-13T00:00:00.000Z",
// title: "Apple Profit"
// },
// {
// date: "2021-01-13T00:00:00.000Z",
// title: "Apple Cries"
// },
// {
// date: "2021-01-09T00:00:00.000Z",
// title: "Apple removes Parler from the App Store - The Verge"
// },
// {
// date: "2021-01-07T00:00:00.000Z",
// title: "Apple Negotiating with Hyundai for Apple Car Production [Updated x2] - MacRumors"
// },
// {
// date: "2021-01-07T00:00:00.000Z",
// title: "A glance at Apple’s plans for 2021 - Computerworld"
// },
// {
// date: "2021-01-07T00:00:00.000Z",
// title: "Apple's new CEO Kanye West"
// },{
// date: "2021-01-07T00:00:00.000Z",
// title: "Apple's new CEO Kanye West"
// },
// {
// date: "2021-01-06T00:00:00.000Z",
// title: "Apple services entertain, inform, and connect the world in unprecedented year - Apple Newsroom"
// },
// {
// date: "2021-01-05T00:00:00.000Z",
// title: "Monica Lozano joins Apple's board of directors - Apple Newsroom"
// }
// ]


// let arr2 = [];
// let arr3 = [];
// let arrayReadyForDBClear = [];
// let sentiment = []
// let scoresum = [];

// let var1;
// let var2;
// let data;
// let var4;
// // let var5;

// let getSentimentofTitles = async (text) => {


// const response = await fetch(`https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=${text}`, {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "72f50517f2mshc36070332df1ebcp1e748djsndf6e61a62301",
// 		"x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com"
// 	}
// })
// return response.json()

// // return await sentiment.push([data.score, text.date.slice(0,10)]) 

//  console.log(data.score)

  
// }

// let arrofDateswNews = [];

// let sumscores = async (arr) => {

// return arr.reduce((a, b) => a + b, 0)

// }

// let pushTitlesintoNewsTitleArray =  async (arr) => {

//   for(let z = 0; z < arr.length; z++){
//     for(let q = 0; q < news.length; q++){
//       if(arr3[z].date === news[q].date.slice(0,10)){
//         if(arr3[z].scores.includes(news[q].title)){

//         } else {

//           // var4 = encodeURI(news[q].title)

          
//             const dailyscore = await getSentimentofTitles(encodeURI(news[q].title))
//             // console.log(dailyscore,news[q].title)
            
//           // arrofDateswNews.push([arr3[z].date, news[q].title])


//           arr3[z].scores.push(dailyscore.score)
//           // await console.log(dailyscore)
    

          
         

//         }

//       // console.log(scoresum)

//       }
//     }
//     const sum  = await sumscores(arr[z].scores)
//     arr[z].scores = sum;
//     console.log(arr3)

//   }
//   // console.log(arrofDateswNews)
  
//   arr = arr3
//   // console.log(arr3)
//   arrayReadyForDBClear = arr3;
//   // return arr;
  
// }


// let createsArraywithEmptyTitle = (arr) =>{

//   // console.log(arr)
//    for(let y = 0; y < arr.length; y++){
//       arr3.push({date: arr[y], scores: []})
//       // console.log(arr3)
//   }

//   pushTitlesintoNewsTitleArray(arr3);

//   return arr;
// }

// let getUniqueDates = (arr) => {

//   for(let x = 0; x < arr.length; x++){
//     if(!arr2.includes(arr[x].date.slice(0,10))){

//     var1 = arr[x].date.slice(0,10)
//     arr2.push(var1)
//     // console.log(arr2)
//     }
    
    
  

//   }
 
  
//   createsArraywithEmptyTitle(arr2);
//   return arr2;

// }


// getUniqueDates(news)



// // console.log(arrayReadyForDBClear)

// // let hi = () => {
// //   console.log(sentiment)
// // }

// // setTimeout(hi, 3000)
// let hey2 = () => {
  
//   for(let t = 0; t < news.length; t++){
//   getSentimentofTitles(news[t])
// }

// // console.log(sentiment)
// }

// hey2();
// // let var3 = news[4].title;

// // console.log(sentiment)
// // getSentimentofTitles(var3)
// // console.log(var4)
});



// EXPORT
module.exports = router;