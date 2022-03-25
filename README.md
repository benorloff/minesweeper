# Solitaire


## About

The word "solitaire" is used to refer to any tabletop game which one can play by oneself; however, most people associate solitaire with the game known as Klondike which is the version of solitaire that we will be playing in this app.

For simplicity's sake, any future reference of "solitaire" in this document refers to the Klondike variation of the game. 

It's not clear exactly when and where solitaire originated, but most evidence suggest its origin can be traced back to the late 18th century in northern Europe and Scandinavia.[^1]

Solitaire holds a special place in my heart as I have many fond memories of watching my Italian grandmother play the game when I was a child. That's why I chose solitaire as my first game to build. 

I hope that you enjoy playing this game as much as I enjoyed building it.

## Wireframe

![Solitaire App Wireframe](/img/Solitaire-Wireframe-v2.png)

This wireframe shows the rudimentary layout of my Solitaire app. The interface will prioritize simplicity by leveraging a minimalist design with only 3 main sections.

At the top, the app will display a simple logo on the left with buttons on the right that allow the user to perform simple actions, such as changing the number of cards in each "turn", undoing a move, or starting a new game. Future iterations of the app may contain additional user input options here.

In the middle of the window is the main play area, where all game play takes place. This area will use CSS grid to keep everything in its proper place and will use JS event listeners to determine user choices during game play.

Lastly, the bottom of the page will display some basic statistics, including time elapsed, number of moves, and number of cards remaining in the stock. Future iterations of the app may contain additional stats here. 

## Pseudocode


### Initiation

1. Randomly shuffle the deck
2. Deal cards to the playing stacks.
⋅⋅⋅ First stack should have only 1 card
⋅⋅⋅ Each stack should have a number of cards that is 1 greater than the previous stack
⋅⋅⋅ Only the last card in the stack should be face up
3. Place the remaining cards face down in the deal deck

### Listen for card clicks


1. Add event listeners to listen for clicks on cards in the draw deck, playing stacks, or discard pile. 
2. If the draw deck is clicked, move the top card to the discard pile and turn it face up.
⋅⋅⋅ If it is the last card in the draw deck, move the discard pile back to the draw deck in correct order.
3. If the discard pile is clicked, determine whether there is a valid location for the card to be moved.
⋅⋅⋅ If it is the last card in the discard pile, show placeholder.
4. If a card in the any of the playing stacks is clicked,
⋅⋅⋅ If it is the last card in the stack, determine if there is a valid location for the card in the ace zones.
⋅⋅⋅ If it is not the last card in the stack, group it with all cards below it in that stack and determine if there is a valid location for that group of cards to be moved based on the value of the topmost card in the group.

### Game Reset

1. When the reset button is clicked, run the init function to remove all cards, shuffle them, and redeal.

## Screenshots

![Screenshot 1](/img/Screenshot1.png)

The initial view before a game has been started.

![Screenshot 2](/img/Screenshot2.png)

The view immediately after a game has been started and the initial cards have been dealt.

![Screenshot 3](/img/Screenshot3.png)

During game play.

## Technologies Used

This app utilizes HTML, CSS, and JavaScript.

## Getting Started

It is my hope that the game play and user experience is intuitive, but in case anything is unclear, I've included instructions below.

### Object of the Game

The goal is to get the four suits built onto the foundations (the four "ace zones" located in the top right of the play area) from aces up through kings.

### The Deal

28 cards are dealt in seven piles as follows: The first pile is one card; the second pile has two cards, and so on up to seven in the last pile. The top card of each pile is face up; all others are face down.

A new game is dealt when the app is first loaded, as well as any time the "New Game" button is clicked.

### The Play[^2]

The four aces form the foundations. As it becomes available, each ace must be played to a row above the piles. Cards in the appropriate suit are then played on the aces in sequence - the two, then the three, and so on - as they become available.

Any movable card may be placed on a card next-higher in rank if it is of opposite color. Example: A black five may be played on a red six. If more than one card is face up on a tableau pile, all such cards must be moved as a unit.

When there is no face-up card left on a pile, the top face-down card is turned up and becomes available.

Only a king may fill an open space in the layout. The player turns up cards from the top of the stock in groups of three, and the top card of the three may be used for building on the piles, if possible, played on a foundation. If a card is used in this manner, the card below it becomes available for play. If the up-card cannot be used, the one, two, or three cards of the group are placed face up on the waste pile, and the next group of three cards is turned up.

### User Options

#### Turn 1 vs Turn 3

When Turn 1 is selected, each click of the deck will turn over only the top card of the deck, allowing that card to be entered into game play. 

When Turn 3 is selected, each click of the deck will turn over a group of 3 cards with only the last card of each group visible and eligible for use in game play.

#### Undo

Made a mistake? No problem! Just click the "Undo" button to undo your last move. This button can be clicked as many times as you'd like, all the way to the beginning of the current game.

#### New Game

Don't like the deal you got? Just click the "New Game" button to start a fresh new game with a newly shuffled deck of cards. 

This is also the button you'll want to press once you've won a game and want to play again :)

#### The Timer

You'll notice that whenever a new game is started, the timer located on the left side of the stats section (located below the play area) will begin displaying the time elapsed since the beginning of the game. 

Need to step away for a bit? Just click the "pause" button to stop the timer. When the timer is paused, you can click the "play" button at any time to restart the timer. 

## Next Steps

Future enhancements include:

1. Add a button that provides a hint to the user
2. Allow user to drag cards in addition to click
3. Add sound effects and a toggle to turn sound effects on/off
4. Add a game win animation sequence
5. Add an auto-complete feature that moves all cards to their appropriate foundations when no additional user input is required. Include toggle on/off for this feature.




[^1]: [Wikipedia: Solitaire](https://en.wikipedia.org/wiki/Solitaire)
[^2]: [Bicycle: How to play Klondike](https://bicyclecards.com/how-to-play/klondike/)