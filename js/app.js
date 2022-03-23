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
  discardPileEl,
  aceZoneOneEl,
  aceZoneTwoEl,
  aceZoneThreeEl,
  aceZoneFourEl,
  playStackOneEl,
  playStackTwoEl,
  playStackThreeEl,
  playStackFourEl,
  playStackFiveEl,
  playStackSixEl,
  playStackSevenEl
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
  discard = [],
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
        // Setting color for the card
        color: `${suit}` === 'c' ? 'b' : `${suit}` === 's' ? 'b' : `${suit}` === 'h' ? 'r' : 'r',
        // Setting the suit of the card
        suit: `${suit}`,
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
  renderNewShuffledDeck();
  dealDeck();
  timerReset();
  timerStartStop();
  // console.log('The NEW GAME button was clicked');
}

function dealDeck() {
  clearCardStacks();
  // Set the stackIdx to 4 so we don't deal to the ace zones
  let stackIdx = 5;
  // Store the startingIdx. This will ++ when reaching the last playStack.
  let startingIdx = 5;
  // console.log(shuffledDeck)
  // Loop through shuffledDeck and deal to the stacks.
  shuffledDeck.forEach(card => {
    // Declare the slice var
    let slice = shuffledDeck.slice(shuffledDeck.indexOf(card), shuffledDeck.indexOf(card) + 1)
    // Only deal the first 28 cards
    if (shuffledDeck.indexOf(card) <= 27 && stackIdx < 12) {
      if (stackIdx < 11) {
        cardStacks[stackIdx].unshift(slice);
        stackIdx++;
        // console.log(`Stack IDX = ${stackIdx}`)
      }
      else if (stackIdx === 11) {
        cardStacks[stackIdx].unshift(slice);
        startingIdx++;
        // Start next loop at subsequent stack
        stackIdx = startingIdx;
        // console.log(`Stack IDX = ${stackIdx}`)
        // console.log(`Starting IDX = ${startingIdx}`)
      }
    } else {return;}
  })
  //Remove the 28 cards that were dealt from the deck
  shuffledDeck.splice(0, 28);
  updateStockCount();
  renderPlayStacks();
  // console.log(cardStacks);
  // console.log(shuffledDeck);
}

// Clear card stacks on init

function clearCardStacks() {
  cardStacks.forEach(stack => {
    let stackIdx = cardStacks.indexOf(stack);
    let playStackEl = playStackElArr[stackIdx];
    stack.forEach(cards => {
      playStackEl.innerHTML = '';
    })
  })
  cardStacks.forEach(stack => {
    stack.splice(0, stack.length);
  })

}

// Render the dealt cards in the playStacks

function renderPlayStacks() {
  cardStacks.forEach(stack => {
    let stackIdx = cardStacks.indexOf(stack);
    // console.log(stackIdx);
    let playStackEl = playStackElArr[stackIdx];
    stack.forEach(cards => {
      let cardsHtml = '';
      cards.forEach(card => {
        let newCardDiv = document.createElement('div');
        newCardDiv.classList.add('card', 'cardInStack', 'xlarge');
        newCardDiv.classList.add(`${card.face}`);
        // Only apply style to playStacks, not discard or ace zones
        if (stackIdx >= 5) {
          // Set top 20px below previous card
          newCardDiv.setAttribute('style', `top: ${stack.indexOf(cards) * 20}px`)
          // Set data-location to playStacks
          newCardDiv.setAttribute('data-location', 'playStacks');
          // Set data-value
          newCardDiv.setAttribute('data-value', `${card.value}`);
          // Set data-color
          newCardDiv.setAttribute('data-color', `${card.color}`);
          // Set data-suit
          newCardDiv.setAttribute('data-suit', `${card.suit}`);
          // Set data-face
          newCardDiv.setAttribute('data-face', `${card.face}`)
        }
        else if (stackIdx <= 4 && stackIdx > 0) {
          // Set top 0px
          newCardDiv.setAttribute('style', 'top: 0px')
          // Set data-location to playStacks
          newCardDiv.setAttribute('data-location', 'aceZones');
          // Set data-value
          newCardDiv.setAttribute('data-value', `${card.value}`);
          // Set data-color
          newCardDiv.setAttribute('data-color', `${card.color}`);
          // Set data-suit
          newCardDiv.setAttribute('data-suit', `${card.suit}`);
          // Set data-face
          newCardDiv.setAttribute('data-face', `${card.face}`)
        }
        else if (stackIdx === 0) {
          // Set top 0px
          newCardDiv.setAttribute('style', 'top: 0px')
          // Set data-location to playStacks
          newCardDiv.setAttribute('data-location', 'discard');
          // Set data-value
          newCardDiv.setAttribute('data-value', `${card.value}`);
          // Set data-color
          newCardDiv.setAttribute('data-color', `${card.color}`);
          // Set data-suit
          newCardDiv.setAttribute('data-suit', `${card.suit}`);
          // Set data-face
          newCardDiv.setAttribute('data-face', `${card.face}`)
        }
        playStackEl.append(newCardDiv);
        // console.log(playStackEl);
        // console.log(cardsHtml);
        // console.log(card);
        // console.log(`cardsHtml is ${cardsHtml}`);
      })
    })
  })
}

