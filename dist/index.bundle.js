/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__(/*! ./scss/main.scss */ "./src/scss/main.scss");

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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOQSxtQkFBTyxDQUFDLDhDQUFrQjs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYXNhaW1hZ2V2aWV3ZXIvLi9zcmMvc2Nzcy9tYWluLnNjc3M/YTg4NSIsIndlYnBhY2s6Ly9uYXNhaW1hZ2V2aWV3ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbmFzYWltYWdldmlld2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbmFzYWltYWdldmlld2VyLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJyZXF1aXJlKCcuL3Njc3MvbWFpbi5zY3NzJyk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gIERhdGUucHJvdG90eXBlLnRvRGF0ZUlucHV0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgbG9jYWwgPSBuZXcgRGF0ZSh0aGlzKTtcbiAgICBsb2NhbC5zZXRNaW51dGVzKHRoaXMuZ2V0TWludXRlcygpIC0gdGhpcy5nZXRUaW1lem9uZU9mZnNldCgpKTtcbiAgICByZXR1cm4gbG9jYWwudG9KU09OKCkuc2xpY2UoMCwgMTApO1xuICB9O1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnZGF0ZS1zZWxlY3RvcidcbiAgKS52YWx1ZSA9IG5ldyBEYXRlKCkudG9EYXRlSW5wdXRWYWx1ZSgpO1xuXG4gIC8vIHZhcmlhYmxlc1xuICBjb25zdCBkYXRlU2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0ZS1zZWxlY3RvcicpO1xuICBjb25zdCB0b2RheXNEYXRlID0gZGF0ZVNlbGVjdG9yLnZhbHVlO1xuICBsZXQgY3VycmVudERhdGUgPSBkYXRlU2VsZWN0b3IudmFsdWU7XG4gIGNvbnN0IGdyaWRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltYWdlLWdyaWQtYXJlYScpO1xuICBjb25zdCBhcnRpY2xlTnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FydGljbGUtbnVtYmVyJyk7XG4gIGNvbnN0IHVybCA9ICdodHRwczovL2FwaS5uYXNhLmdvdi9wbGFuZXRhcnkvYXBvZD8nO1xuICBjb25zdCBhcGlLZXkgPSAnYXBpX2tleT1aeUFaNjVUUmpZWjRTdG83Mmpscmd0T2llQVhQSnVWeW1KRnJmMFJTJztcbiAgbGV0IGltYWdlQ291bnQgPSAxO1xuICBsZXQgcmVzdWx0c0FycmF5ID0gW107XG5cbiAgLy9FdmVudHNcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25leHQtcGFnZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGlmIChjdXJyZW50RGF0ZSA9PSB0b2RheXNEYXRlKSB7XG4gICAgICBhbGVydCgneW91IGFyZSB2aWV3aW5nIHRoZSBtb3N0IHJlY2VudCBwaWN0dXJlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50RGF0ZSA9IGluY0RlY0RhdGUoMSwgY3VycmVudERhdGUpO1xuICAgICAgZGlzcGxheUFydGljbGVzKCk7XG4gICAgfVxuICB9KTtcblxuICBkb2N1bWVudFxuICAgIC5nZXRFbGVtZW50QnlJZCgncHJldmlvdXMtcGFnZScpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgZGF0ZVNlbGVjdG9yLnZhbHVlID0gaW5jRGVjRGF0ZSgtMSwgZGF0ZVNlbGVjdG9yLnZhbHVlKTtcbiAgICAgIGRpc3BsYXlBcnRpY2xlcygpO1xuICAgIH0pO1xuXG4gIGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRCeUlkKCdzaG93LWFydGljbGVzJylcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBkaXNwbGF5QXJ0aWNsZXMoKTtcbiAgICB9KTtcblxuICBkaXNwbGF5QXJ0aWNsZXMoKTtcblxuICAvLyBmdW5jdGlvbnNcbiAgZnVuY3Rpb24gY2xlYXJQcmV2aW91cygpIHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXJ0aWNsZScpLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2FydGljbGUnKTtcbiAgICAgIGVsZW1zLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluY0RlY0RhdGUoaW5jRGVjLCBkYXRlKSB7XG4gICAgbGV0IHJlc3VsdCA9IG5ldyBEYXRlKGRhdGUpO1xuICAgIHJlc3VsdC5zZXREYXRlKHJlc3VsdC5nZXREYXRlKCkgKyBpbmNEZWMpO1xuICAgIHJlc3VsdCA9IHJlc3VsdC50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRGF0ZUFycmF5KCkge1xuICAgIGxldCBhcnRpY2xlQ291bnQgPSBhcnRpY2xlTnVtYmVyLnZhbHVlO1xuICAgIGxldCBkYXRlID0gZGF0ZVNlbGVjdG9yLnZhbHVlO1xuICAgIGxldCBkYXRlcyA9IFtdO1xuICAgIGRhdGVzLnB1c2goZGF0ZSk7XG4gICAgYXJ0aWNsZUNvdW50LS07XG4gICAgd2hpbGUgKGFydGljbGVDb3VudCA+IDApIHtcbiAgICAgIGxldCBuZXdEYXRlID0gaW5jRGVjRGF0ZSgtMSwgZGF0ZSk7XG4gICAgICBkYXRlcy5wdXNoKG5ld0RhdGUpO1xuICAgICAgYXJ0aWNsZUNvdW50LS07XG4gICAgICBkYXRlID0gbmV3RGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVzO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZGlzcGxheUFydGljbGVzKCkge1xuICAgIGNsZWFyUHJldmlvdXMoKTtcbiAgICBpbWFnZUNvdW50ID0gMTtcbiAgICBsZXQgZGF0ZUFycmF5ID0gY3JlYXRlRGF0ZUFycmF5KCk7XG4gICAgcmVzdWx0c0FycmF5ID0gYXdhaXQgYWRkUmVtb3RlRGF0YVRvQXJyYXkoZGF0ZUFycmF5KTtcbiAgICByZXN1bHRzQXJyYXkgPSByZXN1bHRzQXJyYXkucmV2ZXJzZSgpO1xuICAgIHJlc3VsdHNBcnJheS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBjcmVhdGVOZXdFbGVtZW50cyhlbGVtZW50KTtcbiAgICB9KTtcbiAgICBzaG93QXJ0aWNsZXMoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dBcnRpY2xlcygpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhcnRpY2xlJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgaWYgKGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW1nJykpIHtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbWcnKS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGFkZFJlbW90ZURhdGFUb0FycmF5KGRhdGVBcnJheSkge1xuICAgIGxldCByZXN1bHRzID0gW107XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGVBcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBkYXRlQXJyYXlbaW5kZXhdO1xuICAgICAgYXdhaXQgZmV0Y2godXJsICsgYXBpS2V5ICsgJyZkYXRlPScgKyBkYXRlKS50aGVuKChyZXNwb25zZSkgPT5cbiAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICByZXN1bHRzW2luZGV4XSA9IGRhdGE7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHJlc29sdmUocmVzdWx0cyk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhc3NlbWJsZSgpIHtcbiAgICByZXN1bHRzQXJyYXkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgY3JlYXRlTmV3RWxlbWVudHMoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOZXdFbGVtZW50cyhkYXRhKSB7XG4gICAgZ3JpZEFyZWEuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAnPGFydGljbGUgaWQ9XCJhcnRpY2xlJyArXG4gICAgICAgIGltYWdlQ291bnQgK1xuICAgICAgICAnXCIgY2xhc3M9XCJhcnRpY2xlXCI+PGRpdiBjbGFzcz1cInNwaW5uZXIgbGRzLXJvbGxlclwiPjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj48YSB0YXJnZXQ9XCJfYmxhbmtcIiBpZD1cImltYWdlLWxpbmsnICtcbiAgICAgICAgaW1hZ2VDb3VudCArXG4gICAgICAgICdcIiBjbGFzcz1cImltYWdlLWxpbmtcIj48aW1nIGlkPVwiaW1nJyArXG4gICAgICAgIGltYWdlQ291bnQgK1xuICAgICAgICAnXCIgc3JjPVwiXCIgbG9hZGluZz1cImxhenlcIiBjbGFzcz1cImltYWdlc1wiPjwvYT48YSB0YXJnZXQ9XCJfYmxhbmtcIiBpZD1cInRpdGxlLWxpbmsnICtcbiAgICAgICAgaW1hZ2VDb3VudCArXG4gICAgICAgICdcIiBjbGFzcz1cIlwidGl0bGUtbGluaz48aDUgaWQ9XCJ0aXRsZScgK1xuICAgICAgICBpbWFnZUNvdW50ICtcbiAgICAgICAgJ1wiIGNsYXNzPVwidGl0bGVcIj48L2g1PjwvYT48L2FydGljbGU+J1xuICAgICk7XG5cbiAgICBsZXQgcG9zdFVybCA9IGRhdGEuaGR1cmw7XG4gICAgbGV0IGFydGljbGVUaXRsZUNvbnRlbnQgPSBkYXRhLnRpdGxlO1xuICAgIGxldCBhcnRpY2xlSW1hZ2VDb250ZW50ID0gZGF0YS51cmw7XG4gICAgbGV0IHBsYWNlSG9sZGVySW1hZ2UgPSAnL2ltYWdlcy9zcGFjZS5qcGcnO1xuICAgIGxldCBwbGFjZUhvbGRlckltYWdlQXJlYURpbWVuc2lvbnMgPSBcIndpZHRoOiAnMjUlJywgJ21hcmdpbi10b3AnOiAnMTVweCdcIjtcbiAgICBsZXQgaW1hZ2VMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ltYWdlLWxpbmsnICsgaW1hZ2VDb3VudCk7XG4gICAgbGV0IHRpdGxlTGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZS1saW5rJyArIGltYWdlQ291bnQpO1xuICAgIGxldCBhcnRpY2xlVGl0bGVBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJyArIGltYWdlQ291bnQpO1xuICAgIGxldCBhcnRpY2xlSW1hZ2VBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltZycgKyBpbWFnZUNvdW50KTtcblxuICAgIGFydGljbGVUaXRsZUFyZWEuaW5uZXJIVE1MID0gYXJ0aWNsZVRpdGxlQ29udGVudDtcbiAgICBpbWFnZUxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgcG9zdFVybCk7XG4gICAgdGl0bGVMaW5rLnNldEF0dHJpYnV0ZSgnaHJlZicsIHBvc3RVcmwpO1xuXG4gICAgaWYgKGFydGljbGVJbWFnZUNvbnRlbnQgIT0gbnVsbCkge1xuICAgICAgYXJ0aWNsZUltYWdlQXJlYS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGFydGljbGVJbWFnZUNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnRpY2xlSW1hZ2VBcmVhXG4gICAgICAgIC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgcGxhY2VIb2xkZXJJbWFnZUFyZWFEaW1lbnNpb25zKVxuICAgICAgICAuc2V0QXR0cmlidXRlKCdzcmMnLCBwbGFjZUhvbGRlckltYWdlKTtcbiAgICB9XG4gICAgaW1hZ2VDb3VudCsrO1xuICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==