/*
 * A complete tic-tac-toe widget, using JQuery.  Just include this 
 * script in a browser page and play.  A tic-tac-toe game will be 
 * included as a child element of the element with id "tictactoe".  
 * If the page has no such element, it will just be added at the end 
 * of the body.
 */

$(function () {

    let squares = [], 
        SIZE = 3,
        EMPTY = "&nbsp;",
        score,
        moves,
        turn = "X",

    /*
     * To determine a win condition, each square is "tagged" from left
     * to right, top to bottom, with successive powers of 2.  Each cell
     * thus represents an individual bit in a 9-bit string, and a
     * player's squares at any given time can be represented as a
     * unique 9-bit value. A winner can thus be easily determined by
     * checking whether the player's current 9 bits have covered any
     * of the eight "three-in-a-row" combinations.
     *
     *     273                 84
     *        \               /
     *          1 |   2 |   4  = 7
     *       -----+-----+-----
     *          8 |  16 |  32  = 56
     *       -----+-----+-----
     *         64 | 128 | 256  = 448
     *       =================
     *         73   146   292
     *
     */
    wins = [7, 56, 448, 73, 146, 292, 273, 84],

    /*
     * Clears the score and move count, erases the board, and makes it
     * X's turn.
     */
    startNewGame = function () {
        turn = "X";
        score = {"X": 0, "O": 0};
        moves = 0;
        squares.forEach(function (square) {square.html(EMPTY);});
        $("#tictactoe").css("font-size", "50px")
        $("#tictactoe").css("color", "black");
        $("#tictactoe").css("font-family", "cursive");
        $("#tictactoe").css("background-color", "#58BC82");
        
        document.getElementById("btn").style.display = "none";

        document.getElementById("btn").onclick = function() {  
            playAgain()  
        };  
    },

    playAgain = function () {
        location.reload()
    },

    /*
     * Returns whether the given score is a winning score.
     */
    win = function (score) {
        for (let i = 0; i < wins.length; i += 1) {
            if ((wins[i] & score) === wins[i]) {
                return true;
            }
        }
        return false;
    },

    /*
     * Sets the clicked-on square to the current player's mark,
     * then checks for a win or cats game.  Also changes the
     * current player.
     */
    set = function () {
        
        if ($(this).html() !== EMPTY) {
            return;
        }
        $(this).html(turn);
        console.log($(this));
        moves += 1;
        score[turn] += $(this)[0].indicator;
        console.log(score[turn]);

        if (win(score[turn])) {
            if (turn === "X"){
                $(document).ready(function(){
                    $("#x").fadeOut(3000, function(){
                        $("#x").text("Winner is Player X !");
                    });
                    $("#x").fadeIn(3000, function(){
                    });
                    document.getElementById("btn").style.display = "block";
                });
            } 
            else {
                $(document).ready(function(){
                    $("#o").fadeOut(3000, function(){
                        $("#o").text("Winner is Player O !");
                    });
                    $("#o").fadeIn(3000, function(){
                    });
                    document.getElementById("btn").style.display = "block";
                });
            }


            //alert("Player " + turn + " is the winner! Click ok to play again.");
            startNewGame();
        } else if (moves === SIZE * SIZE) {
            alert("Cat\u2019s game!");
            startNewGame();
        } else {
            turn = turn === "X" ? "O" : "X";
        }
    },

    /*
     * Creates and attaches the DOM elements for the board as an
     * HTML table, assigns the indicators for each cell, and starts
     * a new game.
     */
    play = function () {
        let board = $("<table border=10 cellspacing=0 width=300 height=300 bordercolor=white>"), indicator = 1;
        for (let i = 0; i < SIZE; i += 1) {
            let row = $("<tr>");
            board.append(row);
            for (let j = 0; j < SIZE; j += 1) {
                let cell = $("<td height=75 width=75 align=center valign=center></td>");
                cell[0].indicator = indicator;
                cell.click(set);
                row.append(cell);
                squares.push(cell);
                indicator += indicator;
            }
        }

        // Attach under tictactoe if present, otherwise to body.
        $(document.getElementById("tictactoe") || document.body).append(board);
        startNewGame();
    };

    play();
});