// function turnCards() {
//   let turn = shuffledDeck.slice(0, 1);
//   cardStacks[0].push(turn);
//   shuffledDeck.splice(0, 1);
//   console.log('discard is ' + shuffledDeck.splice(0, 1)[0].face)
//   let cardFace = shuffledDeck.splice(0,1)[0].face;
//   let newCardDiv = document.createElement('div');
//   newCardDiv.classList.add('card', 'cardInStack', 'xlarge');
//   newCardDiv.classList.add(`${cardFace}`)
//   newCardDiv.setAttribute('style', 'top: 0px;');
//   newCardDiv.setAttribute('data-location', 'discard');
//   discardPileEl.append(newCardDiv);
// }

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

function timerReset() {
  hours = 0;
  minutes = 0;
  seconds = 0;
}

// Card Click Function

function cardClick(e) {
  if (e.target.id !== 'playArea') {
    console.log(`${e.target.id}`)
    switch (true) {
      case (e.target.id === 'deck'):
        deckClick();
        break;
      case (e.target.parentElement.id === 'discard'):
        discardClick();
        break;
      case (e.target.dataset.location === 'aceZones'):
        aceZoneClick();
        break;
      case (e.target.dataset.location === 'playStacks'):
        playStacksClick(e);
        break;
    }
  } else {return;}
}

function deckClick() {
  if (shuffledDeck.length >= 1) {
    cardStacks[0].push([shuffledDeck.pop()]);
  } else {
    masterDeckEl.classList.remove('back-red');
  }
  renderPlayStacks();
}

function discardClick() {
  console.log('The discard was clicked');
  cardStacks.forEach(stack => {
    if (stack.length > 0 && stack[stack.length - 1][0].value === cardStacks[0][cardStacks[0].length - 1].value + 1 && stack[stack.length - 1][0].color !== cardStacks[0][cardStacks[0].length - 1].color) {
      stack.push(cardStacks[0].shift());
      return;
      // stack.push(discardDeck.unshift());
    }
  })
  renderPlayStacks();
}

function aceZoneClick() {
  console.log('One of the ace zones was clicked');
}

function playStacksClick(e) {
  console.log('One of the play stacks was clicked');
  console.log(e.target);
  let color = e.target.dataset.color;
  let value = e.target.dataset.value;
  let suit = e.target.dataset.suit;
  let parentId = e.target.parentElement.id;
  let stackIdx = [
    'discard',
    'aceZoneOne',
    'aceZoneTwo',
    'aceZoneThree',
    'aceZoneFour',
    'playStackOne',
    'playStackTwo',
    'playStackThree',
    'playStackFour',
    'playStackFive',
    'playStackSix',
    'playStackSeven'
  ]
  // let face = e.target.dataset.face;
  console.log(`Color: ${color} + Value: ${value} + Suit: ${suit}`);
  //STEP 1: Only allow clicks on cards that are facing up
  //STEP 2: First, check if the card clicked is the last in the stack
  //// If it is, then first check if it can go in any of the ace zones
  ////// If it can, then move the object AND the div to aceZone
  ////// If it can't, check if it can go on any of the other play stacks
  //////// If it can, then move the object AND the div to playStack
  //////// It it can't, return.
  ////STEP 3 If the card is not the last, it needs to be grouped with all below

  // Check if the card clicked is the last in the stack
  if (!e.target.nextSibling) {
    console.log(parentId);
    if (e.target.dataset.suit === 's' && cardStacks[1].length === e.target.dataset.value - 1) {
      e.target.setAttribute('style', 'top: 0px;');
      aceZoneOneEl.append(e.target);
      cardStacks[1].push(cardStacks[`${stackIdx.indexOf(parentId)}`].pop());
    } else if (e.target.dataset.suit === 'h' && cardStacks[2].length === e.target.dataset.value - 1) {
      e.target.setAttribute('style', 'top: 0px;');
      aceZoneTwoEl.append(e.target);
      cardStacks[2].push(cardStacks[`${stackIdx.indexOf(parentId)}`].pop());
    } else if (e.target.dataset.suit === 'd' && cardStacks[3].length === e.target.dataset.value - 1) {
      e.target.setAttribute('style', 'top: 0px;');
      aceZoneThreeEl.append(e.target);
      cardStacks[3].push(cardStacks[`${stackIdx.indexOf(parentId)}`].pop());
    } else if (e.target.dataset.suit === 'c' && cardStacks[4].length === e.target.dataset.value - 1) {
      e.target.setAttribute('style', 'top: 0px;');
      aceZoneFourEl.append(e.target);
      cardStacks[4].push(cardStacks[`${stackIdx.indexOf(parentId)}`].pop());
    } else {return;}
    console.log('This is the last card in the stack');
  }

}

function updateStockCount() {
  stockNumEl.innerText = shuffledDeck.length;
}