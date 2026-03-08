const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
req.send('word home page');

});

router.get('/wotd', (req, res)=>{
res.send('word of the day page');


});

module.exports = router;