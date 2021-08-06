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

const amznNews = require("../models/newsanalysis/amazonNewsAnalysisStock.js");
const aaplNews = require("../models/newsanalysis/appleNewsAnalysisStock.js");
const baNews = require("../models/newsanalysis/boeingNewsAnalysisStock.js");
const ebayNews = require("../models/newsanalysis/ebayNewsAnalysisStock.js");
const fNews = require("../models/newsanalysis/fordNewsAnalysisStock.js");
const msftNews = require("../models/newsanalysis/microsoftNewsAnalysisStock.js");
const nflxNews = require("../models/newsanalysis/netflixNewsAnalysisStock.js");
const qcomNews = require("../models/newsanalysis/qualcommNewsAnalysisStock.js");
const tslaNews = require("../models/newsanalysis/teslaNewsAnalysisStock.js");
const twtrNews = require("../models/newsanalysis/twitterNewsAnalysisStock.js");

const amznPrediction = require("../models/prediction/amznPrediction.js");
const aaplPrediction = require("../models/prediction/aaplPrediction.js");
const baPrediction = require("../models/prediction/baPrediction.js");
const ebayPrediction = require("../models/prediction/ebayPrediction.js");
const fPrediction = require("../models/prediction/fPrediction.js");
const msftPrediction = require("../models/prediction/msftPrediction.js");
const nflxPrediction = require("../models/prediction/nflxPrediction.js");
const qcomPrediction = require("../models/prediction/qcomPrediction.js");
const tslaPrediction = require("../models/prediction/tslaPrediction.js");
const twtrPrediction = require("../models/prediction/twtrPrediction.js");

