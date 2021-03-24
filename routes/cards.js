const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
    // Here, we're setting either the string "answer" or the string "question" to a variable called side
    const side = req.query.side; // "answer"
    // Here, we're setting the index of the client's desired "card" to a variable called id
    const id = req.params.id; // 1232
    
    if ( !side ) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    
    const name = req.cookies.username;
    // This step has two parts: we're getting the specific "card" from the "cards" array using the id variable as an index number
    // Then, once we have a "card" object, we're grabbing the string of text inside of its "answer" property and assigning it to the variable "text"
    // We get the string of text inside of "answer" — instead of "question" — because that's what the value of "side" above happens to be
    const text = cards[id][side];
    // Similarily, "hint" will contain the the string of text inside of the "hint" property of the the selected "card" object
    const hint = cards[id].hint;
    // set templateData to equal the text. 
    const templateData = { id, text, name };
    // we only want the hint if side = question.
    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.linkWord = 'Answer';
    } else if ( side === 'answer' ) {
        templateData.sideToShow = 'question';
        templateData.linkWord = 'Question';
    }
    // Finally, we build our card.pug template using the contents of templateData, and send the resulting HTML to the client
    res.render('card', templateData);
});

router.get('/', (req, res) => {
     const numberOfCards = cards.length;
     const flashcardId = Math.floor((Math.random() * numberOfCards)); // 1232
     console.log(flashcardId);
     res.redirect(`/cards/${flashcardId}`);
});

module.exports = router;