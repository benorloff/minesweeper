# Minesweeper


## About


## Wireframe


## Pseudocode


### Initiation

1. Randomly shuffle the deck
2. Deal cards to the playing stacks.
••* First stack should have only 1 card
••* Each stack should have a number of cards that is 1 greater than the previous stack
••* Only the last card in the stack should be face up
3. Place the remaining cards face down in the deal deck

### Listen for card clicks


1. Add event listeners to listen for clicks on cards in the draw deck, playing stacks, or discard pile. 
2. If the draw deck is clicked, move the top card to the discard pile and turn it face up.
••* If it is the last card in the draw deck, move the discard pile back to the draw deck in correct order.
3. If the discard pile is clicked, determine whether there is a valid location for the card to be moved.
••* If it is the last card in the discard pile, show placeholder.
4. If a card in the any of the playing stacks is clicked,
••* If it is the last card in the stack, determine if there is a valid location for the card in the ace zones.
••* If it is not the last card in the stack, group it with all cards below it in that stack and determine if there is a valid location for that group of cards to be moved based on the value of the topmost card in the group.

### Game Reset


1. When the reset button is clicked, run the init function to remove all cards, shuffle them, and redeal.

## Screenshots


## Technologies Used


## Getting Started


## Next Steps

