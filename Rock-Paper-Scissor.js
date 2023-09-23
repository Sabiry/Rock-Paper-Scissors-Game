let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

localStorage.getItem("score".JSON);

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() =>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () =>{
    playGame('rock');
  });


document.querySelector('.js-paper-button')
  .addEventListener('click', () =>{
    playGame('paper');
  });  

document.querySelector('.js-scissor-button')
  .addEventListener('click', () =>{
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) =>{
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p'){
    playGame('paper');
  } else if(event.key === 's'){
    playGame('scissors');
  } else if(event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    showResetConfirmation();
  });
  
  function showResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = `
        Are you sure you want to reset the score?
        <button class="js-reset-confirm-yes reset-confirm-button">
          Yes
        </button>
        <button class="js-reset-confirm-no reset-confirm-button">
          No
        </button>
      `;
      document.querySelector('.js-reset-confirm-yes')
      .addEventListener('click', () => {
        resetScore();
        hideResetConfirmation();
      });
    
    document.querySelector('.js-reset-confirm-no')
      .addEventListener('click', () => {
        hideResetConfirmation();
      });
  }

  function hideResetConfirmation() {
    document.querySelector('.js-reset-confirmation')
      .innerHTML = '';
  }

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result;
  if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "You Lost!!....";
    } else if (computerMove === "Paper") {
      result = "You Won!!....";
    } else if (computerMove === "Scissors") {
      result = "Unfortunately Tie.";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You Won!!....";
    } else if (computerMove === "Paper") {
      result = "Unfortunately Tie.";
    } else if (computerMove === "Scissors") {
      result = "You Lost!!....";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Unfortunately Tie.";
    } else if (computerMove === "Paper") {
      result = "You Lost!!....";
    } else if (computerMove === "Scissors") {
      result = "You Won!!....";
    }
  }
  
  if (result === "You Won!!....") {
    score.wins += 1;
  } else if (result === "You Lost!!....") {
    score.losses += 1;
  } else if (result === "Unfortunately Tie.") {
    score.ties += 1;
  }
  
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = `${result}`;

  document.querySelector(
    ".js-moves"
    ).innerHTML = `You <img src="Images/${playerMove}-emoji.png" class="move-icon"> <img src="Images/${computerMove}-emoji.png" class="move-icon"> Computer`;
  }
  
  function updateScoreElement() {
    document.querySelector(
      ".js-score"
    ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = "Rock";
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = "Paper";
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = "Scissors";
    }

    return computerMove;
  }


  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    resetScore();
  });