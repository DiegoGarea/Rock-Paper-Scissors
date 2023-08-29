let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoplaying = false;
let intervalId;
let buttonAutoPlay = false;

document.querySelector('.js-autoplay-btn').addEventListener('click', autoPlay);
document.querySelector('.auto-play-btn').addEventListener('click', (event) => {
  if (!buttonAutoPlay) {
    event.target.innerHTML = 'Stop Playing';
    buttonAutoPlay = true;
  } else {
    event.target.innerHTML = 'Auto Play';
    buttonAutoPlay = false;
  }
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    if (!buttonAutoPlay) {
      document.querySelector('.auto-play-btn').innerHTML = 'Stop Playing';
      buttonAutoPlay = true;
      autoPlay();
    } else {
      document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
      buttonAutoPlay = false;
      autoPlay();
    }
  }
});

function autoPlay() {
  if (!isAutoplaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalId);
    isAutoplaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === ' ') {
    resetQuestion();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You:
<img src="images/${playerMove}-emoji.png" class="move-icon" />
Computer:
<img src="images/${computerMove}-emoji.png" class="move-icon" />`;
}

function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

document.querySelector('.js-reset-btn').addEventListener('click', () => {
  resetQuestion();
});

function resetQuestion() {
  document.querySelector(
    '.js-reset-question'
  ).innerHTML = `Are you sure you want to reset the score? 
  <button class="yes-btn">YES</button>
  <button class="no-btn">NO</button>`;

  document.querySelector('.yes-btn').addEventListener('click', () => {
    resetScore();
    hideQuestion();
  });

  document.querySelector('.no-btn').addEventListener('click', () => {
    hideQuestion();
  });
}

function hideQuestion() {
  document.querySelector('.js-reset-question').innerHTML = '';
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}
