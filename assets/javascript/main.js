$('document').ready(function () {
    var topics = ['Lo-Fi', 'Piano', 'Violin', 'Cello', 'Harry Potter', 'Marvel', 'Coding', 'Anime', 'Video Games']

    function pushTopic() {
        $('#topics').empty();

        for (let i = 0; i < topics.length; i++) {
            var b = $('<button>');
            b.attr('type', 'button');
            b.addClass('btn btn-lg btn-dark');
            b.addClass('topic');
            b.addClass('m-1');
            b.attr('data-name', topics[i]);
            b.text(topics[i]);
            $('#topics').append(b);
        };
    };

    function getMemes() {
        $('#results').empty();

        var memes = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + memes + "&api_key=Y9pnMmdPnIYLKiuzi40iVVmzTU8mCNfF&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            console.log(response.data);

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var memesDiv = $("<div>");
                    memesDiv.addClass("card-transparent row justify-content-md-center");

                    var rating = results[i].rating;
                    var title = results[i].title;

                    var p = $("<h1>");

                    p.addClass("col-md-12 card-footer text-left text-light");
                    p.addClass("shadow-lg p-1 mb-5 rounded");

                    p.text("Title: " + title);
                    p.append("<br>");
                    p.append("Rating: " + rating);
                    var memeImage = $("<img>");

                    memeImage.attr("src", results[i].images.fixed_height_small_still.url);

                    memeImage.addClass("card-img img-fluid shadow-lg rounded");
                    memeImage.addClass("memeImg");

                    memesDiv.append(memeImage);
                    memesDiv.append(p);

                    $("#results").prepend(memesDiv);
                }
            }
        });
    };

    $('#add').on('click', function () {
        event.preventDefault();

        var getTopic = $('#inputTopic').val().trim();
        if (getTopic !== '') {
            topics.push(getTopic);
            pushTopic();
        };
    });

    $(document).on("click", ".topic", getMemes);
    $(document).on("click", ".memeImg", function () {

        var memeState = $(this).attr("data-state");
        if (memeState === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    pushTopic();

});