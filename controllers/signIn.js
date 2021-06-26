// Importing Dependencies

const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const userAccountCollection = require('../models/useraccounts/userAccountData.js')
// const bodyParser = require('body-parser')
let bodyParser = require('body-parser');



// Middleware

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());
// router.use(bodyParser);

// Index Routes

router.get('/', (req, res) =>{
    
    console.log(req.sessionID)
res.send('hi')
})

router.post('/', (req, res) =>{
    console.log(req.body)
    userAccountCollection.find({email: req.body.email}, function (error, userAccount) {
        if(!userAccount.length){
            userAccountCollection.create([{
                email: req.body.email,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                imageUrl: req.body.imageUrl,
                fullName: req.body.fullName
            }], (error, createdUserAccount) =>{
                console.log('ACCOUNT SEEDED')
                if(error){
                    return console.log(error)
                }
            })
        } else {
            console.log('accont already in the database!')
        }
    })


        
    
    console.log(req.body)
res.send('hi')
})


// EXPORT
module.exports = router;