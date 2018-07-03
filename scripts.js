"use strict";

$(document).ready(function () {
    // Event handlers

    const dateSelector = document.querySelector("#date-selector");
    const todaysDate = dateSelector.value;
    const gridArea = document.querySelector("#image-grid-area");
    const articleNumber = document.querySelector('#article-number');

    Date.prototype.toDateInputValue = (function () {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local
            .toJSON()
            .slice(0, 10);
    });
    document
        .getElementById('date-selector')
        .value = new Date().toDateInputValue();

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
        $(this)
            .find("a")
            .addClass("highlighted");
    }, function () {
        $(this)
            .find("a")
            .removeClass("highlighted");
    });

    displayArticles();

    // functions

    function clearClones() {
        if (document.querySelectorAll("article").length > 0) {
            var elems = document.querySelectorAll("article");
            elems.forEach(element => {
                element.remove();
            });
        }
    }

    function incDecDate(incDec, date) {
        let result = new Date(date);
        result.setDate(result.getDate() + incDec);
        result = result
            .toISOString()
            .slice(0, 10);
        return result;
    }

    function createDateArray() {
        let articleCount = articleNumber.value;
        let date = dateSelector.value;
        let dates = [];
        dates.push(date);
        articleCount--;
        while (articleCount > 0) {
            let newDate = incDecDate(-1, date)
            dates.push(newDate);
            articleCount--;
            date = newDate;
        }
        return dates;
    }

    function displayArticles() {
        //Clear previous article element clones if any are present...
        clearClones();
        let currentDate = "date=" + dateSelector.value;
        let dateArray = createDateArray();
        let url = "https://api.nasa.gov/planetary/apod?";
        let apiKey = "api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS";
        let imageCount = 1;

        dateArray.forEach(element => {
            fetch(url + apiKey + "&date=" + element, {})
                .then(response => response.json())
                .then(function (data) {
                    gridArea.insertAdjacentHTML("beforeend", '<article id="article' + imageCount + '" class="article"><a target="_blank" id="image-link' + imageCount + '" data-fancybox="gallery" class="image-link"><img id="img' + imageCount + '" src="" class="images"></a><a target="_blank" id="title-link' + imageCount + '" class=""title-link><h5 id="title' + imageCount + '" class="title"></h5></a></article>');

                    let postUrl = data.hdurl;
                    let articleTitleContent = data.title;
                    let articleImageContent = data.url;
                    // let imageSize = "w=600&h=400&fit=1";
                    let placeHolderImage = "space.jpg";
                    // let imageAreaDimensions = {     width: "100%",     "margin-top": "0px" };
                    let placeHolderImageAreaDimensions = {
                        width: "25%",
                        "margin-top": "15px"
                    };
                    let imageLink = document.querySelector("#image-link" + imageCount + "");
                    let titleLink = document.querySelector("#title-link" + imageCount + "");
                    let articleTitleArea = $("#title" + imageCount + "");
                    let articleImageArea = $("#img" + imageCount + "");

                    articleTitleArea.html(articleTitleContent);
                    imageLink.setAttribute("href", postUrl);
                    titleLink.setAttribute("href", postUrl);

                    if (articleImageContent != null) {
                        articleImageArea
                        // .css(imageAreaDimensions)
                            .attr("src", articleImageContent);
                    } else {
                        articleImageArea
                            .css(placeHolderImageAreaDimensions)
                            .attr("src", placeHolderImage);
                    }
                    imageCount++;
                });
        });
    }
});
