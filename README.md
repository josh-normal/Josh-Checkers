# Josh-Checkers-Game

# Description:

checkers, also called draughts, board game, one of the world’s oldest games. Checkers is played by two persons who oppose each other across a board of 64 light and dark squares, the same as a chessboard. The 24 playing pieces are disk-shaped and of contrasting colours. At the start of the game, each contestant has 12 pieces arranged on the board. While the actual playing is always done on the dark squares, the board is often shown in reverse for clarity.

# About Checkers Game:

Today’s game of checkers developed around the start of the 12th century. A Frenchman came up with the idea of playing checkers on a chess board. At that time, the game was called “Fierges” or “Ferses.” With a new board design and new rules set, the game made its way to England and the Americas.

Today, most English-speaking countries use a 64-space checker board. This is known as the short king board version. However, much of Europe and Asia use a checker board with 100 spaces. This is called the long king version. Some people in Canada even use a board with 144 spaces!

Checkers remains a popular game around the world today. For many children, it’s the first game they learn how to play. Teachers have long known that the simple game of checkers can provide significant training in thought and logic. Of course, it also keeps players occupied with fun competition.

- [Source](https://wonderopolis.org/wonder/Which-Came-First:-Checkers-or-Chess)

# Reviews

# Technologies Used:

JavaScript, HTML, CSS...

# Instructions:

Markup :

1. Take Control of the Center
   Beginners often place their checkers on the edge of the board. This seems like a reasonable strategy, because your pieces on the edge cannot be captured.
   But as it turns out, pushing your checkers to the edges is a mistake.
   Try to form a pyramid shape with your pieces.
2. Play offensive
   Because of the possibility of forced moves, your opponent can presents you with a capture you must take. Because of this, you cannot afford to sit back and fortify.
   You could be forced to jump your checkers into oblivion at any time and no defense that you build can stand up over time.

# Wireframe:

![Alt text](https://git.generalassemb.ly/josh-vn/Josh-Checkers-Game/blob/master/img/wireframe.png)

# Pseudocode:

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
