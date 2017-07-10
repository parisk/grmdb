// We run all of our code in a `$()`, to make it run, after the DOM has loaded.
// `$()` is a shorthand for `$.ready()`: https://api.jquery.com/ready/

$(function () {

  // When a user clicks on the DOM element with id="search-button", then
  // run the code included in the provided anonymous function.
  $('#search-button').on('click', function () {

    // Let the user know that they have to wait a little bit :).
    $('#movie-list').text('Πλιζ γουέιτ...');

    // Request the `/api/movies.json` file from the server
    $.get('/api/movies.json')

       // If the request succeeds, then run the code included in the provided
       // anonymous function. The value of `data` will be a JavaScript array
       // that will contain all entries of `movies.json`.
      .done(function (data) {

        // Empty the contents of the DOM element with id="movie-list"
        $('#movie-list').html('');

        // Run a for loop with {number of movies} number of steps
        for (let i=0; i<data.length; i++) {

          // Store the current movie in a local variable, as a shorthand
          let movie = data[i];

          // Store the current search term in a local variable
          let startsWith = $('#movie-search').val();

          // Store the first {search term length} number of characters of
          // the current movie into a local variable
          let titleStartsWith = movie.title.substring(
            0, startsWith.length
          );

          // If `startsWith` == `titleStartsWith`, which in simple words means:
          //
          // If the current movie's title starts **exactly** with the current
          // search term, run the code inside the `if` clause.
          if (startsWith == titleStartsWith) {

            // Start creating the HTML code needed for a `list-group-item` to
            // display the current movie, in the movie list/
            //
            // http://getbootstrap.com/components/#list-group
            let movieHtml = '<li class="list-group-item">';
            movieHtml += movie.title;

            // Store the current movie's id in a data attribute in each
            // list item's "inspect" button"
            // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
            movieHtml += '<button data-movie-id="';
            movieHtml += movie.id;
            movieHtml += '" data-toggle="modal" data-target="#film-details">Επισκόπηση</button>';
            movieHtml += '</li>';

            // Add the HTML element for the current film in the movie list
            // http://getbootstrap.com/javascript/#live-demo
            $('#movie-list').append(movieHtml);
          }
        };
    });
  });
});


// When the movie details modal window opens run the code included in the
// provided anonymous function.
// http://getbootstrap.com/javascript/#modals-events
$('#film-details').on('show.bs.modal', function (event) {

  // Store the button that triggered the modal into a local variable
  let button = $(event.relatedTarget);

  // Store the movie id data attribute of the above button
  // into a local variable
  let movieId = parseInt($(button).attr('data-movie-id'));

  // Request the `/api/movies.json` file from the server
  $.get('/api/movies.json')

    // If the request succeeds, then run the code included in the provided
    // anonymous function. The value of `data` will be a JavaScript array
    // that will contain all entries of `movies.json`.
    .done(function (data) {

      // Run a for loop with {number of movies} number of steps
      for (let i=0; i<data.length; i++) {

        // Store the current movie in a local variable, as a shorthand
        let movie = data[i];

        // If the current movie's id equals to the id of the button that
        // triggered the modal, run the code included in the following
        // `if` clause.
        if (movie.id == movieId) {

          // Set the `src` attribute of the movie's image element,
          // to the `image_url` attribute of the current movie object.
          $('#movie-img').attr('src', movie.image_url);

          // Set the content of the movie's title element
          // to the `title` attribute of the current movie object.
          $('#movie-title').text(movie.title);

          // Set the content of the movie's rating element
          // to the `rating` attribute of the current movie object.
          $('#movie-rating').text(movie.rating);

          // Set the content of the movie's description element
          // to the `description` attribute of the current movie object.
          $('#movie-description').text(movie.description);
        }
      }
    });
});








