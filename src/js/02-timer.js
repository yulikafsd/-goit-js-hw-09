import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('input#datetime-picker'),
  buttonEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};

const { inputEl, buttonEl, daysEl, hoursEl, minutesEl, secondsEl } = refs;

let delta = 0;
let deltaObject = {};

buttonEl.disabled = true;
buttonEl.addEventListener('click', onClickCountTime);

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    checkDate(selectedDate);
  },
};

function checkDate(selected) {
  if (delta !== 0) {
    buttonEl.disabled = true;
    Notify.warning('Please, wait for timer to finish');
    return;
  }

  if (new Date() < selected) {
    buttonEl.disabled = false;
    delta = selected - new Date();
    // deltaObject = convertMs(delta);
  } else {
    buttonEl.disabled = true;
    Notify.failure('Please, choose date in the future');
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => value.toString().padStart(2, '0');

function printDate() {
  const { days, hours, minutes, seconds } = deltaObject;

  daysEl.textContent = days > 10 ? days : addLeadingZero(days);
  hoursEl.textContent = hours > 10 ? hours : addLeadingZero(hours);
  minutesEl.textContent = minutes > 10 ? minutes : addLeadingZero(minutes);
  secondsEl.textContent = seconds > 10 ? seconds : addLeadingZero(seconds);
}

function onClickCountTime() {
  buttonEl.disabled = true;
  // printDate();
  const timer = setInterval(() => {
    deltaObject = convertMs((delta -= 1000));
    printDate();
    if (delta < 1000) {
      clearInterval(timer);
      delta = 0;
    }
  }, 1000);
}

flatpickr(inputEl, options);
