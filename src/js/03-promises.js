import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  buttonEl: document.querySelector('button'),
};

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let delay = Number(refs.formEl.elements.delay.value);
  const step = Number(refs.formEl.elements.step.value);
  const amount = Number(refs.formEl.elements.amount.value);
  const delaysArr = [];

  for (let position = 0; position < amount; position += 1) {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        Notify.success(
          `Fulfilled promise ${position + 1} in ${delaysArr[position]}ms`
        );
      } else {
        Notify.failure(
          `Rejected promise ${position + 1} in ${delaysArr[position]}ms`
        );
      }
    }, delay);
    delaysArr.push(delay);
    delay += step;
  }
}

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     Notify.failure(`Rejected promise ${position} in ${delay}ms`);
//   });
