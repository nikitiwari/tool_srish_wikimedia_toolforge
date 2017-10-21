$(document).ready(function () {
  var searchTerm = $('#searchTerm');
  $('#submitBtn').click(function (event) {
    event.preventDefault();
    $("#output").empty();
    var username = searchTerm.val();
    var uri = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=usercontribs&ucuser={{searchTerm}}&ucdir=newer&uclimit=5'.replace('{{searchTerm}}', username);
    var url = encodeURI(uri);
    $.getJSON(url).then(function (data) {
      console.log(data);
      var contribs = [];
      $.each(data.query.usercontribs, function (key, val) {
        var contribElem = '<li><h4>{{title}}</h4><p><a href="https://en.wikipedia.org/w/index.php?pageid={{pageid}}&oldid={{oldid}}&diff=prev">Link of the article</a></p> <h4>{{timestamp}}</h4> </li>'.replace('{{title}}', val.title).replace('{{pageid}}', val.pageid).replace('{{oldid}}', val.revid).replace('{{timestamp}}', val.timestamp);
        contribs.push(contribElem);
    });
      $('<ol/>', {
        'class': 'contribution-list',
        html: contribs.join('')
      }).appendTo('#output');
    })
  });
});
