"use strict";

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  document.getElementById(
    "date-selector"
  ).value = new Date().toDateInputValue(); // variables

  var dateSelector = document.getElementById("date-selector");
  var todaysDate = dateSelector.value;
  var currentDate = dateSelector.value;
  var gridArea = document.querySelector("#image-grid-area");
  var articleNumber = document.querySelector("#article-number");
  var url = "https://api.nasa.gov/planetary/apod?";
  var apiKey = "api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS";
  var imageCount = 1;
  var resultsArray = []; //Events

  document.getElementById("next-page").addEventListener("click", function () {
    if (currentDate == todaysDate) {
      alert("you are viewing the most recent pictures");
    } else {
      currentDate = incDecDate(1, currentDate);
      displayArticles();
    }
  });
  document
    .getElementById("previous-page")
    .addEventListener("click", function () {
      dateSelector.value = incDecDate(-1, dateSelector.value);
      displayArticles();
    });
  document
    .getElementById("show-articles")
    .addEventListener("click", function () {
      displayArticles();
    });
  displayArticles(); // functions

  function clearPrevious() {
    if (document.querySelectorAll("article").length > 0) {
      var elems = document.querySelectorAll("article");
      elems.forEach(function (element) {
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
    clearPrevious();
    imageCount = 1;
    var dateArray = createDateArray();
    resultsArray = addRemoteDataToArray(dateArray);
    resultsArray = resultsArray.reverse();
    console.log(resultsArray);
    resultsArray.forEach(function (element) {
      createNewElements(element);
    });
    setTimeout(function () {
      showArticles();
    }, 1200);
  }

  function showArticles() {
    document.querySelectorAll("article").forEach(function (element) {
      return element.classList.add("show");
    });
  }

  function addRemoteDataToArray(dateArray) {
    var results = [];

    var _loop = function _loop(index) {
      var date = dateArray[index];
      fetch(url + apiKey + "&date=" + date).then(function (response) {
        return response.json().then(function (data) {
          results[index] = data;
        });
      });
    };

    for (var index = 0; index < dateArray.length; index++) {
      _loop(index);
    }

    return results;
  } // function getRemoteData(date) {   fetch(url + apiKey + '&date=' + date, {})
  // .then(response => response.json())     .then(function(data) {
  // createNewElements(data);     }); }

  function assemble() {
    resultsArray.forEach(function (element) {
      createNewElements(element);
      console.log(element);
    });
  }

  function createNewElements(data) {
    gridArea.insertAdjacentHTML(
      "beforeend",
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
    var placeHolderImage = "/images/space.jpg";
    var placeHolderImageAreaDimensions = "width: '25%', 'margin-top': '15px'";
    var imageLink = document.querySelector("#image-link" + imageCount);
    var titleLink = document.querySelector("#title-link" + imageCount);
    var articleTitleArea = document.getElementById("title" + imageCount);
    var articleImageArea = document.getElementById("img" + imageCount);
    articleTitleArea.innerHTML = articleTitleContent;
    imageLink.setAttribute("href", postUrl);
    titleLink.setAttribute("href", postUrl);

    if (articleImageContent != null) {
      articleImageArea.setAttribute("src", articleImageContent);
    } else {
      articleImageArea
        .setAttribute("style", placeHolderImageAreaDimensions)
        .setAttribute("src", placeHolderImage);
    }

    imageCount++;
  }
});
//# sourceMappingURL=scripts.js.map
