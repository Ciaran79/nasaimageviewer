'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM fully loaded and parsed');

  Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  };

  document.getElementById(
    'date-selector'
  ).value = new Date().toDateInputValue(); // variables

  var dateSelector = document.getElementById('date-selector');
  var todaysDate = dateSelector.value;
  var currentDate = dateSelector.value;
  var gridArea = document.querySelector('#image-grid-area');
  var articleNumber = document.querySelector('#article-number');
  var url = 'https://api.nasa.gov/planetary/apod?';
  var apiKey = 'api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS';
  var imageCount = 1;
  var resultsArray = []; //Events

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
  displayArticles(); // functions

  function clearPrevious() {
    if (document.querySelectorAll('article').length > 0) {
      var elems = document.querySelectorAll('article');
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
    return _displayArticles.apply(this, arguments);
  }

  function _displayArticles() {
    _displayArticles = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
        var dateArray;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                clearPrevious();
                imageCount = 1;
                dateArray = createDateArray();
                _context.next = 5;
                return addRemoteDataToArray(dateArray);

              case 5:
                resultsArray = _context.sent;
                console.log(
                  '🚀 ~ file: scripts.js ~ line 94 ~ displayArticles ~ resultsArray',
                  resultsArray
                );
                resultsArray = resultsArray.reverse();
                resultsArray.forEach(function (element) {
                  createNewElements(element);
                });
                showArticles();

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      })
    );
    return _displayArticles.apply(this, arguments);
  }

  function showArticles() {
    document.querySelectorAll('article').forEach(function (element) {
      if (element.querySelector('img')) {
        element.querySelector('img').addEventListener('load', function () {
          element.classList.add('show');
        });
      }
    });
  }

  function addRemoteDataToArray(_x) {
    return _addRemoteDataToArray.apply(this, arguments);
  }

  function _addRemoteDataToArray() {
    _addRemoteDataToArray = _asyncToGenerator(
      /*#__PURE__*/ regeneratorRuntime.mark(function _callee2(dateArray) {
        var results, _loop, index;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                results = [];
                _loop = /*#__PURE__*/ regeneratorRuntime.mark(function _loop(
                  index
                ) {
                  var date;
                  return regeneratorRuntime.wrap(function _loop$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          date = dateArray[index];
                          _context2.next = 3;
                          return fetch(url + apiKey + '&date=' + date).then(
                            function (response) {
                              return response.json().then(function (data) {
                                results[index] = data;
                              });
                            }
                          );

                        case 3:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop);
                });
                index = 0;

              case 3:
                if (!(index < dateArray.length)) {
                  _context3.next = 8;
                  break;
                }

                return _context3.delegateYield(_loop(index), 't0', 5);

              case 5:
                index++;
                _context3.next = 3;
                break;

              case 8:
                return _context3.abrupt(
                  'return',
                  new Promise(function (resolve) {
                    resolve(results);
                  })
                );

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2);
      })
    );
    return _addRemoteDataToArray.apply(this, arguments);
  }

  function assemble() {
    resultsArray.forEach(function (element) {
      createNewElements(element);
      console.log('assemble', element);
    });
  }

  function createNewElements(data) {
    console.log('called create new');
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
    var placeHolderImage = '/images/space.jpg';
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
