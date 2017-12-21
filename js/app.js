//Not going for exceeds this time. I plan to continue with it. Just not understanding the minimax at this time. 

//wrapping the app in a function so not to pollute global namespace
!function () {

//creating the game object
function Game (player) {
    this.player = player;
    this.winningBoard = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [3,5,7],
        [1,5,9]
    ]   
    this.scoreBoardO = [];
    this.scoreBoardX = [];
}
//creating instances
var player1 = new Game('#player1');
var player2 = new Game('#player2');

//global variables
let counter = 1;

//start with player 1
$(this.player1).addClass('active'); 

//enable start game button.
!function startGameButton () {
    
    $('.button').click(function () {
        $('.screen-start').hide();
        $('.screen-win').hide();
        $('.board').show();        
    });
}();

function startNewGame() {

    $('#restart-button').click(function (e) {
        e.preventDefault();
        location.reload();
        $('#start').hide();
    
    });
}

//show winning screen
function showWinningScreen() {
    $('.screen-start').hide();
    $('.screen-win').show();
    $('.board').hide();
}

//unbind the hover event when a box is clicked
function unbindHover() {
     $('.box').click(function(){
        $(this).unbind('mouseenter mouseleave');
    });
}

//creating a method for the hover event    
Game.prototype.hover = function() {
    unbindHover();   
    $('.box').hover(
        function () {
            if ($('#player1').hasClass('active')) {
                $(this).css('background-image', 'url(../tic-tac-toe-v3/img/o.svg)');
            } else {
                $(this).css('background-image', 'url(../tic-tac-toe-v3/img/x.svg)');
            }
        }, 
        function() {
            $(this).css('background-image', 'initial');
    });
}
player1.hover(); 

//creating a method to play the game
Game.prototype.play = function () {
    
    $('.box').click((e) => {
        
        if ($('#player1').hasClass('active')) {
            
            $(e.target)
                .addClass('box-filled-1')
                .off('click');//once a box is selected, do not allow a player to click that box
            $('#player1')
                .removeClass('active');
            $('#player2')
                .addClass('active');
                                       
            this.scoreBoardO.sort().push(parseInt(e.target.id));
            player1.findWinner();  
            startNewGame();              
                     
        } else if ($('#player2').hasClass('active')) {
         
             $(e.target)
                .addClass('box-filled-2')
                .off('click');
             $('#player2')
                .removeClass('active');
             $('#player1')
                .addClass('active');
                 
           
            this.scoreBoardX.sort().push(parseInt(e.target.id));
            player1.findWinner();
            startNewGame(); 
        
        } 
        counter ++;   
    });
};
player1.play();

//comparing current scoreBoards to the winningBoard
Game.prototype.findWinner = function() { 
    if (this.winningBoard.some(board => board.every(x => this.scoreBoardO.includes(x))) === true) {
            
        //display player 1 "O" is the winner
        showWinningScreen();
        $('.message')
            .append('O is the Winner!');
        $('#finish')
            .addClass('screen-win-one');

    } else if (this.winningBoard.some(board => board.every(x => this.scoreBoardX.includes(x))) === true) {
            
        //display player 2 "X" is the winner
        showWinningScreen();
        $('.message')
            .append('X is the Winner!');
        $('#finish')
            .addClass('screen-win-two');
              
    } else if (counter > 8 && this.winningBoard.some(board => board.every(x => this.scoreBoardO.includes(x))) !== true && this.winningBoard.some(board => board.every(x => this.scoreBoardX.includes(x))) !== true) {
            
        //only if there have been 9 moves and no winner
        showWinningScreen();
        $('.message')
            .append('It\'s a tie');
        $('#finish')
            .addClass('screen-win-tie');        
    }
}

}();//ending app function


