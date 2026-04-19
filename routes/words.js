const express = require('express');
const router = express.Router();
const { readFile } = require('fs').promises;

router.get('/', (req, res)=>{
    res.send('word home page');
});

router.get('/wotd', async (req, res)=>{
    let wordData;

if (req.query.word && req.query.part && req.query.definition) {
    wordData = {
        word: req.query.word,
        part: req.query.part,
        definition: req.query.definition
    };
} else {
    wordData = await getwordfromdictionary();
}

let userAnswer = req.query.answer;
let isCorrect;

if (userAnswer !== undefined) {
    isCorrect = userAnswer.trim().toLowerCase() === wordData.definition.trim().toLowerCase();
}

res.render('wotd', {
    word: wordData.word,
    part: wordData.part,
    definition: wordData.definition,
    isCorrect: isCorrect
});
});

router.get('/allwords', async (req, res)=>{

    try{

        let data = await readFile('resources/allwords.txt', 'utf8');
        let lines = data.split(/\r?\n/);
        let words = [];

        for(let i = 0; i < lines.length; i++){

            let line = lines[i].trim();

            if(line !== ''){

                let parts = line.split(/\s+/);

                let word = parts[0];
                let part = parts[1];
                let definition = parts.slice(2).join(' ');

                words.push({
                    word: word,
                    part: part,
                    definition: definition
                });
            }
        }

        words.sort(function(a, b){
            if(a.word < b.word) return -1;
            if(a.word > b.word) return 1;
            return 0;
        });

        res.render('allwords', { words });

    }
    catch(err){
        console.log(err);
    }

});

module.exports = router;

let getwordfromdictionary = async ()=>{

    try{

        let data = await readFile('resources/allwords.txt', 'utf8');
        let lines = data.split(/\r?\n/);

        let cleanLines = [];

        for(let i = 0; i < lines.length; i++){
            let line = lines[i].trim();

            if(line !== ''){
                cleanLines.push(line);
            }
        }

        let randomNumber = Math.floor(Math.random() * cleanLines.length);
        let randomLine = cleanLines[randomNumber];

        let parts = randomLine.split(/\s+/);

        let word = parts[0];
        let part = parts[1];
        let definition = parts.slice(2).join(' ');

        return {
            word: word,
            part: part,
            definition: definition
        };

    }
    catch(err){
        console.log(err);
    }

};