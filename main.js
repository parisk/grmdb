$(function () {
  $('#search-button').on('click', function () {
    $.get('/api/movies.json')
      .done(function (data) {
      $('#movie-list').html('');
      for (let i=0; i<data.length; i++) {
        let movie = data[i];

        let startsWith = $('#movie-search').val();
        let titleStartsWith = movie.title.substring(
          0, startsWith.length
        );

        if (startsWith != titleStartsWith) {
          continue;
        }






        let movieHtml = '<li class="list-group-item">';
        movieHtml += movie.title;
        movieHtml += '<button data-movie-id="';
        movieHtml += movie.id;
        movieHtml += '" data-toggle="modal" data-target="#myModal">Επισκόπηση</button>';
        movieHtml += '</li>';

        $('#movie-list').append(movieHtml);
      };
    });
  });
});


$('#myModal').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget); // Button that triggered the modal
  let movieId = parseInt($(button).attr('data-movie-id'));

  console.log(
    'Modal opened from button of movie ' + $(button).attr('data-movie-id')
  );

  $.get('/api/movies.json')
    .done(function (data) {
      for (let i=0; i<data.length; i++) {
        let movie = data[i];

        if (movie.id == movieId) {
          $('#movie-img').attr('src', movie.image_url);
          $('#movie-title').text(movie.title);
          $('#movie-rating').text(movie.rating);
          $('#movie-description').text(movie.description);
        }
      }
    });
});








