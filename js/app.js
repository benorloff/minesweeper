// /*----- constants -----*/
// const suits = ['s', 'c', 'd', 'h'];
// const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// // Build a 'master' deck of 'card' objects used to create shuffled decks
// const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

// /*----- app's state (variables) -----*/
// let shuffledDeck;

// /*----- cached element references -----*/
// const shuffledContainer = document.getElementById('shuffled-deck-container');

// /*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

// /*----- functions -----*/
// function getNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   const tempDeck = [...masterDeck];
//   const newShuffledDeck = [];
//   while (tempDeck.length) {
//     // Get a random index for a card still in the tempDeck
//     const rndIdx = Math.floor(Math.random() * tempDeck.length);
//     // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
//     newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
//   }
//   return newShuffledDeck;
// }

// function renderNewShuffledDeck() {
//   // Create a copy of the masterDeck (leave masterDeck untouched!)
//   shuffledDeck = getNewShuffledDeck();
//   renderDeckInContainer(shuffledDeck, shuffledContainer);
// }

// function renderDeckInContainer(deck, container) {
//   container.innerHTML = '';
//   // Let's build the cards as a string of HTML
//   let cardsHtml = '';
//   deck.forEach(function(card) {
//     cardsHtml += `<div class="card ${card.face}"></div>`;
//   });
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   container.innerHTML = cardsHtml;
// }

// function buildMasterDeck() {
//   const deck = [];
//   // Use nested forEach to generate card objects
//   suits.forEach(function(suit) {
//     ranks.forEach(function(rank) {
//       deck.push({
//         // The 'face' property maps to the library's CSS classes for cards
//         face: `${suit}${rank}`,
//         // Setting the 'value' property for game of blackjack, not war
//         value: Number(rank) || (rank === 'A' ? 11 : 10)
//       });
//     });
//   });
//   return deck;
// }

// renderNewShuffledDeck();

// DECLARE GLOBALLY SCOPED VARIABLES

// Buttons
const turnOneBtn = document.getElementById('turnOne');
const turnThreeBtn = document.getElementById('turnThree');
const undoBtn = document.getElementById('undo');
const newGameBtn = document.getElementById('newGame');
const timerBtn = document.getElementById('timerBtn');

// Play Area

const playAreaEl = document.getElementById('playArea');

// const deckEl = document.getElementById('deck');
// const discardEl = document.getElementById('discard');
// const aceZoneOneEl = document.getElementById('aceZoneOne');
// const aceZoneTwoEl = document.getElementById('aceZoneTwo');
// const aceZoneThreeEl = document.getElementById('aceZoneThree');
// const aceZoneFourEl = document.getElementById('aceZoneFour');
// const playStackOneEl = document.getElementById('playStackOne');
// const playStackTwoEl = document.getElementById('playStackTwo');
// const playStackThreeEl = document.getElementById('playStackThree');
// const playStackFourEl = document.getElementById('playStackFour');
// const playStackFiveEl = document.getElementById('playStackFive');
// const playStackSixEl = document.getElementById('playStackSix');
// const playStackSevenEl = document.getElementById('playStackSeven');

// Stats

const timerHrsEl = document.getElementById('timerHrs');
const timerMinsEl = document.getElementById('timerMins');
const timerSecsEl = document.getElementById('timerSecs');
const movesNumEl = document.getElementById('movesNum');
const stockNumEl = document.getElementById('stockNum');

// Timer Vars

let hours = 0;
let minutes = 0;
let seconds = 0;

// DECLARE GLOBALLY SCOPED EVENT LISTENERS

// Button click listeners
const turnOneClick = turnOneBtn.addEventListener('click', turnOne);
const turnThreeClick = turnThreeBtn.addEventListener('click', turnThree);
const undoClick = undoBtn.addEventListener('click', undo);
const newGameClick = newGameBtn.addEventListener('click', init);
const timerClick = timerBtn.addEventListener('click', timerStartStop);

// Play area click listeners
const playAreaClick = playAreaEl.addEventListener('click', cardClick);

// --- FUNCTIONS ---

// INIT
// Init() function starts a new game.
// Generate a randomly shuffled deck.
// Deal out cards to the play stacks.

function init() {
  console.log('The NEW GAME button was clicked');
}

// Button Functions

function turnOne() {
  console.log('The TURN ONE button was clicked');
}

function turnThree() {
  console.log('The TURN THREE button was clicked');
}

function undo() {
  console.log('The UNDO button was clicked');
}

function timerStartStop() {
  if (timerBtn.dataset.status === 'inactive') {
    timerBtn.dataset.status = 'active';
    timerBtn.classList.remove('start');
    timerBtn.classList.add('stop');
    timerBtn.innerText = 'Stop';
    timerStart();
  } else if (timerBtn.dataset.status === 'active') {
    timerBtn.dataset.status = 'inactive';
    timerBtn.classList.remove('stop');
    timerBtn.classList.add('start');
    timerBtn.innerText = 'Start';
    clearTimeout(timeElapsed);
  }
}

function timerStart() {
  timeElapsed = setTimeout(function() {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;
      if (minutes > 59) {
        minutes = 0;
        hours++;
        if (hours < 10) {
          timerHrsEl.innerText = `0${hours}`
        } else {
          timerHrsEl.innerText = `${hours}`
        };
      };
    };
    if (minutes < 10) {
      timerMinsEl.innerText = `0${minutes}`;
    } else {
      timerMinsEl.innerText = `${minutes}`;
    }
    if (seconds < 10) {
      timerSecsEl.innerText = `0${seconds}`;
    } else {
      timerSecsEl.innerText = `${seconds}`;
    }
    timerStart();
  }, 1000);
}

// Card Click Function

function cardClick(e) {
  if (e.target.id !== 'playArea') {
    console.log(`${e.target.id}`)
  } else {return;}
}