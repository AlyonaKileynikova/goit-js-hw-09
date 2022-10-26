import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const submitBtn = document.querySelector('button[type = submit]');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

submitBtn.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();

  let delay = Number(document.querySelector('input[name = delay]').value);
  const step = Number(document.querySelector('input[name = step]').value);
  const amount = Number(document.querySelector('input[name = amount]').value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }

  setTimeout(() => {
    form.reset();
  }, delay * 2);
}
