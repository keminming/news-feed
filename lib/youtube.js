var request = require('request');

var YT_URL = 'https://www.googleapis.com/youtube/v3/search';
var YT_API_KEY = 'AIzaSyDDP01Gnj3-wfoqM59xQz6pryJQhmYWCt8';
var YT_EMBED_URL = 'http://www.youtube.com/embed/';

/**
 * Queries YouTube for tracks that match the given query
 * 
 * @param query - the search query to send to YouTube
 *
 * Calls @param callback(error, results):
 *  error -- the error that occurred or null if no error
 *  results -- if error is null, contains the search results
 */



exports.search = function(query, callback) {
  // TODO
	var option = {
		url:'https://www.googleapis.com/youtube/v3/search',
		qs:	{
		  		"key":YT_API_KEY,
		  		"q":query,
		  		"part":"snippet",
		  		"type":"video"
		  	}
	};

    request(
    	option,
	  	function(error, response, body){
	  		if(error != null)
	  		{
	  			callback(error);
	  		}
	  		else
	  		{
	  			console.log(body);
	  			res = JSON.parse(body);
	  			console.log(res[0]);
	  			list = [];
	  			for(var i =0;i<res.items.length;i++)
	  			{
	  				track = {};
	  				track.title= res.items[i].snippet.title;
	  				track.source =  YT_EMBED_URL + res.items[i].id.videoId;
	  				list.push(track);
	  			}
	  			callback(error,list);
	  		}
	  	}
  	);
};
