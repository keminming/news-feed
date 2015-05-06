(function(window, document, undefined) {
  var SearchModel = {};

  var SEARCH_URL = '/search';
  var STATUS_OK = 200;

  /**
   * Loads API search results for a given query.
   *
   * Calls: callback(error, results)
   *  error -- the error that occurred or NULL if no error occurred
   *  results -- an array of search results
   */
  SearchModel.search = function(query, callback) {
    // TODO
    var xmlHttp = null;
    var theUrl = '/search?query=' + encodeURIComponent(query);
    console.log(theUrl);
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send();
    callback(null,JSON.parse(xmlHttp.responseText));
  };
  window.SearchModel = SearchModel;
})(this, this.document);
