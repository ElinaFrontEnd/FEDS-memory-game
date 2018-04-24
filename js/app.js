/*
 * Define variables
 * TODO: review if all definitions are valid and needed
 */

// 
const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const starsContainer = document.querySelector(".stars");
const star = document.querySelector(".star");

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

// 
const htmlTextToAdd = "<li class=\"star\"><i class=\"fa fa-star\"></i></li>";


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
    // Increments moves count by 1
    counter++;
    movesCount.innerHTML = counter;
    // Removes stars at certain moves counts
    switch (counter) {
        case 10:
            starsContainer.querySelector("li").remove();
            break;
        case 18:
            starsContainer.querySelector("li").remove();
            break;
        case 24:
            starsContainer.querySelector("li").remove();
            break;
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

/* 
 * Restart the game
 */
function restartGame() {
    // TODO: shuffle(allImagesArray);

    // Close all cards
    allCards.forEach(function(element) {
    element.classList.remove("show", "open", "match");
    });
    
    //Reset counter
    counter = 0;
    movesCount.innerHTML = counter;
    
    // Reset the stop watch
    clearTimeout(clearTime); 
    seconds = 0; minutes = 0; hours = 0;
    secs = '0' + seconds; mins = '0' + minutes + ': '; hrs = '0' + hours + ': ';
    let gameTime = document.getElementById("timer");
    gameTime.innerHTML = "Time: 00:00:00" ;
    
    // Reset stars count
    while (starsContainer.childElementCount < 3) {
        starsContainer.insertAdjacentHTML("afterbegin", htmlTextToAdd);       
    }
    
};

/*
 *Event listeners
 */

// Listens if a card inside a deck is clicked and calls other functions
deck.addEventListener("click", function(evt) {
    // if event target is card in a deck opens card and continues to execute code
    if (evt.target.nodeName === "LI") {
        openCard(evt)
        // if time is equal to 0 starts the timer
        if ( seconds === 0 && minutes === 0 && hours === 0 ) {
            startTime();
        }
        // If 2 cards are open increment move count & check for match
        let openCards = deck.querySelectorAll(".open");
        if (openCards.length ===  2) {
            // Increases moves count by 1
            countingMoves();
            // Assigns variables to the open cards
            let card1 = openCards[0].querySelector("i").className;
            let card2 = openCards[1].querySelector("i").className;
            // Validate if cards matches
            if (card1 === card2) {
                cardsMatch(openCards);
            } else {
                cardsDontMatch(openCards);
            }
        }
    }
    //TODO update length, add popup window
    // if all cards matches, finish the game
    if (deck.querySelectorAll(".match").length === 2) {
        gameCompleted();
        stopTime();
    }
});
                      
restart.addEventListener("click", restartGame);


/*
 * Timer 
 */

// initialize your variables outside the function
let count = 0;
let clearTime;
let seconds = 0, minutes = 0, hours = 0;
let secs, mins, hrs;
const gameTime = document.getElementById("timer");

function startTime( ) {
    // format how second should look
    secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    // if seconds is equal to 60 add +1 to minutes and set seconds to 0
    if (seconds === 60) {
        seconds = 0;
        minutes = minutes + 1;
    }
    // format how minutes should look
    mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    // if minutes is equal to 60 add +1 to hours and set minutes to 0
    if ( minutes === 60 ) {
        minutes = 0;
        hours = hours + 1;
    }
    // format how hours should look
    hrs = (hours < 10) ? ('0' + hours + ':') : (hours + ':');
    // display the stopwatch
    gameTime.innerHTML = 'Time: ' + hrs + mins + secs;
    // increment seconds by +1 to keep it counting
    seconds++;
    // call the setTimeout() to keep the stop watch alive !
    clearTime = setTimeout("startTime( )", 1000);
}


//create a function to stop the time
function stopTime( ) {
    // Keep if different message needs to be kept
    gameTime.innerHTML = "Time: " + hrs + mins + secs;
    clearTimeout(clearTime); 
}
