$(document).ready(function () {

    var firstPlayer="x",
        secondPlayer="o",
        hPlayer="",  //human player
        cPlayer="",  //computer player
        board=["","","","","","","","",""], //"" empty, x firstPlayer, o secondPlayer
        hTurn=false,  //if true  we are waiting for human move
        move="",  // to store the result of AI
        count,    // for waiting a time before restarting the game
        startPlayer,  // to keep the player who begun to change order at the end
        restartTime=2000;   // time to wait before restart in miliseconds
    
    function ai() {   // to process the min max algorithm with min and max functions
      var auxBoard=board;
      var position=0;
      var aux, choice=-999;
    
      auxBoard.forEach(function(item, idx){
        if (freeCell(idx)){
          auxBoard[idx]=cPlayer;
          aux=min(auxBoard);
          if (aux > choice) {
            choice=aux;
            position=idx;
          }
          auxBoard[idx]="";
        }
      });
      return position;
    }
    
    function min(auxBoard) {
      if (isWinner(cPlayer)) return 1;
      if (!freeMoves(auxBoard)) return 0;
      var aux, choice=999;
      auxBoard.forEach(function(item, idx){
        if (freeCell(idx)){
          auxBoard[idx]=hPlayer
          aux=max(auxBoard);
          if (aux < choice) choice=aux;
          auxBoard[idx]="";
        }
      });
      return choice;
    }
    
    function max(auxBoard) {
    
      if (isWinner(hPlayer)) return -1;
      if (!freeMoves(auxBoard)) return 0;
      var aux, choice=-999;
    
      auxBoard.forEach(function(item, idx){
        if (freeCell(idx)){
          auxBoard[idx]=cPlayer
          aux=min(auxBoard);
          if (aux > choice) choice=aux;
          auxBoard[idx]="";
        }
      });
      return choice;
    }
    
    function isWinner(player){  //returns true if there is a winner combination for player
      return (board[0] === player && board[1] === player && board[2]=== player) ||
             (board[3] === player && board[4] === player && board[5]=== player) ||
             (board[6] === player && board[7] === player && board[8]=== player) ||
    
             (board[0] === player && board[3] === player && board[6]=== player) ||
             (board[1] === player && board[4] === player && board[7]=== player) ||
             (board[2] === player && board[5] === player && board[8]=== player) ||
    
             (board[0] === player && board[4] === player && board[8]=== player) ||
             (board[2] === player && board[4] === player && board[6]=== player);
    }
    
    function drawBoard(){
      board.forEach(function (item, idx) {
        $("#"+idx).html(item);
      })
    }
    
    function restartBoard(){
      // board=["","o","x","","x","","","","o"];
      board=["","","","","","","","",""];
      console.log(board);
      drawBoard();
    }
    
    function freeCell(idx){  //returns true if the cell is free
      return board[idx]==="";
    }
    
    function freeMoves(board){
      return board.reduce(function(pv, cv){
        return cv===""? true : pv;
      },false);
    }
    
    function displayMessage (message) {
      if (message === undefined){
        hTurn ? $(".message").html('<i class="fa fa-spinner fa-spin"></i>  Your turn')
              : $(".message").html('<i class="fa fa-cog fa-spin"></i>');
      }
      else{
        $(".message").html(message);
      }
    }
    
    $(".control").click(function(){     // at any moment the user can restart the game playing first or second
      restartBoard();
      if (this.id === "Computer"){
        hPlayer=secondPlayer;
        cPlayer=firstPlayer;
        startPlayer="Computer";
        hTurn=false;
        displayMessage();
        // here Computer starts, first move is aleatory, in worst case computer will get a draw
        // Math.floor(Math.random() * (max - min)) + min;
        move = Math.floor(Math.random()* 9);
        board[move]=cPlayer;
        console.log(board);
        drawBoard();
        hTurn=!hTurn;
        displayMessage();
      }else {
        hPlayer=firstPlayer;
        cPlayer=secondPlayer;
        startPlayer="Human";
        hTurn=true;
        displayMessage();
      }
    })
    
    $(".control").hover(
      function() {
          $(this).addClass("controlDarken");
      }, function() {
          $(this).removeClass("controlDarken");
      }
    );
    
    $(".cell").click(function(){
      if (freeCell(this.id) && hTurn){
        board[this.id]=hPlayer;
        $(this).removeClass("cellFade");
        drawBoard();
        if (isWinner(hPlayer)){
          displayMessage("You Win!");
          hTurn=false;
          count=setInterval(restartGame, restartTime);
        } else {
          if (freeMoves(board)){
            hTurn=!hTurn;
            displayMessage();
            console.log(board);
            move=ai();
            board[move]=cPlayer;
            drawBoard();
            hTurn=!hTurn;
            if (isWinner(cPlayer)){
              displayMessage ("I Win");
              hTurn=false;
              count=setInterval(restartGame, restartTime);
            } else {
              if (freeMoves(board)){
                displayMessage();
              } else {
                displayMessage ("Draw");
                hTurn=false;
                count=setInterval(restartGame, restartTime);
              }
            }
          }else {
            displayMessage ("Draw");
            hTurn=false;
            count=setInterval(restartGame, restartTime);
          }
        }
      }
    });
    
    function restartGame(){
      clearInterval(count);
      restartBoard();
      if (startPlayer==="Human"){
          startPlayer="Computer";
          move = Math.floor(Math.random()* 9);
          board[move]=cPlayer;
          drawBoard();
          hTurn=true;
          displayMessage();
        }else {
          startPlayer="Human";
          hTurn=true;
          displayMessage();
        }
    }
    
    $(".cell").hover(
      function() {
        if (freeCell(this.id) && hTurn){
          $(this).addClass("cellFade");
          $(this).html(hPlayer);
        }
      }, function() {
        if (freeCell(this.id) && hTurn){
          $(this).html("");
          $(this).removeClass("cellFade");
        }
      }
    );
    
    }); //end document
    