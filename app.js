/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//IIFE
(function() {
  var activePlayer, scores, roundScore, gamePlaying, /*lastDice*/ winningScore;

  init();

  //Roll dice button
  document.querySelector(".btn-roll").addEventListener("click", () => {
    if(gamePlaying){
        
        //1. Random number generator
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        
        //2. Display the result
        var dice1DOM = document.querySelector("#dice1");
        var dice2DOM = document.querySelector("#dice2");
        dice1DOM.style.display = "block";
        dice2DOM.style.display = "block";
        dice1DOM.src = `dice-${dice1}.png`;
        dice2DOM.src = `dice-${dice2}.png`;


        //3. Update the round score IF the rolled number was NOT a 1

        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }

        // if(lastDice === 6 && dice === 6){
        //     scores[activePlayer] = 0;
        //     document.querySelector(`#score-${activePlayer}`).textContent = '0';
        //     nextPlayer();
        // }else if (dice !== 1) {
        //     roundScore += dice;
        //     document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        // } else {
        //     nextPlayer();
        // }
        // lastDice = dice;
    }

  });

  //Hold button
  document.querySelector(".btn-hold").addEventListener("click", () => {
    if(gamePlaying){
        //Add roundScore with scores
        scores[activePlayer] += roundScore ; 

        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        var inputDOM = document.querySelector(`.final-score`).value;

        if(inputDOM){
            winningScore = inputDOM;
        }else{
            winningScore = 100;
        }
        
        //Check scores 
        if(scores[activePlayer] >= winningScore){
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;

        }else{
            //Next player
            nextPlayer();
        }
    }
  });

  //New Game button
  document.querySelector(".btn-new").addEventListener("click", () => {
      init()
  });

  //Next Player function
  function nextPlayer() {
        roundScore = 0;

        document.getElementById(`current-${activePlayer}`).textContent = 0;

        //remove active class
        document.querySelector(`.player-${activePlayer}-panel`).classList.remove("active");

        //check activePlayer 1 or 0
        activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

        //add active class
        document.querySelector(`.player-${activePlayer}-panel`).classList.add("active");
  }

  //Final score enter event
  document.querySelector('.final-score').addEventListener('keydown', event =>{

    var inputDOM = document.querySelector(`.final-score`).value;

    if(event.key === 'Enter'){
        winningScore = inputDOM
    }else{
        winningScore = 100;
    }
  });

  //Init function
  function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector("#dice1").style.display = "none";
    document.querySelector("#dice2").style.display = "none";


    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");  
    document.querySelector(".player-0-panel").classList.add("active");
    document.getElementById('name-0').textContent = 'player 1';
    document.getElementById('name-1').textContent = 'player 2';
  }
})();
