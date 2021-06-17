// Importing Dependencies

const express = require('express');
const router = express.Router();
const rssFeed = require('../models/rssFeed.js');
const teslaNews = require('../models/TeslaSeedData.js')
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
const { response } = require('express');

router.use(express.urlencoded({ extended: true }));
router.use(methodOverride('_method'))

// let title;
// let link;
// let pubDate;

// router.get("/", (req, res) =>{
// fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3DTesla%2Bafter%3A2021-03-29%2Bbefore%3A2021-06-14%26ceid%3DUS%3Aen%26hl%3Den-US%26gl%3DUS&api_key=l6cznbmdc52lrx9jqcdehgxbuvakchanxgbbb9gy&count=100')
// .then(res => res.json())
// .then((rssNewsInfo) =>{
// console.log(rssNewsInfo);
//     for (let rssNewsInfoArray = 0; rssNewsInfoArray < rssNewsInfo.items.length; rssNewsInfoArray++){
//         title = rssNewsInfo.items[rssNewsInfoArray].title;
//         link = rssNewsInfo.items[rssNewsInfoArray].link;
//         pubDate = rssNewsInfo.items[rssNewsInfoArray].pubDate;

//     const seedRss = () => {

//     rssFeed.create([{
//         title: title,
//         link: link,
//         pubDate: pubDate,
//     }],(error, rssFeedData) => {
//     if(error){
//         return console.log(error)
//     }
//   })
//     }
//     seedRss();

// }
// });
// });

const seedTeslaNews = (title, link, pubDate) => {
    rssFeed.create([{
        title: title,
        link: link,
        pubDate: pubDate
    }], (error, rssTeslaData) => {
        if (error){
            console.log(error)
        }
    })
}

router.get('/seedTesla', (req, res) =>{
    console.log(teslaNews);
    for (let i = 0; i < teslaNews.length; i++){
        for (let j = 0; j < teslaNews[i].items.length; j++){
            title = teslaNews[i].items[j].title,
            link = teslaNews[i].items[j].link,
            pubDate = teslaNews[i].items[j].pubDate

            // console.log(teslaNews[i].items[j].link)
            seedTeslaNews(title, link, pubDate)

        };

    }
    console.log("seeded")
})

// router.get('/', (req, res) =>{
//     res.send('Data Seeded!')
// })

router.get('/show', (req, res) => {
    rssFeed.find({}, (error, Data) => {
    if(error){
        return console.log(error)
    }
    res.json(Data)

});
})

// EXPORT
module.exports = router;