router.get("/", (req, res) => {
  let dateY = new Date(Date.now() - 86400000);
  dateY = dateY.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
  });

  dateY = dateY.split("/");

  let yesterday = [];

  if (dateY[0] < 10 && dateY[1] < 10) {
    dateY[0] = 0 + dateY[0];
    dateY[1] = 0 + dateY[1];
  } else if (dateY[1] < 10) {
    dateY[1] = 0 + dateY[1];
  } else if (dateY[0] < 10) {
    dateY[0] = 0 + dateY[0];
  }

  yesterday[0] = dateY[2];
  yesterday[1] = dateY[0];
  yesterday[2] = dateY[1];

  yesterday = yesterday.join().replace(/,/g, "-");

  let checkPrediction = async () => {
    let responsePrice = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/AMZN,AAPL,BA,EBAY,F,MSFT,NFLX,QCOM,TSLA,TWTR?apikey=${process.env.FINANCIAL_MODEL}`
    );

    let dataPrice = await responsePrice.json();

    await amznNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[0].price) {
            amznPrediction.create([
              {
                stock: "AMZN",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[0].price &&
            data[0].overallScore.type == "positive"
          ) {
            amznPrediction.create(
              [
                {
                  stock: "AMZN",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[0].price &&
            data[0].overallScore.type == "negative"
          ) {
            amznPrediction.create(
              [
                {
                  stock: "AMZN",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[0].price &&
            data[0].overallScore.type == "neutral"
          ) {
            amznPrediction.create(
              [
                {
                  stock: "AMZN",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await aaplNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[1].price) {
            aaplPrediction.create([
              {
                stock: "AAPL",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[1].price &&
            data[0].overallScore.type == "positive"
          ) {
            aaplPrediction.create(
              [
                {
                  stock: "AAPL",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[1].price &&
            data[0].overallScore.type == "negative"
          ) {
            aaplPrediction.create(
              [
                {
                  stock: "AAPL",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[1].price &&
            data[0].overallScore.type == "neutral"
          ) {
            aaplPrediction.create(
              [
                {
                  stock: "AAPL",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await baNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[2].price) {
            baPrediction.create([
              {
                stock: "BA",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[2].price &&
            data[0].overallScore.type == "positive"
          ) {
            baPrediction.create(
              [
                {
                  stock: "BA",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[2].price &&
            data[0].overallScore.type == "negative"
          ) {
            baPrediction.create(
              [
                {
                  stock: "BA",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[2].price &&
            data[0].overallScore.type == "neutral"
          ) {
            baPrediction.create(
              [
                {
                  stock: "BA",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await ebayNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[3].price) {
            ebayPrediction.create([
              {
                stock: "EBAY",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[3].price &&
            data[0].overallScore.type == "positive"
          ) {
            ebayPrediction.create(
              [
                {
                  stock: "EBAY",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[3].price &&
            data[0].overallScore.type == "negative"
          ) {
            ebayPrediction.create(
              [
                {
                  stock: "EBAY",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[3].price &&
            data[0].overallScore.type == "neutral"
          ) {
            ebayPrediction.create(
              [
                {
                  stock: "EBAY",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await fNews.find({ hour: /20:10/i, date: yesterday }, function (err, data) {
      if (err) {
        res.json(err);
      } else {
        if (data[0].price === dataPrice[4].price) {
          fPrediction.create([
            {
              stock: "F",
              date: yesterday,
              predictionWasAccurate: 0,
              marketOpen: false,
            },
          ]);
        } else if (
          data[0].price > dataPrice[4].price &&
          data[0].overallScore.type == "positive"
        ) {
          fPrediction.create(
            [
              {
                stock: "F",
                date: yesterday,
                predictionWasAccurate: -1,
                marketOpen: true,
              },
            ],
            (error, createdStockData) => {
              if (error) {
                console.log(error);
              }
            }
          );
        } else if (
          data[0].price < dataPrice[4].price &&
          data[0].overallScore.type == "negative"
        ) {
          fPrediction.create(
            [
              {
                stock: "F",
                date: yesterday,
                predictionWasAccurate: -1,
                marketOpen: true,
              },
            ],
            (error, createdStockData) => {
              if (error) {
                console.log(error);
              }
            }
          );
        } else if (
          data[0].price !== dataPrice[4].price &&
          data[0].overallScore.type == "neutral"
        ) {
          fPrediction.create(
            [
              {
                stock: "F",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: true,
              },
            ],
            (error, createdStockData) => {
              if (error) {
                console.log(error);
              }
            }
          );
        }
        res.json(data);
      }
    });

    await msftNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[5].price) {
            msftPrediction.create([
              {
                stock: "MSFT",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[5].price &&
            data[0].overallScore.type == "positive"
          ) {
            msftPrediction.create(
              [
                {
                  stock: "MSFT",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[5].price &&
            data[0].overallScore.type == "negative"
          ) {
            msftPrediction.create(
              [
                {
                  stock: "MSFT",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[5].price &&
            data[0].overallScore.type == "neutral"
          ) {
            msftPrediction.create(
              [
                {
                  stock: "MSFT",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await nflxNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[6].price) {
            nflxPrediction.create([
              {
                stock: "NFLX",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[6].price &&
            data[0].overallScore.type == "positive"
          ) {
            nflxPrediction.create(
              [
                {
                  stock: "NFLX",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[6].price &&
            data[0].overallScore.type == "negative"
          ) {
            nflxPrediction.create(
              [
                {
                  stock: "NFLX",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[6].price &&
            data[0].overallScore.type == "neutral"
          ) {
            nflxPrediction.create(
              [
                {
                  stock: "NFLX",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await qcomNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[7].price) {
            qcomPrediction.create([
              {
                stock: "QCOM",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[7].price &&
            data[0].overallScore.type == "positive"
          ) {
            qcomPrediction.create(
              [
                {
                  stock: "QCOM",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[7].price &&
            data[0].overallScore.type == "negative"
          ) {
            qcomPrediction.create(
              [
                {
                  stock: "QCOM",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[7].price &&
            data[0].overallScore.type == "neutral"
          ) {
            qcomPrediction.create(
              [
                {
                  stock: "QCOM",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await tslaNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[8].price) {
            tslaPrediction.create([
              {
                stock: "TSLA",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[8].price &&
            data[0].overallScore.type == "positive"
          ) {
            tslaPrediction.create(
              [
                {
                  stock: "TSLA",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[8].price &&
            data[0].overallScore.type == "negative"
          ) {
            tslaPrediction.create(
              [
                {
                  stock: "TSLA",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[8].price &&
            data[0].overallScore.type == "neutral"
          ) {
            tslaPrediction.create(
              [
                {
                  stock: "TSLA",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );

    await twtrNews.find(
      { hour: /20:10/i, date: yesterday },
      function (err, data) {
        if (err) {
          res.json(err);
        } else {
          if (data[0].price === dataPrice[9].price) {
            twtrPrediction.create([
              {
                stock: "TWTR",
                date: yesterday,
                predictionWasAccurate: 0,
                marketOpen: false,
              },
            ]);
          } else if (
            data[0].price > dataPrice[9].price &&
            data[0].overallScore.type == "positive"
          ) {
            twtrPrediction.create(
              [
                {
                  stock: "TWTR",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price < dataPrice[9].price &&
            data[0].overallScore.type == "negative"
          ) {
            twtrPrediction.create(
              [
                {
                  stock: "TWTR",
                  date: yesterday,
                  predictionWasAccurate: -1,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          } else if (
            data[0].price !== dataPrice[9].price &&
            data[0].overallScore.type == "neutral"
          ) {
            twtrPrediction.create(
              [
                {
                  stock: "TWTR",
                  date: yesterday,
                  predictionWasAccurate: 0,
                  marketOpen: true,
                },
              ],
              (error, createdStockData) => {
                if (error) {
                  console.log(error);
                }
              }
            );
          }
          res.json(data);
        }
      }
    );
  };

  checkPrediction();
});

let taskSchedule2 = [{ hour: 16, minute: 00 }];

taskSchedule2.forEach(function (time) {
  let job = schedule.scheduleJob(time, function () {
    checkPrediction();
  });
});

router.get("/lastest/AAPL", (req, res) => {
  aaplNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/AMZN", (req, res) => {
  amznNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/BA", (req, res) => {
  baNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/EBAY", (req, res) => {
  ebayNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/F", (req, res) => {
  fNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/MSFT", (req, res) => {
  msftNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/NFLX", (req, res) => {
  nflxNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/QCOM", (req, res) => {
  qcomNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/TSLA", (req, res) => {
  tslaNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});
router.get("/lastest/TWTR", (req, res) => {
  twtrNews
    .findOne()
    .sort({ $natural: -1 })
    .limit(1)
    .exec(function (err, resp) {
      if (err) {
        console.log(err);
      } else {
        res.json(resp)
      }
    });
});

// EXPORT
module.exports = router;
