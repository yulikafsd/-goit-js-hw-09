import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  buttonEl: document.querySelector('button'),
};

refs.formEl.addEventListener('submit', createPromise);

const delay = refs.formEl.elements.delay.value;
const step = refs.formEl.elements.step.value;
const amount = refs.formEl.elements.amount.value;

function createPromise(event, position, delay) {
  event.preventDefault();
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
