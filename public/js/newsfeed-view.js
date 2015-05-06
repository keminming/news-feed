(function(window, document, undefined) {
  var NewsfeedView = {};

  var $newsfeedPostTemplate = $('#newsfeed-post-template');
  var templates = {
    renderPost: Handlebars.compile($newsfeedPostTemplate.html())
  };

  /* Renders the newsfeed into the given $newsfeed element. */
  NewsfeedView.render = function($newsfeed) {
    // TODO
    var posts;
    PostModel.loadAll(function(error,result){
          posts = result;
          //console.log(posts);
          if(posts != null){
            for(var i=0;i<posts.length;i++)
            {
              NewsfeedView.renderPost($newsfeed,posts[i],false);
            }
          }
    });

    $newsfeed.imagesLoaded(function() {
      $newsfeed.masonry({
        columnWidth: '.post',
        itemSelector: '.post'
      });
    });
  };

  /* Given post information, renders a post element into $newsfeed. */
  NewsfeedView.renderPost = function($newsfeed, post, updateMasonry) {
    // TODO
     var content = templates.renderPost(post);
     console.log(content);
     var $post = $(content);

     $newsfeed.prepend($post);

    $post.find(".remove").on("click",function(){
      console.log(post._id);
      PostModel.remove(post._id,function(error,result){
          console.log("fuck");
          $newsfeed.masonry('remove', $post);
          $newsfeed.masonry();
       });
     });

    $post.find(".upvote").on("click",function(){
        PostModel.upvote(post._id,function(error,result){
          $post.find(".upvote-count").text(parseInt($post.find(".upvote-count").text()) + 1);
        });
     });

    if (updateMasonry) {
      $newsfeed.imagesLoaded(function() {
        $newsfeed.masonry('prepended', $post);
      });
    }
  };

  window.NewsfeedView = NewsfeedView;
})(this, this.document);
