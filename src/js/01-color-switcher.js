const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', changeBodyColor);
refs.stopBtn.addEventListener('click', enableStart);

let coloringInterval;

function changeBodyColor() {
  disableStart();
  coloringInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 700);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function enableStart() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(coloringInterval);
}

function disableStart() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}
