// TODO: put any require() calls here
var soundcloud = require("../lib/soundcloud.js");
var youtube = require("../lib/youtube.js");
var Post = require("../models/post.js");

module.exports = function(app) {
	/* Renders the newsfeed landing page. */
	app.get('/', function(request, response) {
		response.render('index.html');
	});

	app.get('/search', function(request, response) {
	  var query = request.query.query;
	  var counter = 2;
	  var res = [];
	  soundcloud.search(query, function(error,result) { 
	  	if(error != null)
	  		throw error;
	  	counter = counter - 1;
	  	if(result.length > 0)
	  	{
	  		result[0].api = "soundcloud";
	  		res.push(result[0]);
	  	}

	  	if(counter == 0)
	  		response.json(200, res);
	  });

	  // flickr.search(query, function(error,result) { 
	  // 	if(error != null)
	  // 		throw error;
	  // 	counter = counter - 1;
	  // 	if(result.length > 0)
	  // 	{
	  // 		result[0].api = "flickr";
	  // 		res.push(result[0]);
	  // 	}

	  // 	if(counter == 0)
	  // 		response.json(200, res);
	  // });

	  youtube.search(query, function(error,result) { 
	  	if(error != null)
	  		throw error;
	  	counter = counter - 1;
	  	if(result.length > 0)
	  	{
	  		result[0].api = "youtube";
	  		res.push(result[0]);
	  	}

	  	if(counter == 0)
	  		response.json(200, res);
	  });
	});

	app.get('/posts', function(request, response) {
		Post.find(function(error,post){
			if(error){
				throw error;
			}
			response.json(post);
		});
	});

	app.post('/posts',function(request,response){

		var post = new Post({
			"api": request.body.api,
			"source": request.body.source,
			"title": request.body.title,
			"upvotes": 0
		});

		post.save(function(error){
			if(error){
				throw error;
			}
		});

		response.json(post);
	});

	app.post('/posts/remove',function(request,response){
		var id = request.body.id;
		console.log(id);

		Post.findByIdAndRemove(id,function(error){
			if(error){
				throw error;
			}
			console.log("ri");
		});
		response.json(null);
	});

	app.post('/posts/upvote',function(request,response){
		var id = request.body.id;
		console.log("update");
		console.log(id);

		Post.findById(id, function(error,  post) {
			if (error) {
				throw error;
			}

			console.log(post);
			
		//update properties on the person object
		post.upvotes = post.upvotes + 1;

		//write these changes to the database
		post.save(function(error) {
			if (error) {
				throw error;
			}
		});
	});

		response.json(null);
	});

  // TODO
};
