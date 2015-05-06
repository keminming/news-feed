(function(window, document, undefined) {
  var PostModel = {};

  var POSTS_URL= '/posts';
  var STATUS_OK = 200;

  /**
   * Loads all newsfeed posts from the server.
   *
   * Calls: callback(error, posts)
   *  error -- the error that occurred or null if no error occurred
   *  results -- an array of newsfeed posts
   */
  PostModel.loadAll = function(callback) {
    // TODO
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", POSTS_URL, false );
    xmlHttp.send();
    callback(null,JSON.parse(xmlHttp.responseText));
  };

  /* Adds the given post to the list of posts. The post must *not* have
   * an _id associated with it.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or null if no error occurred
   *  post -- the post added, with an _id attribute
   */
  PostModel.add = function(post, callback) {
    // TODO
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", POSTS_URL, false );
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var param = JSON.stringify(post);
    console.log("param");
    console.log(param);
    xmlHttp.send(param);
    callback(null,JSON.parse(xmlHttp.responseText));
  };

  /* Removes the post with the given id.
   *
   * Calls: callback(error)
   *  error -- the error that occurred or null if no error occurred
   */
  PostModel.remove = function(id, callback) {
    // TODO
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", POSTS_URL + "/remove", false );
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var param = JSON.stringify({"id":id});
    xmlHttp.send(param);
    callback(null,null);
  };

  /* Upvotes the post with the given id.
   *
   * Calls: callback(error, post)
   *  error -- the error that occurred or null if no error occurred
   *  post -- the updated post model
   */
  PostModel.upvote = function(id, callback) {
    // TODO
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", POSTS_URL + "/upvote", false );
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var param = JSON.stringify({"id":id});
    xmlHttp.send(param);
    callback(null,null);
  };

  window.PostModel = PostModel;
})(this, this.document);
