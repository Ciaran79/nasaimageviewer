require('./scss/main.scss');

document.addEventListener('DOMContentLoaded', function () {
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
  const gridArea = document.querySelector('#image-grid-area');
  const articleNumber = document.querySelector('#article-number');
  const url = 'https://api.nasa.gov/planetary/apod?';
  const apiKey = 'api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS';
  let imageCount = 1;
  let resultsArray = [];

  //Events
  document.getElementById('next-page').addEventListener('click', function () {
    if (currentDate == todaysDate) {
      alert('you are viewing the most recent pictures');
    } else {
      currentDate = incDecDate(1, currentDate);
      displayArticles();
    }
  });

  document
    .getElementById('previous-page')
    .addEventListener('click', function () {
      dateSelector.value = incDecDate(-1, dateSelector.value);
      displayArticles();
    });

  document
    .getElementById('show-articles')
    .addEventListener('click', function () {
      displayArticles();
    });

  displayArticles();

  // functions
  function clearPrevious() {
    if (document.querySelectorAll('article').length > 0) {
      var elems = document.querySelectorAll('article');
      elems.forEach((element) => {
        element.remove();
      });
    }
  }

  function incDecDate(incDec, date) {
    let result = new Date(date);
    result.setDate(result.getDate() + incDec);
    result = result.toISOString().slice(0, 10);
    return result;
  }

  function createDateArray() {
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

  async function displayArticles() {
    clearPrevious();
    imageCount = 1;
    let dateArray = createDateArray();
    resultsArray = await addRemoteDataToArray(dateArray);
    resultsArray = resultsArray.reverse();
    resultsArray.forEach((element) => {
      createNewElements(element);
    });
    showArticles();
  }

  function showArticles() {
    document.querySelectorAll('article').forEach((element) => {
      if (element.querySelector('img')) {
        element.querySelector('img').addEventListener('load', () => {
          element.classList.add('show');
        });
      }
    });
  }

  async function addRemoteDataToArray(dateArray) {
    let results = [];
    for (let index = 0; index < dateArray.length; index++) {
      const date = dateArray[index];
      await fetch(url + apiKey + '&date=' + date).then((response) =>
        response.json().then(function (data) {
          results[index] = data;
        })
      );
    }
    return new Promise((resolve) => {
      resolve(results);
    });
  }

  function assemble() {
    resultsArray.forEach((element) => {
      createNewElements(element);
    });
  }

  function createNewElements(data) {
    gridArea.insertAdjacentHTML(
      'beforeend',
      '<article id="article' +
        imageCount +
        '" class="article"><div class="spinner lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><a target="_blank" id="image-link' +
        imageCount +
        '" class="image-link"><img id="img' +
        imageCount +
        '" src="" loading="lazy" class="images"></a><a target="_blank" id="title-link' +
        imageCount +
        '" class=""title-link><h5 id="title' +
        imageCount +
        '" class="title"></h5></a></article>'
    );

    let postUrl = data.hdurl;
    let articleTitleContent = data.title;
    let articleImageContent = data.url;
    let placeHolderImage = '/images/space.jpg';
    let placeHolderImageAreaDimensions = "width: '25%', 'margin-top': '15px'";
    let imageLink = document.querySelector('#image-link' + imageCount);
    let titleLink = document.querySelector('#title-link' + imageCount);
    let articleTitleArea = document.getElementById('title' + imageCount);
    let articleImageArea = document.getElementById('img' + imageCount);

    articleTitleArea.innerHTML = articleTitleContent;
    imageLink.setAttribute('href', postUrl);
    titleLink.setAttribute('href', postUrl);

    if (articleImageContent != null) {
      articleImageArea.setAttribute('src', articleImageContent);
    } else {
      articleImageArea
        .setAttribute('style', placeHolderImageAreaDimensions)
        .setAttribute('src', placeHolderImage);
    }
    imageCount++;
  }
});
