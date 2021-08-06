// Importing Dependencies

const express = require("express");
const router = express.Router();
const app = express();
const methodOverride = require("method-override");
const fetch = require("node-fetch");
const schedule = require("node-schedule");
const axios = require("axios").default;

// Middleware

router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(methodOverride("_method"));

// Models

const amznNewsAnalysisCollection = require("../models/newsanalysis/amazonNewsAnalysisStock.js");
const aaplNewsAnalysisCollection = require("../models/newsanalysis/appleNewsAnalysisStock");
const baNewsAnalysisCollection = require("../models/newsanalysis/boeingNewsAnalysisStock");
const ebayNewsAnalysisCollection = require("../models/newsanalysis/ebayNewsAnalysisStock");
const fNewsAnalysisCollection = require("../models/newsanalysis/fordNewsAnalysisStock");
const msftNewsAnalysisCollection = require("../models/newsanalysis/microsoftNewsAnalysisStock");
const nflxNewsAnalysisCollection = require("../models/newsanalysis/netflixNewsAnalysisStock");
const qcomNewsAnalysisCollection = require("../models/newsanalysis/qualcommNewsAnalysisStock");
const tslaNewsAnalysisCollection = require("../models/newsanalysis/teslaNewsAnalysisStock");
const twtrNewsAnalysisCollection = require("../models/newsanalysis/twitterNewsAnalysisStock");

let sendSlack = async (success, errors) => {
  success.push('*')
  success.unshift('*')
  success = success.join(" ")
    await axios.post(`https://hooks.slack.com/services/${process.env.SLACK_SERVICE}`, {
      text: `Successfully Seeded Data For: \n ${success} \n \n while these failed: \n ${errors}` 
    })

}

let checkForSlack = (check, count, success, errors) =>{
  console.log(check, count, 'from checkfor')
  if(check == count){
    sendSlack(success, errors)
  }


}

