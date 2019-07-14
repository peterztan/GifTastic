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
              memesDiv.addClass("row justify-content-md-center");

              var rating = results[i].rating;

              var p = $("<h1>");

              p.addClass("card-header text-light");
              
              p.text("Rating: " + rating);

              var memeImage = $("<img>");

              memeImage.attr("src", results[i].images.fixed_height.url);
              memeImage.addClass("card-img img-fluid");

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

    pushTopic();

});