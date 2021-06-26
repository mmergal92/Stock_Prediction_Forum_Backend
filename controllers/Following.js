// Importing Dependencies

const express = require('express');
const router = express.Router();
const app = express();
const methodOverride = require('method-override');
const fetch = require('node-fetch');
let bodyParser = require('body-parser');

router.use(express.urlencoded({ extended: true}));
router.use(methodOverride('_method'));
router.use(express.json({
    type: ['application/json', 'text/plain']
  }))
  router.use(bodyParser.json());

  


router.get('/', (req, res) =>{
    // console.log(req.session.test)
    userComment.find({}, (err, foundUserComments) => {
        res.json(foundUserComments)
        // res.send('This page is for the user comments.')
})
})


// EXPORT
module.exports = router;