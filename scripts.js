$(document).ready(function () {
    // "use strict";

    // Event handlers

    $('#next-page').click(function () {
        addDays(1);
        displayArticles();
    });

    $('#previous-page').click(function () {
        addDays(-1);
        displayArticles();
    });

    $('#show-articles').click(function () {
        displayArticles();
    });

    $('#hide-controls').click(function () {
        hideControls();
    });

    $('.article').hover(function () {
        $(this).find('a').addClass('highlighted');
    }, function () {
        $(this).find('a').removeClass('highlighted');
    });

    displayArticles();

    // functions

    function hideControls() {
        doucment.querySelector('#user-interface').hide();
    }

    function clearClones() {
        if (document.querySelectorAll('article').length > 0) {
          var elems = document.querySelectorAll('article');
          elems.forEach(element => {
              element.remove();
          });
        }
    }

    function addDays(days) {
        var selectedDate = document.querySelector('#date-selector').value;
        var result = new Date(selectedDate);
        result.setDate(result.getDate() + days);
        result = result.toISOString().slice(0, 10);
        document.querySelector('#date-selector').value = result;
    }

    function displayArticles() {

        //Clear previous article element clones if any are present...
        clearClones();
        let dateArray = ['2018-06-14','2018-06-15','2018-06-16','2018-06-17'];
        let currentDate = 'date=' + document.querySelector('#date-selector').value;
        let url = "https://api.nasa.gov/planetary/apod?";
        let apiKey = "api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS";
        let imageCount = 1;

        dateArray.forEach(element => {

            fetch(url + apiKey + '&' + 'date=' + element, {
                api_key:"ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS",
                date: currentDate,
            })
            .then(response => response.json())
            .then(function(data) {
                document.querySelector('#image-grid-area').insertAdjacentHTML('beforeend', '<article id="article' + imageCount + '" class="article"><a target="_blank" id="image-link' + imageCount + '" data-fancybox="gallery" class="image-link"><img id="img' + imageCount + '" src="" class="images"></a><a target="_blank" id="title-link' + imageCount + '" class=""title-link><h5 id="title' + imageCount + '" class="title"></h5></a></article>');

                let postUrl = data.hdurl;
                let articleTitleContent = data.title;
                let articleImageContent = data.url;
                let imageSize = "w=600&h=400&fit=1";
                let placeHolderImage = "space.jpg";
                let imageAreaDimensions = {
                    'width': '100%',
                    'margin-top': '0px'
                };
                let placeHolderImageAreaDimensions = {
                    'width': '25%',
                    'margin-top': '15px'
                };

                let imageLink = document.querySelector('#image-link' + imageCount + '');
                let titleLink = document.querySelector('#title-link' + imageCount + '');
                let articleTitleArea = $('#title' + imageCount + '');
                let articleImageArea = $('#img' + imageCount + '');
            
                articleTitleArea.html(articleTitleContent);
                imageLink.setAttribute("href", postUrl);
                titleLink.setAttribute('href', postUrl);

                if (articleImageContent != null) {
                    articleImageArea.css(imageAreaDimensions).attr('src', articleImageContent + "?" + imageSize);
                } else {
                    articleImageArea.css(placeHolderImageAreaDimensions).attr('src', placeHolderImage);
                }
                imageCount++;
            });
        });
    }
});