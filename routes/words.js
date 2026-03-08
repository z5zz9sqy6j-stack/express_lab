const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

router.get('/', (req, res)=>{
    res.send('word home page');
});

router.get('/wotd', async (req, res)=>{
    const data = await getwordfromdictionary();
    res.render('wotd', data);
});

module.exports = router;

async function getwordfromdictionary(){
    try{
        const file = await readFile('./resources/allwords.txt','utf8');

        const words = file.split('\n');

        const randomLine =
            words[Math.floor(Math.random() * words.length)];

        const [word, part, definition] = randomLine.split('|');

        return { word, part, definition };

    }catch(err){
        console.log(err);
    }
}