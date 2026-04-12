import './scss/main.scss';
import {
  getRemoteData,
  clearGrid,
  incDecDate,
  createDateArray,
  displayArticles,
  populateGrid,
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

  const spinner = document.createElement('div');
  spinner.classList.add('spinner', 'lds-roller');
  spinner.innerHTML =
    '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';

  const dateArray = createDateArray();
  const data = await getRemoteData(dateArray);
  displayArticles(data);

  //Events
  document
    .getElementById('next-page')
    .addEventListener('click', async function () {
      if (currentDate == todaysDate) {
        alert('you are viewing the most recent pictures');
      } else {
        currentDate = incDecDate(1, currentDate);
        const dateArray = createDateArray();
        const data = await getRemoteData(dateArray);
        displayArticles(data);
      }
    });

  document
    .getElementById('previous-page')
    .addEventListener('click', async function () {
      dateSelector.value = incDecDate(-1, dateSelector.value);
      const dateArray = createDateArray();
      const data = await getRemoteData(dateArray);
      displayArticles(data);
    });

  document
    .getElementById('show-articles')
    .addEventListener('click', async function () {
      console.log('show-articles');
      const dateArray = createDateArray();
      const data = await getRemoteData(dateArray);
      displayArticles(data);
    });
});
