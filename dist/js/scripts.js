"use strict";

$(document).ready(function () {
    // Event handlers

    var dateSelector = document.querySelector("#date-selector");
    var todaysDate = dateSelector.value;
    var gridArea = document.querySelector("#image-grid-area");
    var articleNumber = document.querySelector('#article-number');

    Date.prototype.toDateInputValue = function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    };
    document.getElementById('date-selector').value = new Date().toDateInputValue();

    $("#next-page").click(function () {
        if (dateSelector.value == todaysDate) {
            alert('you are viewing the most recent pictures');
        } else {
            dateSelector.value = incDecDate(1, dateSelector.value);
            displayArticles();
        }
    });

    $("#previous-page").click(function () {
        dateSelector.value = incDecDate(-1, dateSelector.value);
        displayArticles();
    });

    $("#show-articles").click(function () {
        displayArticles();
    });

    $(".article").hover(function () {
        $(this).find("a").addClass("highlighted");
    }, function () {
        $(this).find("a").removeClass("highlighted");
    });

    displayArticles();

    // functions

    function clearClones() {
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
        //Clear previous article element clones if any are present...
        clearClones();
        var currentDate = "date=" + dateSelector.value;
        var dateArray = createDateArray();
        var url = "https://api.nasa.gov/planetary/apod?";
        var apiKey = "api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS";
        var imageCount = 1;

        dateArray.forEach(function (element) {
            fetch(url + apiKey + "&date=" + element, {}).then(function (response) {
                return response.json();
            }).then(function (data) {
                gridArea.insertAdjacentHTML("beforeend", '<article id="article' + imageCount + '" class="article"><a target="_blank" id="image-link' + imageCount + '" data-fancybox="gallery" class="image-link"><img id="img' + imageCount + '" src="" class="images"></a><a target="_blank" id="title-link' + imageCount + '" class=""title-link><h5 id="title' + imageCount + '" class="title"></h5></a></article>');

                var postUrl = data.hdurl;
                var articleTitleContent = data.title;
                var articleImageContent = data.url;
                var placeHolderImage = "space.jpg";
                var placeHolderImageAreaDimensions = {
                    width: "25%",
                    "margin-top": "15px"
                };
                var imageLink = document.querySelector("#image-link" + imageCount + "");
                var titleLink = document.querySelector("#title-link" + imageCount + "");
                var articleTitleArea = $("#title" + imageCount + "");
                var articleImageArea = $("#img" + imageCount + "");

                articleTitleArea.html(articleTitleContent);
                imageLink.setAttribute("href", postUrl);
                titleLink.setAttribute("href", postUrl);

                if (articleImageContent != null) {
                    articleImageArea.attr("src", articleImageContent);
                } else {
                    articleImageArea.css(placeHolderImageAreaDimensions).attr("src", placeHolderImage);
                }
                imageCount++;
            });
        });
    }
});
//# sourceMappingURL=scripts.js.map
