/*-----GLOBALLY SCOPED VARIABLES-----*/

// Card Val Arrays
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Buttons
const turnOneBtn = document.getElementById('turnOne');
const turnThreeBtn = document.getElementById('turnThree');
const undoBtn = document.getElementById('undo');
const newGameBtn = document.getElementById('newGame');
const timerBtn = document.getElementById('timerBtn');

// Play Area
const playAreaEl = document.getElementById('playArea');
const masterDeckEl = document.getElementById('deck');
const discardPileEl = document.getElementById('discard');

// Play Stacks
const aceZoneOneEl = document.getElementById('aceZoneOne');
const aceZoneTwoEl = document.getElementById('aceZoneTwo');
const aceZoneThreeEl = document.getElementById('aceZoneThree');
const aceZoneFourEl = document.getElementById('aceZoneFour');
const playStackOneEl = document.getElementById('playStackOne');
const playStackTwoEl = document.getElementById('playStackTwo');
const playStackThreeEl = document.getElementById('playStackThree');
const playStackFourEl = document.getElementById('playStackFour');
const playStackFiveEl = document.getElementById('playStackFive');
const playStackSixEl = document.getElementById('playStackSix');
const playStackSevenEl = document.getElementById('playStackSeven');

const playStackElArr = [
  'aceZoneOneEl',
  'aceZoneTwoEl',
  'aceZoneThreeEl',
  'aceZoneFourEl',
  'playStackOneEl',
  'playStackTwoEl',
  'playStackThreeEl',
  'playStackFourEl',
  'playStackFiveEl',
  'playStackSixEl',
  'playStackSevenEl'
]

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

// Turn Var
let turnNum = 1;

// Card Stacks array to store all played cards
// Initial deal is 28 cards

let cardStacks = [
  aceZoneOne = [],
  aceZoneTwo = [],
  aceZoneThree = [],
  aceZoneFour = [],
  playStackOne = [],
  playStackTwo = [],
  playStackThree = [],
  playStackFour = [],
  playStackFive = [],
  playStackSix = [],
  playStackSeven = []
]

/*-----DECLARE GLOBALLY SCOPED EVENT LISTENERS-----*/

// Button click listeners
const turnOneClick = turnOneBtn.addEventListener('click', turnOne);
const turnThreeClick = turnThreeBtn.addEventListener('click', turnThree);
const undoClick = undoBtn.addEventListener('click', undo);
const newGameClick = newGameBtn.addEventListener('click', init);
const timerClick = timerBtn.addEventListener('click', timerStartStop);

// Play area click listeners
const playAreaClick = playAreaEl.addEventListener('click', cardClick);

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
renderDeckInContainer(masterDeck, masterDeckEl);

// Create a 'discard' deck to store card objects when they
// they are turned from the shuffledDeck 
const discardDeck = [];

/*----- app's state (variables) -----*/
let shuffledDeck;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('deck');
const discardContainer = document.getElementById('discard');

/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderNewShuffledDeck);

/*----- functions -----*/
function getNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  const newShuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function renderNewShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  shuffledDeck = getNewShuffledDeck();
  renderDeckInContainer(shuffledDeck, shuffledContainer);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  let cardsHtml = '';
  deck.forEach(function(card) {
    cardsHtml += `<div class="card ${card.face}"></div>`;
  });
  // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
  // const cardsHtml = deck.reduce(function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of solitaire
        value: Number(rank) || (rank === 'A' ? 1 : (rank === 'J' ? 11 : (rank === 'Q' ? 12 : 13)))
      });
    });
  });
  return deck;
}

renderNewShuffledDeck();

/*-----FUNCTIONS-----*/

// INIT
// Init() function starts a new game.
// Generate a randomly shuffled deck.
// Deal out cards to the play stacks.

function init() {
  clearCardStacks();
  renderNewShuffledDeck();
  dealDeck();
  timerStartStop();
  console.log('The NEW GAME button was clicked');
}

