// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');

const dislikes = require('../models/likeanddislike/dislikeData.js')

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());





router.get('/give', (req, res) =>{
    
    dislikes.find({}, (error, founddislike) =>{
      res.json(founddislike)
    })
  })


  router.post('/add', (req, res) =>{
   
    dislikes.find({email: req.body.email, symbol: req.body.symbol, user: req.body.user, type: req.body.type, date: req.body.date}, function (error, founddislike){
    
          if(!founddislike.length){
            dislikes.create([{
    
              email: req.body.email,
              symbol: req.body.symbol,
              user: req.body.user,
              type: req.body.type,
              date: req.body.date
        
            }])
            console.log('dislike added')
            res.send('like added')
          } else {
            console.log('dislike duplicated')
            res.send('sowwy duplicated like')
          }
    
    
    
    })
  })


router.delete('/del', async (req, res) =>{
    
  await dislikes.findOneAndRemove({email: req.body.email, symbol: req.body.symbol, user: req.body.user, type: req.body.type, date: req.body.date})
  console.log('dislike removed')
  res.send('like removed')

  
})



// EXPORT
module.exports = router;