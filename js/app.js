/*
 * Define variables
 * TODO: review if all definitions are valid and needed
 */

// 
const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const stars = document.querySelectorAll(".stars");

// Returns node list for all cards and card images
const allCards = document.querySelectorAll("li.card");
const cardImages = deck.querySelectorAll("i");
// Returns array for card images
const allImagesArray = Array.from(cardImages);

// Returns node list for all open and match cards
const matchCards = deck.querySelectorAll(".match");

// Moves Counter
let counter = 0;
const movesCount = document.querySelector(".moves");


// Display card
function openCard (evt) {
    // validates if no more than 2 cards are open at the same time
    if (deck.querySelectorAll(".open").length < 2) {
        // opens the card
        evt.target.classList.add("open", "show");
    };
};

// if cards match change their class
function cardsMatch(openCards) {
    openCards[0].classList.replace("open", "match");
    openCards[1].classList.replace("open", "match")
}

// If cards don't match close them after timeout
function cardsDontMatch(openCards) {
    setTimeout(function() {
        openCards[0].classList.remove("open", "show");
        openCards[1].classList.remove("open", "show");                
    }, 1500);
}

function gameCompleted() {
    console.log("All Cards Opened");
}

function countingMoves() {
    counter += 1;
    movesCount.innerHTML = counter;
    let star = document.querySelector(".fa-star");
    // TODO: add stars back at restart 
    switch (counter) {
        case 1:
            star.classList.remove("fa-star");
        case 12:
            star.classList.remove("fa-star");
        case 18:
            star.classList.remove("fa-star");
    }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* RestartGame function 
 * TODO: update for the real restart
 */
function restartGame() {
//    shuffle(allImagesArray);

    allCards.forEach(function(element) {
    element.classList.remove("show", "open", "match");
    });
    
    counter = 0;
    movesCount.innerHTML = counter;
};

/*
 *Event listeners
 */



// Listens if a card inside a deck is clicked and calls openCard function
deck.addEventListener("click", function(evt) {
    if (evt.target.nodeName === "LI") {
        openCard(evt);
        let openCards = deck.querySelectorAll(".open");
        if (openCards.length ===  2) {
            // Increases moves count by 1
            countingMoves();
            // Assigns variables to the open cards
            let card1 = openCards[0].querySelector("i").className;
            let card2 = openCards[1].querySelector("i").className;
            // Validate if cards matchesn
            if (card1 === card2) {
                cardsMatch(openCards);
            } else {
                cardsDontMatch(openCards);
            }
        }
    }
    //TODO update length, add popup window
    if (deck.querySelectorAll(".match").length === 2) {
        gameCompleted();
    }
});
                      
restart.addEventListener("click", restartGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one) - DONE
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) - DONE
 *  - if the list already has another card, check to see if the two cards match - DONE
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) - DONE
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) - DONE
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) - DONE
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
