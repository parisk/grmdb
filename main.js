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
          movieHtml += '</li>';

          $('#movie-list').append(movieHtml);
        };
      });
  });
});
