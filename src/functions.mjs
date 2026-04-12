const url = import.meta.env.VITE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export async function getRemoteData(dateArray) {
  return await fetch(
    url +
      apiKey +
      `&start_date=${dateArray[0]}&end_date=${dateArray[dateArray.length - 1]}`
  ).then((response) => response.json());
}

// functions
export function clearGrid() {
  const gridArea = document.querySelector('#image-grid-area');
  if (gridArea.querySelectorAll('article').length > 0) {
    gridArea.innerHTML = '';
  }
}

export function incDecDate(incDec, date) {
  let result = new Date(date);
  result.setDate(result.getDate() + incDec);
  result = result.toISOString().slice(0, 10);
  return result;
}

export function createDateArray() {
  const dateSelector = document.getElementById('date-selector');
  const articleNumber = document.querySelector('#article-number');
  let articleCount = articleNumber.value;
  let date = dateSelector.value;
  let dates = [];
  dates.push(date);
  articleCount--;
  while (articleCount > 0) {
    let newDate = incDecDate(-1, date);
    dates.push(newDate);
    articleCount--;
    date = newDate;
  }
  return dates;
}

export async function displayArticles(resultsArray) {
  clearGrid();
  resultsArray?.reverse();
  resultsArray.forEach((element) => {
    populateGrid(element);
  });
}

export function populateGrid(data) {
  const gridArea = document.querySelector('#image-grid-area');
  const article = document.createElement('article');
  const spinner = document.createElement('div');
  spinner.classList.add('spinner', 'lds-roller');
  spinner.innerHTML =
    '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';
  article.appendChild(spinner);
  const content = `<a target="_blank" href="${data.hdurl}"  class="image-link"><img src="${data.url}" loading="lazy" class="images"></a><a target="_blank" class=""title-link><h5 class="title">${data.title}</h5></a>`;
  article.innerHTML = content;
  const img = article.querySelector('img');
  img.addEventListener('load', () => {
    article.classList.add('show');
  });
  gridArea.appendChild(article);
}
