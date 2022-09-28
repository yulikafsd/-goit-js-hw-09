const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', changeBodyColor);
refs.stopBtn.addEventListener('click', isDisabled);

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
  isEnabled();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function isEnabled() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
}

function isDisabled() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}
