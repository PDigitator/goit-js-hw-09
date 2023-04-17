const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

body.addEventListener('click', onBtnClick);

function onBtnClick(evt) {
  if (evt.target.textContent === 'Start') {
    intervalId = setInterval(() => {
      const color = getRandomHexColor();

      body.style.backgroundColor = color;
    }, 1000);

    stopBtn.disabled = false;
    startBtn.disabled = true;
  }

  if (evt.target.textContent === 'Stop') {
    clearInterval(intervalId);

    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}
