"use strict";

// import "babel-polyfill";
// import "whatwg-fetch";
// import Promise from "promise-polyfill";
// // To add to window
// if (!window.Promise) {
//     window.Promise = Promise;
// }

$(document).ready(function () {
    // Event handlers

    $("#next-page").click(function () {
        addDays(1);
        displayArticles();
    });

    $("#previous-page").click(function () {
        addDays(-1);
        displayArticles();
    });

    $("#show-articles").click(function () {
        displayArticles();
    });

    $("#hide-controls").click(function () {
        hideControls();
    });

    $(".article").hover(function () {
        $(this).find("a").addClass("highlighted");
    }, function () {
        $(this).find("a").removeClass("highlighted");
    });

    displayArticles();

    // functions

    function hideControls() {
        doucment.querySelector("#user-interface").hide();
    }

    function clearClones() {
        if (document.querySelectorAll("article").length > 0) {
            var elems = document.querySelectorAll("article");
            elems.forEach(function (element) {
                element.remove();
            });
        }
    }

    function addDays(days) {
        var selectedDate = document.querySelector("#date-selector").value;
        var result = new Date(selectedDate);
        result.setDate(result.getDate() + days);
        result = result.toISOString().slice(0, 10);
        document.querySelector("#date-selector").value = result;
    }

    function displayArticles() {
        //Clear previous article element clones if any are present...
        clearClones();
        var dateArray = ["2018-06-14", "2018-06-15", "2018-06-16", "2018-06-17"];
        var currentDate = "date=" + document.querySelector("#date-selector").value;
        var url = "https://api.nasa.gov/planetary/apod?";
        var apiKey = "api_key=ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS";
        var imageCount = 1;

        dateArray.forEach(function (element) {
            fetch(url + apiKey + "&" + "date=" + element, {
                api_key: "ZyAZ65TRjYZ4Sto72jlrgtOieAXPJuVymJFrf0RS",
                date: currentDate
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                document.querySelector("#image-grid-area").insertAdjacentHTML("beforeend", '<article id="article' + imageCount + '" class="article"><a target="_blank" id="image-link' + imageCount + '" data-fancybox="gallery" class="image-link"><img id="img' + imageCount + '" src="" class="images"></a><a target="_blank" id="title-link' + imageCount + '" class=""title-link><h5 id="title' + imageCount + '" class="title"></h5></a></article>');

                var postUrl = data.hdurl;
                var articleTitleContent = data.title;
                var articleImageContent = data.url;
                var imageSize = "w=600&h=400&fit=1";
                var placeHolderImage = "space.jpg";
                var imageAreaDimensions = {
                    width: "100%",
                    "margin-top": "0px"
                };
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
                    articleImageArea.css(imageAreaDimensions).attr("src", articleImageContent + "?" + imageSize);
                } else {
                    articleImageArea.css(placeHolderImageAreaDimensions).attr("src", placeHolderImage);
                }
                imageCount++;
            });
        });
    }
});
//# sourceMappingURL=scripts.js.map