function dealDeck() {
  // Set the stackIdx to 4 so we don't deal to the ace zones
  let stackIdx = 4;
  // Store the startingIdx. This will ++ when reaching the last playStack.
  let startingIdx = 4;
  console.log(shuffledDeck)
  // Loop through shuffledDeck and deal to the stacks.
  shuffledDeck.forEach(card => {
    // Declare the slice var
    let slice = shuffledDeck.slice(shuffledDeck.indexOf(card), shuffledDeck.indexOf(card) + 1)
    // Only deal the first 28 cards
    if (shuffledDeck.indexOf(card) <= 27 && stackIdx < 11) {
      if (stackIdx < 10) {
        cardStacks[stackIdx].unshift(slice);
        stackIdx++;
        console.log(`Stack IDX = ${stackIdx}`)
      }
      if (stackIdx === 10) {
        cardStacks[stackIdx].unshift(slice);
        startingIdx++;
        // Start next loop at subsequent stack
        stackIdx = startingIdx;
        console.log(`Stack IDX = ${stackIdx}`)
        console.log(`Starting IDX = ${startingIdx}`)
      }
    } else {return;}
  })
  //Remove the 28 cards that were dealt from the deck
  shuffledDeck.splice(0, 28);
  updateStockCount();
  console.log(cardStacks);
  console.log(shuffledDeck);
}

// Clear card stacks on init

function clearCardStacks() {
  cardStacks.forEach(stack => {
    stack.splice(0, stack.length);
  })
}

// Render the dealt cards in the playStacks

// function renderPlayStacks(card, playStackEl) {
//   playStackEl.innerHTML = '';
//   // Let's build the cards as a string of HTML
//   let cardsHtml = '';
//   cardsHtml += `<div class="card">5</div>`;
//   // Or, use reduce to 'reduce' the array into a single thing - in this case a string of HTML markup 
//   // const cardsHtml = deck.reduce(function(html, card) {
//   //   return html + `<div class="card ${card.face}"></div>`;
//   // }, '');
//   playStackEl.innerHTML = cardsHtml;
//   console.log(card.face + playStackEl);
// }

// renderPlayStacks();

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
    timerStart();
  } else if (timerBtn.dataset.status === 'active') {
    timerStop();
  }
}

function timerStart() {
  timerBtn.dataset.status = 'active';
  timerBtn.classList.remove('start');
  timerBtn.classList.add('stop');
  timerBtn.innerText = 'Stop';
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

function timerStop() {
  timerBtn.dataset.status = 'inactive';
  timerBtn.classList.remove('stop');
  timerBtn.classList.add('start');
  timerBtn.innerText = 'Start';
  clearTimeout(timeElapsed);
}

// Card Click Function

function cardClick(e) {
  if (e.target.id !== 'playArea') {
    console.log(`${e.target.id}`)
    switch (true) {
      case (e.target.id === 'deck'):
        deckClick();
        break;
      case (e.target.id === 'discard'):
        discardClick();
        break;
      case (e.target.dataset.location === 'aceZones'):
        aceZoneClick();
        break;
      case (e.target.dataset.location === 'playStacks'):
        playStacksClick();
        break;
    }
  } else {return;}
}

function deckClick() {
  if (shuffledDeck.length >= 1) {
    console.log('The deck was clicked');
    console.log('Starting Shuffled Deck:');
    console.log(shuffledDeck);
    const lastClass = discardPileEl.classList[discardPileEl.classList.length - 1];
    discardDeck.unshift(shuffledDeck.pop());
    discardPileEl.classList.remove(lastClass);
    discardPileEl.classList.add(`${discardDeck[0].face}`);
    console.log('New Discard Deck:')
    console.log(discardDeck);
    console.log('Ending Shuffled Deck:')
    console.log(shuffledDeck);
  } else {
    masterDeckEl.classList.remove('back-red');
  }
}

function discardClick() {
  console.log('The discard was clicked');
}

function aceZoneClick() {
  console.log('One of the ace zones was clicked');
}

function playStacksClick() {
  console.log('One of the play stacks was clicked');
}

function updateStockCount() {
  stockNumEl.innerText = shuffledDeck.length;
}