'use strict';

const TOMO_COUNT = 6;
const RAMEN_COUNT = 6;
const GAME_DURATION_SEC = 20;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});
function startGame() {
  initGame();
  showStopButton();
  showTimeAndScore();
  stratGameTimer();
}

function stopGame() {
  stopGameTimer();
  hideStartButton();
  showPopUpWithText('Replay❓');
}
function stratGameTimer() {
  let remaingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remaingTimeSec);
  timer = setInterval(() => {
    if (remaingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remaingTimeSec);
  }, 1000);
}
function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minute = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minute}:${seconds}`; //convert formation 00:00 not 0:0
}
function showPopUpWithText(text) {
  popUpMessage.innerText = text;
  popUp.classList.remove('pop-up--hide');
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}
function hideStartButton() {
  gameBtn.style.visibility = 'hidden';
}

function showTimeAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function initGame() {
  field.innerHTML = '';
  gameScore.innerText = TOMO_COUNT;
  addItem('tomo', TOMO_COUNT, 'img/tomo.png');
  addItem('ramen', RAMEN_COUNT, 'img/ramen.png');
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - 60;
  const y2 = fieldRect.height - 60;
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    item.style.width = '55px';
    item.style.height = '60px';
    field.appendChild(item);
  }
}
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
