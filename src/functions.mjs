const url = import.meta.env.VITE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
import { openLightbox } from './lightbox.mjs';

export async function getRemoteData(dateArray) {
  const fullurl =
    url +
    apiKey +
    `&start_date=${dateArray[0]}&end_date=${dateArray[dateArray.length - 1]}`;
  console.log('🚀 ~ getRemoteData ~ url:', fullurl);
  return await fetch(fullurl).then((response) => response.json());
}

export function showSpinner() {
  const gridArea = document.querySelector('#image-grid-area');
  gridArea.innerHTML =
    '<div class="spinner-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>';
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

export function createDateRange() {
  const dateSelector = document.getElementById('date-selector');
  let articlesToShow = document.querySelector('#article-number')?.value || 1;
  const currentDate = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const dateRange = [];
  for (let i = 0; i < articlesToShow; i++) {
    dateRange.push(incDecDate(-i, currentDate));
  }

  return dateRange.reverse();
}

export function populateGrid(data) {
  const gridArea = document.querySelector('#image-grid-area');
  gridArea.innerHTML = '';
  data.forEach((articleData) => {
    const article = document.createElement('article');
    const spinner = document.createElement('div');
    spinner.classList.add('spinner', 'lds-roller');
    spinner.innerHTML =
      '<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>';
    article.appendChild(spinner);
    const content = `<img src="${articleData.url}" loading="lazy" class="images" alt="${articleData.title}"><h5 class="title">${articleData.title}</h5><p class="article-date">${articleData.date}</p>`;
    article.innerHTML = content;
    const img = article.querySelector('img');
    img.addEventListener('load', () => {
      article.classList.add('show');
    });
    img.addEventListener('click', () => {
      openLightbox(articleData.hdurl, articleData.title);
    });
    img.style.cursor = 'zoom-in';
    gridArea.appendChild(article);
  });
}