let ratenews = async (arrOfTitles, dates, companies, check, errors, success, count) => {
  try {
    console.log(companies, 'ratenews')
    let hours = new Date();
    hours = hours
      .toLocaleString("en-US", {
        timeZone: "America/New_York",
      })
      .split(",")
      .pop();

    let newsScoredByDate = [
      {
        stock: companies,
        date: dates,
        ratings: [],
        overallScore: {
          type: 'neutral',
          score: 0,
        },
        ratios: {
          upPercent: 0,
          downPercent: 0,
        },
      },
    ];

    let todayPrice = 0

    const reducer = (a, b) => a + b;

    let positive = 0;
    let negative = 0;
    let neutral = 0;
    let scoresum = [];

    let responsePrice = await fetch(`https://financialmodelingprep.com/api/v3/quote-short/AMZN,AAPL,BA,EBAY,F,MSFT,NFLX,QCOM,TSLA,TWTR?apikey=${process.env.FINANCIAL_MODEL}`)

    let dataPrice = await responsePrice.json()


    

    for (let y = 0; y < arrOfTitles.length; y++) {
      let response = await fetch(
        `https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=${arrOfTitles[y].newsToScore}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.RAPID_API,
            "x-rapidapi-host": "twinword-sentiment-analysis.p.rapidapi.com",
          },
        }
      );

      let data = await response.json();

      if (data.type == "positive") {
        positive++;
      } else if (data.type == "negative") {
        negative++;
      } else if (data.type == "neutral") {
        neutral++;
      }
      if(data.type == undefined || data.score == undefined){

        // do nothing

      } else {

        await newsScoredByDate[0].ratings.push({
          type: data.type,
          score: data.score,
        });

      }
      

      await scoresum.push(data.score);
    }

    if (arrOfTitles.length == 1) {
      scoresum = scoresum[0];

      if (positive != 0) {
        newsScoredByDate[0].overallScore.type = "positive";
        newsScoredByDate[0].ratios.upPercent = 100;
        newsScoredByDate[0].ratios.downPercent = 0;
        newsScoredByDate[0].overallScore.score = scoresum;
      } else if (negative != 0) {
        newsScoredByDate[0].overallScore.type = "negative";
        newsScoredByDate[0].ratios.upPercent = 0;
        newsScoredByDate[0].ratios.downPercent = 100;
        newsScoredByDate[0].overallScore.score = scoresum;
      } else if (neutral != 0) {
        newsScoredByDate[0].overallScore.type = "neutral";
        newsScoredByDate[0].ratios.upPercent = 50;
        newsScoredByDate[0].ratios.downPercent = 50;
        newsScoredByDate[0].overallScore.score = scoresum;
      }
    } else {
      let sum = negative + positive;
      let ratio = 100 / sum;
      let positivePercent = ratio * positive;
      let negativePercent = ratio * negative;

      if (negative > positive) {
        newsScoredByDate[0].overallScore.type = "negative";
      } else if (positive > negative) {
        newsScoredByDate[0].overallScore.type = "positive";
      } else if (neutral > (positive + negative) / 2) {
        newsScoredByDate[0].overallScore.type = "neutral";
      } else if (positive == negative){
        newsScoredByDate[0].overallScore.type = "neutral";
      }
      scoresum = scoresum.reduce(reducer);

      newsScoredByDate[0].ratios.upPercent = positivePercent;
      newsScoredByDate[0].ratios.downPercent = negativePercent;
      newsScoredByDate[0].overallScore.score = scoresum;

      if (companies == "Amazon") {
        amznNewsAnalysisCollection.create(
          [
            {
              stock: "Amazon/AMZN",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[1].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Apple") {
        aaplNewsAnalysisCollection.create(
          [
            {
              stock: "AAPL",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[0].price

            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Boeing") {
        baNewsAnalysisCollection.create(
          [
            {
              stock: "BA",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[2].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Ebay") {
        ebayNewsAnalysisCollection.create(
          [
            {
              stock: "EBAY",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[3].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)
            }
          }
        );
      } else if (companies == "Ford") {
        fNewsAnalysisCollection.create(
          [
            {
              stock: "F",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[4].price
            },
          ],
          (error, createdStockData)=> {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)
            }
          }
        );
      } else if (companies == "Microsoft") {
        msftNewsAnalysisCollection.create(
          [
            {
              stock: "MSFT",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[5].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Netflix") {
        nflxNewsAnalysisCollection.create(
          [
            {
              stock: "NFLX",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[6].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Qualcomm") {
        qcomNewsAnalysisCollection.create(
          [
            {
              stock: "QCOM",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[7].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Tesla") {
        tslaNewsAnalysisCollection.create(
          [
            {
              stock: "TSLA",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[8].price
            },
          ],
         (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else if (companies == "Twitter") {
        twtrNewsAnalysisCollection.create(
          [
            {
              stock: "TWTR",
              date: dates,
              hour: hours,
              timezone: "GMT-4",
              ratings: newsScoredByDate[0].ratings,
              overallScore: {
                type: newsScoredByDate[0].overallScore.type,
                score: scoresum,
              },
              ratios: {
                upPercent: positivePercent,
                downPercent: negativePercent,
              },
              price: dataPrice[9].price
            },
          ],
          (error, createdStockData) => {
            success.push(companies)

            if (error) {
              console.log(error)
              errors.push(companies)

            }
          }
        );
      } else {
        // do nothing
      }

  

      console.dir(newsScoredByDate, {
        depth: null,
      });
    }
    
    console.log(check, count)
    if(check == count){
      success.push(companies)
      sendSlack(success, errors)
    }
    // console.log(scoresum);
  } catch (error) {
    console.log(error);
  }
};

let getnewsarticles = async (company, check, errors, success, count) => {
  try {
    // console.log(company)
    let dateraw = new Date();
    dateraw = dateraw.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    });

    dateraw = dateraw.split("/");
    // console.log(company, '1 checking company name')

    let dateToday = [];


    if (dateraw[0] < 10 && dateraw[1] < 10) {
      dateraw[0] = 0 + dateraw[0];
      dateraw[1] = 0 + dateraw[1];
    } else if (dateraw[1] < 10) {
      dateraw[1] = 0 + dateraw[1];
    } else if (dateraw[0] < 10) {
      dateraw[0] = 0 + dateraw[0];
    }

    dateToday[0] = dateraw[2];
    dateToday[1] = dateraw[0];
    dateToday[2] = dateraw[1];

    dateToday = dateToday.join().replace(/,/g, "-");

    let arrayOfNewswDate = [];
    let arrayOfTitles = [];

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${company}&from=${dateToday}&to=${dateToday}&sortBy=popularity&language=en&apiKey=${process.env.NEWS_API3}`
    );

    const news = await response.json();

    for (let x = 0; x < news.articles.length; x++) {
      if (news.articles[x].publishedAt.slice(0, 10) == dateToday) {
        if (
          news.articles[x].title.includes(company) ||
          news.articles[x].description.includes(company)
        ) {
          // console.log(company, 'inside loop')
          arrayOfNewswDate.push({
            // arrayOfNewswDate into the database
            date: news.articles[x].publishedAt,
            title: news.articles[x].title,
            description: news.articles[x].description,
          });
          // console.log(news.articles[x].title, news.articles[x].description)
          arrayOfTitles.push({
            date: news.articles[x].publishedAt.slice(0, 10),
            newsToScore: encodeURI(
              `${news.articles[x].title} ${news.articles[x].description}`
            ),
          });



        }
      } else {
        // do nothing
      }
    }

    if (arrayOfTitles.length == 0) {
      --check
      --count
      errors.push(`\n *${company} | Reason: No New News* \n`)
      console.log(check)
      checkForSlack(check, count, success, errors)
      // do nothing
    } else {

      console.log(company, ' 2 checking company name')

      await ratenews(arrayOfTitles, dateToday, company, check, errors, success, count);

    }


  } catch (error) {
    console.log(error);
  }
};

let taskSchedule = [
  { hour: 23, minute: 55 },
  { hour: 02, minute: 10 }, 
  { hour: 04, minute: 25 },
  { hour: 06, minute: 40 },
  { hour: 08, minute: 55 },
  { hour: 11, minute: 10 },
  { hour: 13, minute: 25 },
  { hour: 15, minute: 40 },
  { hour: 17, minute: 55 },
  { hour: 20, minute: 10 },
];
taskSchedule.forEach(function (time) {
  let job = schedule.scheduleJob(time, function () {
    
    start();
    
  });
});

let start = async () => {
  
  let success = []
  let errors = []
  let count = 0
  let companies = [
    "Apple",
    "Tesla",
    "Amazon",
    "Ford",
    "Boeing",
    "Microsoft",
    "Netflix",
    "Qualcomm",
    "Twitter",
    "Ebay",
  ];
  let check = companies.length
  

  for (let stocks = 0; stocks < companies.length; stocks++) {
    await count++
    await getnewsarticles(companies[stocks], check, success, errors, count);

  }
};

// EXPORT
module.exports = router;
