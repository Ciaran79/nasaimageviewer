'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM fully loaded and parsed'); // variables

  var dateSelector = document.querySelector('#date-selector');
  var todaysDate = dateSelector.value;
  var gridArea = document.querySelector('#image-grid-area');
  var articleNumber = document.querySelector('#article-number');
  var url = 'https://api.nasa.gov/planetary/apod?';
  var apiKey = 'api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS';
  var imageCount = 1;

  Date.prototype.toDateInputValue = function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  document.getElementById('date-selector').value = new Date().toDateInputValue(); //Events

  document.getElementById('next-page').click(function() {
    if (dateSelector.value == todaysDate) {
      alert('you are viewing the most recent pictures');
    } else {
      dateSelector.value = incDecDate(1, dateSelector.value);
      displayArticles();
    }
  });
  document.getElementById('previous-page').click(function() {
    dateSelector.value = incDecDate(-1, dateSelector.value);
    displayArticles();
  });
  document.getElementById('show-articles').click(function() {
    displayArticles();
  });
  displayArticles(); // functions

  function clearPrevious() {
    if (document.querySelectorAll('article').length > 0) {
      var elems = document.querySelectorAll('article');
      elems.forEach(function(element) {
        element.remove();
      });
    }
  }

  function incDecDate(incDec, date) {
    var result = new Date(date);
    result.setDate(result.getDate() + incDec);
    result = result.toISOString().slice(0, 10);
    return result;
  }

  function createDateArray() {
    var articleCount = articleNumber.value;
    var date = dateSelector.value;
    var dates = [];
    dates.push(date);
    articleCount--;

    while (articleCount > 0) {
      var newDate = incDecDate(-1, date);
      dates.push(newDate);
      articleCount--;
      date = newDate;
    }

    return dates;
  }

  function displayArticles() {
    //First clear previous article element clones if any are present...
    clearPrevious(); // let currentDate = 'date=' + dateSelector.value;

    var dateArray = createDateArray();
    console.log(dateArray); // dateArray.forEach(date => getRemoteData(date));

    for (var index = 0; index < dateArray.length; index++) {
      var date = dateArray[index];
      getRemoteData(date);
    }
  } //   const request = async () => {
  //     const response = await fetch(url + apiKey + '&date=' + date, {});
  //     console.log(response);
  //     //   .then(response => response.json())
  //     //   .then(function(data) {
  //     //     createNewElements(data);
  //     //   });
  //   };

  function getRemoteData(date) {
    fetch(url + apiKey + '&date=' + date, {})
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        createNewElements(data);
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
    var postUrl = data.hdurl;
    var articleTitleContent = data.title;
    var articleImageContent = data.url;
    var placeHolderImage = 'space.jpg';
    var placeHolderImageAreaDimensions = "width: '25%', 'margin-top': '15px'";
    var imageLink = document.querySelector('#image-link' + imageCount);
    var titleLink = document.querySelector('#title-link' + imageCount);
    var articleTitleArea = document.getElementById('title' + imageCount);
    var articleImageArea = document.getElementById('img' + imageCount);
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
//# sourceMappingURL=scripts.js.map
