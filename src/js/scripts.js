'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed');
  // variables
  const dateSelector = document.querySelector('#date-selector');
  const todaysDate = dateSelector.value;
  const gridArea = document.querySelector('#image-grid-area');
  const articleNumber = document.querySelector('#article-number');
  const url = 'https://api.nasa.gov/planetary/apod?';
  const apiKey = 'api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS';
  let imageCount = 1;
  let resultsArray = [];

  Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };
  document.getElementById('date-selector').value = new Date().toDateInputValue();

  //Events
  document.getElementById('next-page').addEventListener('click', function() {
    if (dateSelector.value == todaysDate) {
      alert('you are viewing the most recent pictures');
    } else {
      dateSelector.value = incDecDate(1, dateSelector.value);
      displayArticles();
    }
  });

  document.getElementById('previous-page').addEventListener('click', function() {
    dateSelector.value = incDecDate(-1, dateSelector.value);
    displayArticles();
  });

  document.getElementById('show-articles').addEventListener('click', function() {
    displayArticles();
  });

  displayArticles(showArticles);

  // functions
  function clearPrevious() {
    if (document.querySelectorAll('article').length > 0) {
      var elems = document.querySelectorAll('article');
      elems.forEach(element => {
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

  function displayArticles() {
    clearPrevious();
    imageCount = 1;
    let dateArray = createDateArray();
    addRemoteDataToArray(dateArray, resultsArray);
    setTimeout(() => {
      resultsArray = resultsArray.reverse();
      resultsArray.forEach(element => {
        createNewElements(element);
      });
    }, 1000);
    setTimeout(() => {
      showArticles();
    }, 1200);
  }

  function showArticles() {
    document
      .querySelectorAll('article')
      .forEach(element => element.classList.add('show'));
  }

  function addRemoteDataToArray(dateArray, resultsArray) {
    for (let index = 0; index < dateArray.length; index++) {
      const date = dateArray[index];
      fetch(url + apiKey + '&date=' + date).then(response =>
        response.json().then(function(data) {
          resultsArray[index] = data;
        })
      );
    }
    console.log(resultsArray);
  }
  // function getRemoteData(date) {
  //   fetch(url + apiKey + '&date=' + date, {})
  //     .then(response => response.json())
  //     .then(function(data) {
  //       createNewElements(data);
  //     });
  // }

  function assemble() {
    resultsArray.forEach(element => {
      createNewElements(element);
      console.log(element);
    });
  }

  function createNewElements(data) {
    gridArea.insertAdjacentHTML(
      'beforeend',
      '<article id="article' +
        imageCount +
        '" class="article"><a target="_blank" id="image-link' +
        imageCount +
        '" data-fancybox="gallery" class="image-link"><img id="img' +
        imageCount +
        '" src="" class="images"></a><a target="_blank" id="title-link' +
        imageCount +
        '" class=""title-link><h5 id="title' +
        imageCount +
        '" class="title"></h5></a></article>'
    );

    let postUrl = data.hdurl;
    let articleTitleContent = data.title;
    let articleImageContent = data.url;
    let placeHolderImage = 'space.jpg';
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
