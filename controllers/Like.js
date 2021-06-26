// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');

const likes = require('../models/likeanddislike/likeData.js')
const dislikes = require('../models/likeanddislike/dislikeData.js')


router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());


  router.get('/everything', (req, res) =>{
    let arrayoflikes = [];
    likes.find({}, (error, foundlike) =>{
      dislikes.find({}, (error, founddislike)=>{
        arrayoflikes.push(foundlike,founddislike)
        res.json(arrayoflikes)
      })
    })
  })


router.get('/give', (req, res) =>{
    
    likes.find({}, (error, foundlike) =>{
      res.json(foundlike)
    })
  })


router.post('/add', (req, res) =>{
   
likes.find({email: req.body.email, symbol: req.body.symbol, user: req.body.user, type: req.body.type, date: req.body.date}, function (error, foundlike){

      if(!foundlike.length){
        likes.create([{

          email: req.body.email,
          symbol: req.body.symbol,
          user: req.body.user,
          type: req.body.type,
          date: req.body.date
    
        }])
        console.log('like added')
        res.send('like added')
      } else {
        console.log('like duplicated')
        res.send('sowwy duplicated like')
      }



})


           

    
})

router.delete('/del', async (req, res) =>{
    
  await likes.findOneAndRemove({email: req.body.email, symbol: req.body.symbol, user: req.body.user, type: req.body.type, date: req.body.date})
  console.log('like removed')
  res.send('like removed')

})



// EXPORT
module.exports = router;