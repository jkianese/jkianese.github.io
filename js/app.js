/*, 
 * Create a list that holds all of your cards
 */

 const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o",
        "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", 
        "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", 
        "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

 function createCards(card) {
     return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
 };       

 // Global Variables
const deck = document.querySelector('.deck'); 
const numMoves = document.querySelector('.moves'); 
let clockOff = true;
let openCards = [];
let clockId;
let moves = 0; 
let stars = 3; 
let time = 0;  
let matched = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 // Start Game and Shuffle Cards
function startGame() { 
        
    let cardHTML = shuffle(cards).map(function(card) {
        return createCards(card); 
    });
    moves = 0;
    numMoves.innerText = moves; 
    deck.innerHTML = (cardHTML.join('')); 
    flipCards(); 
}
startGame();
flipCards();

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 
document.querySelector('.card').addEventListener('click', flipCards);

document.querySelector('.restart').addEventListener('click', restartGame);

function flipCards() { 
    
    let allCards = document.querySelectorAll('.card');
        allCards.forEach(function(card) { 
            card.addEventListener('click', function(event) {  
                const clickCard = event.target;  
                if (!card.classList.contains('open') && 
                !card.classList.contains('show') && 
                !card.classList.contains('match') &&
                (twoCardsFlipped(clickCard))) {
                    openCards.push(this);
                        if (clockOff) {
                            startClock(); 
                            clockOff = false; 
                        }
                            card.classList.add('open', 'show'); 
                                if (openCards.length === 2) {
                                    checkForMatch(clickCard);
                                    updateScore(); 
                                }
                }    
            });
        });
}    

function checkForMatch() {
     
    if (openCards[0].dataset.card == openCards[1].dataset.card) {
        openCards[0].classList.add('match');
        openCards[0].classList.add('open');
        openCards[0].classList.add('show');

        openCards[1].classList.add('match');
        openCards[1].classList.add('open');
        openCards[1].classList.add('show');
        matched++;
        openCards = [];            
    } else {
        // no match
        setTimeout(function() {
            openCards.forEach(function(card) {
                card.classList.remove('open', 'show');
                    return false;  
                }); 
            openCards = [];
            }, 1000);
        }     
moves += 1; 
numMoves.innerText = moves;
        
        if (matched === 8) {
            clearInterval(clockId); 
            endGame(); 
        }
} 

// Prevent 3rd card from being flipped
function twoCardsFlipped(clickCard) {
    return (
        clickCard.classList.contains('card') &&
        !clickCard.classList.contains('match') &&
        openCards.length < 2 &&
        !openCards.includes(clickCard)
    );      
}

// Score
function updateScore () {
    if (moves === 12 || moves === 20) {
        removeStar(); 
    }
}

function removeStar() {
    Stars = document.querySelectorAll('.stars li'); 
    for (star of Stars) {
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            // decrement stars
            stars--;  
            break;
        }
    }
}
  
// Timer
function startClock() {
    clockId = setInterval(function (event) {
        time++;
        displayTime();
    }, 1000);
}

function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60); 
    const seconds = time % 60;
    
    if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
        clock.innerHTML = `${minutes}:${seconds}`;
    }
}

// Modal
function openModal() {
    modalStats(); 

    const modal = document.querySelector('.modal_background');
    modal.classList.toggle('modal_hide');
}
openModal();  
openModal(); 

function modalStats() {
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves'); 
    const starsStat = document.querySelector('.modal_stars'); 

    timeStat.innerHTML = `Time = ${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`;
    starsStat.innerHTML = `Stars = ${stars}`; 
}

//Modal Buttons 
document.querySelector('.modal_cancel').addEventListener('click', function(event) {
    openModal(); 
});

document.querySelector('.modal_replay').addEventListener('click', replayGame);  

function restartGame() {
    resetCards(); 
    resetTimer(); 
    resetMoves();
    resetStars(); 
}

function resetTimer() {
    clearInterval(clockId); 
    clockOff = true; 
    time = 0;
    displayTime(); 
}

function resetMoves() {
    moves = 0; 
    document.querySelector('.moves').innerHTML = moves; 
}

function resetStars() {
    stars = 3; 
    const starList = document.querySelectorAll('.stars li');
    for (star of starList) {
        star.style.display = 'inline';
    }
}

function resetCards() {
    openCards.push(); 
    openCards = []; 
    matched = 0; 
    startGame();   
}

function replayGame() {
    resetCards(); 
    resetTimer(); 
    resetMoves();
    resetStars();
    openModal(); 
}

function endGame() { 
    openModal(); 
}

/* I spent weeks working on this code, but owe attributions
to the following people and sources 
(without whom I may not have completed this project):
    Attributions: 

    Mike Wales FEND P3: Memory Card Game
        https://www.youtube.com/watch?v=_rUH-sEs68Y&index=14&list=WL&t=0s
    Matthew Crawford - Walkthrough series
        https://matthewcranford.com/
    Yahya Elharony
        https://www.youtube.com/watch?v=G8J13lmApkQ&t=0s&index=16&list=WL
    Memory Game Webinar with Ryan Waite
        https://www.youtube.com/watch?v=oECVwum-7Zc
*/        