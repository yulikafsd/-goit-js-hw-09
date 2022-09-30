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

let nowDateId = 0;
let selectedDateId = 0;
let timeDifference = 0;
let timeDifferenceObject = {};

refs.buttonEl.disabled = true;
refs.buttonEl.addEventListener('click', onClickCountTime);

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const nowDate = new Date();
    nowDateId = nowDate.getTime();
    selectedDateId = selectedDates[0].getTime();
    checkDate(nowDateId, selectedDateId);
  },
};

function checkDate(now, selected) {
  if (timeDifference !== 0) {
    refs.buttonEl.disabled = true;
    return;
  }

  const { buttonEl } = refs;

  if (now < selected) {
    buttonEl.disabled = false;
    timeDifference = selected - now;
    timeDifferenceObject = convertMs(timeDifference);
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
  const { daysEl, hoursEl, minutesEl, secondsEl } = refs;
  const { days, hours, minutes, seconds } = timeDifferenceObject;

  daysEl.textContent = days > 10 ? days : addLeadingZero(days);
  hoursEl.textContent = hours > 10 ? hours : addLeadingZero(hours);
  minutesEl.textContent = minutes > 10 ? minutes : addLeadingZero(minutes);
  secondsEl.textContent = seconds > 10 ? seconds : addLeadingZero(seconds);
}

function onClickCountTime() {
  refs.buttonEl.disabled = true;
  printDate();
  const timer = setInterval(newDatePrint, 1000);

  function newDatePrint() {
    timeDifferenceObject = convertMs((timeDifference -= 1000));
    printDate();
    if (timeDifference < 1000) {
      clearInterval(timer);
      timeDifference = 0;
    }
  }
}

flatpickr('input#datetime-picker', options);
