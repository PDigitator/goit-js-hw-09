import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const { delay, step, amount } = evt.currentTarget.elements;

  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    const promise = createPromise(i, delayValue);

    promise
      .then(({ position, delay }) => {
        const messageSuccess = `✅ Fulfilled promise ${position} in ${delay}ms`;
        Notify.success(messageSuccess, { useIcon: false });
      })

      .catch(({ position, delay }) => {
        const messageFailure = `❌ Rejected promise ${position} in ${delay}ms`;
        Notify.failure(messageFailure, { useIcon: false });
      });

    delayValue += stepValue;
  }

  evt.currentTarget.reset();
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
