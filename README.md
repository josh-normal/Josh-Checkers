# Josh-Checkers-Game

A README.md file with these sections:

☐ <Your game's title>: A description of your game. Background info of the game is a nice touch.

☐ Screenshot(s): Images of your actual game.

☐ Maybe video

☐ Technologies Used: List of the technologies used, e.g., JavaScript, HTML, CSS...

☐ Getting Started: In this section include the link to your deployed game and any instructions you deem important.

☐ Next Steps: Planned future enhancements (icebox items).

☐ Pseudocode:
Some of the app's features may need to be pseudocoded, that is, outlining the app's logic in a plain, informal way.
Pseudocode the app's overall functionality first.
More detailed pseudocode for a given feature may be required later.

1. Define required constants

- define square that checker can go to: validSquare
-

2. Define required variables used to track the state of the game

- define Current player: Red / Black
- define game active or not: True / False
- define winning player: ''
- define possible move 1, 2, 3, 4(king)
- define count down how much checkers each person has

3. Handle event listener

- Player clicking a square

  - Validate if the square have the checker (red & black)
  - Validate their checker (black / red)
  - Check if it have any possible move
  - Show / Highlight the possible square to move
  - Click again to undo Validation
  - Or click another square and start again

- Player clicking a square to make move

  - Delete the checker in original square
  - Place the checker in the possible move chosen
  - If go pass other's player checker -> delete their checker
  - Set count down how many checker each player has
  - Check again for any other possible move
  - If yes:
    - Auto place the checker in the possible move
    - delete other's player checker
    - Set count down how many checker each player has
  - If checker reach last row from each side:
    - Delete the checker that square
    - Place the KING checker that square
  - Switch to other player turn

- player clicking quit/replay button
  - Reset active game status
  - Reset player move/turn
  - Remove all player's checkers
  - Place all player's checkers at starting point
  - Reset countdown

4. Function to handle event

- Render function

  - Reset active game status
  - Reset player move/turn
  - Remove all player's checkers
  - Place all player's checkers at starting point
  - Reset countdown

- Checker Selection Function

  - Validate if the square have the checker (red & black)
  - Validate player checker turn (black / red)
  - Click again to undo Validation
  - Or click another square and start again

- Check Possible Move Function

- Handle Move Selection
