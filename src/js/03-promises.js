import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button');

form.elements.delay.value = 500;
form.elements.step.value = 1000;
form.elements.amount.value = 3;

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  createPromises(e);
}

function createPromises({ target: { delay, step, amount } }) {
  let delayVal = Number(delay.value);
  const stepVal = Number(step.value);
  const amountVal = Number(amount.value);

  for (let i = 1; i <= amountVal; i += 1, delayVal += stepVal) {
    createPromise(i, delayVal).then(onSuccess).catch(onFailure);
  }

  activateBtn(delayVal);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

function activateBtn(delay) {
  setTimeout(delay => {
    submitBtn.disabled = false;
  }, delay);
}

// Решение задачи без промисов :)

// function onSubmit(e) {
//   e.preventDefault();

//   const { delay, step, amount } = e.target;

//   let delayVal = Number(delay.value);
//   const stepVal = Number(step.value);
//   const amountVal = Number(amount.value);
//   const delaysArr = [];

//   for (let position = 0; position < amountVal; position += 1) {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         Notify.success(
//           `Fulfilled promise ${position + 1} in ${delaysArr[position]}ms`
//         );
//       } else {
//         Notify.failure(
//           `Rejected promise ${position + 1} in ${delaysArr[position]}ms`
//         );
//       }
//     }, delayVal);
//     delaysArr.push(delayVal);
//     delayVal += stepVal;
//   }
// }
