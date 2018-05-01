"use strict";
/*
 * Cards
 */

const deck = document.querySelector(".deck");
const restart = document.querySelector(".restart");
const starsContainer = document.querySelector(".stars");
const allCards = document.querySelectorAll("li.card");

// Moves Counter
let counter = 0;
const movesCounter = document.querySelector(".moves");
let disableClick = true;

// initialize timer variables
let clearTime;
let seconds = 0;
let minutes = 0;
let hours = 0;
let secs;
let mins;
let hrs;
const gameTime = document.getElementById("timer");

// Shuffles node list
function shuffle() {
    let i;
    for (i = deck.children.length; i >= 0; i--) {
        deck.appendChild(deck.children[Math.random() * i | 0]);
    }
}

// Display card
function openCard (evt) {
    // validates if no more than 2 cards are open at the same time
    if (deck.querySelectorAll(".open").length < 2) {
        // opens the card
        evt.target.classList.add("open", "show");
    }
}

// if cards match change their class
function cardsMatch(openCards) {
    openCards[0].classList.replace("open", "match");
    openCards[1].classList.replace("open", "match");
}

// If cards don't match close them after timeout
function cardsDontMatch(openCards) {
    setTimeout(function() {
        openCards[0].classList.remove("open", "show");
        openCards[1].classList.remove("open", "show");
        disableClick = true;
    }, 1500);
}

// Increments counter by 1
function countingMoves() {
    // Increments moves count by 1
    counter++;
    movesCounter.innerHTML = counter;
    // Removes stars at certain moves counts
    switch (counter) {
        case 12:
            starsContainer.querySelector("li").remove();
            break;
        case 18:
            starsContainer.querySelector("li").remove();
            break;
    }
}

// Restart game
function restartGame() {
    // Shuffle the game
    shuffle();
    // Close all cards
    allCards.forEach(function(element) {
    element.classList.remove("show", "open", "match");
    });
    //Reset counter
    counter = 0;
    movesCounter.innerHTML = counter;
    // Reset the stop watch
    clearTimeout(clearTime);
    seconds = 0; minutes = 0; hours = 0;
    secs = "0" + seconds; mins = "0" + minutes + ": "; hrs = "0" + hours + ": ";
    gameTime.innerHTML = "Time: 00:00:00";
    // Reset stars count
    const htmlTextToAdd = "<li class=\"star\"><i class=\"fa fa-star\"></i></li>";
    while (starsContainer.childElementCount < 3) {
        starsContainer.insertAdjacentHTML("afterbegin", htmlTextToAdd);
    }
}

// When all cards are opened and matces, display stars and time result
function displayResults() {
    let starsResult = starsContainer.childElementCount;
    let starsText = "You've finished the game with " + starsResult + " stars.";
    let timeResult = document.getElementById("timer").textContent;
    let timeText = timeResult;
    document.querySelector(".final-stars").textContent = starsText;
    document.querySelector(".game-time").textContent = timeText;
    modal.style.display = "block";
}

/*
 * Timer
 */

function startTime( ) {
    // format how second should look
    secs = (seconds < 10) ? ("0" + seconds) : (seconds);
    // if seconds is equal to 60 add +1 to minutes and set seconds to 0
    if (seconds === 60) {
        seconds = 0;
        minutes = minutes + 1;
    }
    // format how minutes should look
    mins = (minutes < 10) ? ("0" + minutes + ":") : (minutes + ":");
    // if minutes is equal to 60 add +1 to hours and set minutes to 0
    if ( minutes === 60 ) {
        minutes = 0;
        hours = hours + 1;
    }
    // format how hours should look
    hrs = (hours < 10) ? ("0" + hours + ":") : (hours + ":");
    // display the stopwatch
    gameTime.innerHTML = "Time: " + hrs + mins + secs;
    // increment seconds by +1 to keep it counting
    seconds = seconds + 1;
    // call the setTimeout() to keep the stop watch alive !
    clearTime = setTimeout("startTime()", 1000);
}

// function to stop the time
function stopTime( ) {
    // Keep if different message needs to be kept
    gameTime.innerHTML = "Time: " + hrs + mins + secs;
    clearTimeout(clearTime);
}

/*
 *Event listeners and default functions
 */

// Call shuffle function
shuffle();

// Listens if a card inside a deck is clicked and calls other functions
deck.addEventListener("click", function(evt) {
    // if event target is card in a deck opens card and continues to execute code
    if (evt.target.nodeName === "LI") {
        openCard(evt);
        // if time is equal to 0 starts the timer
        if ( seconds === 0 && minutes === 0 && hours === 0 ) {
            startTime();
        }
        // If 2 cards are open increment move count & check for match
        let openCards = deck.querySelectorAll(".open");
        if (openCards.length ===  2 && disableClick) {
            // Increases moves count by 1
            countingMoves();
            // Assigns variables to the open cards
            let card1 = openCards[0].querySelector("i").className;
            let card2 = openCards[1].querySelector("i").className;
            // Validate if cards matches
            if (card1 === card2) {
                cardsMatch(openCards);
            } else {
                disableClick = false;
                cardsDontMatch(openCards);
            }
        }
    }
    // if all cards matches, finish the game
    if (deck.querySelectorAll(".match").length === 16) {
        stopTime();
        displayResults();
    }
});

// Restarts the game when restart button clicked
restart.addEventListener("click", restartGame);


/*
 * MODAL
 */

// Get the modal
const modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};