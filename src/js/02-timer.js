import flatpickr from 'flatpickr';
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const selectedDates = document.querySelector('input#datetime-picker');

const startCounterBtn = document.querySelector('[data-start]');
// startCounterBtn.disabled = true;

const counterDays = document.querySelector('[data-days]');
const counterHours = document.querySelector('[data-hours]');
const counterMinutes = document.querySelector('[data-minutes]');
const counterSeconds = document.querySelector('[data-seconds]');
const datePicker = document.querySelector('#datetime-picker');
const timerHTML = document.querySelector('.timer');

// Styles
timerHTML.style.display = 'flex';
timerHTML.style.fontSize = '50px';
timerHTML.style.color = 'indigo';
timerHTML.style.justifyContent = 'space-around';
timerHTML.style.marginTop = '80px';




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);

      // let currentDate = new Date();

      //проверка даты в будущем:
      if (selectedDates[0] < new Date()) {
        // window.alert('Please choose a date in the future');
        Notiflix.Notify.warning('Please choose a date in the future');
        startCounterBtn.disabled = true;
      } else {
        startCounterBtn.disabled = false;
      }

      console.log('currentDate: ', new Date());
      console.log('selectedDates[0] : ', selectedDates[0]);
      

        // startCounterBtn.disabled = false;
        //слухач на кнопку
        // startCounterBtn.addEventListener('click', onClick);
    }
};

flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
};

startCounterBtn.addEventListener('click', () => {
  let timer = setInterval(() => {
    let countdown = new Date(datePicker.value) - new Date();
    startCounterBtn.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);
      counterDays.textContent = addLeadingZero(timeObject.days);
      counterHours.textContent = addLeadingZero(timeObject.hours);
      counterMinutes.textContent = addLeadingZero(timeObject.minutes);
      counterSeconds.textContent = addLeadingZero(timeObject.seconds);
      if (countdown <= 10000) {
        timerHTML.style.color = 'orangered';
      }
    }
  }, 1000);
});