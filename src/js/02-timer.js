import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  fieldDays: document.querySelector('[data-days]'),
  fieldHours: document.querySelector('[data-hours]'),
  fieldMinutes: document.querySelector('[data-minutes]'),
  fieldSeconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() > 0) {
      refs.startBtn.disabled = false;
    } else {
      Notiflix.Report.failure(
        'СOUNTDOWN ERROR!',
        'Please choose a date in the future',
        'Close'
      );
    }
  },
};

const fp = flatpickr(refs.datePicker, options);

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
}

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.datePicker.disabled = true;

  intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      fp.selectedDates[0] - Date.now()
    );

    if (days + hours + minutes + seconds === 0) {
      clearInterval(intervalId);
      refs.startBtn.disabled = true;
      refs.datePicker.disabled = false;
      Notiflix.Report.success(
        'COUNTDOWN IS OVER',
        'Please choose a new date in the future',
        'Close'
      );
    }

    refs.fieldDays.textContent = addLeadingZero(days);
    refs.fieldHours.textContent = addLeadingZero(hours);
    refs.fieldMinutes.textContent = addLeadingZero(minutes);
    refs.fieldSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  const leadingZero = String(value).padStart(2, '0');
  return leadingZero;
}
