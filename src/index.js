import './scss/main.scss';
import {
  getRemoteData,
  incDecDate,
  createDateRange,
  populateGrid,
  showSpinner,
} from './functions.mjs';

document.addEventListener('DOMContentLoaded', async function () {
  Date.prototype.toDateInputValue = function () {
    const local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };
  document.getElementById(
    'date-selector'
  ).value = new Date().toDateInputValue();

  // variables
  const dateSelector = document.getElementById('date-selector');
  const todaysDate = dateSelector.value;
  let currentDate = dateSelector.value;

  const dateArray = createDateRange();
  showSpinner();
  const data = await getRemoteData(dateArray);
  populateGrid(data);

  //Events
  document
    .getElementById('next-page')
    .addEventListener('click', async function () {
      if (currentDate == todaysDate) {
        alert('you are viewing the most recent pictures');
      } else {
        currentDate = incDecDate(1, currentDate);
        showSpinner();
        const dateArray = createDateRange();
        const data = await getRemoteData(dateArray);
        populateGrid(data);
      }
    });

  document
    .getElementById('previous-page')
    .addEventListener('click', async function () {
      dateSelector.value = incDecDate(-1, dateSelector.value);
      showSpinner();
      const dateArray = createDateRange();
      const data = await getRemoteData(dateArray);
      populateGrid(data);
    });

  document
    .getElementById('show-articles')
    .addEventListener('click', async function () {
      showSpinner();
      const dateArray = createDateRange();
      const data = await getRemoteData(dateArray);
      populateGrid(data);
    });
});
