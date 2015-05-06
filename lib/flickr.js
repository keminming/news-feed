var request = require('request');

var FLICKR_URL = 'https://api.flickr.com/services/rest/?';
var FLICKR_API_KEY = '3cffcc97867ea6aaf3d7fa2690f0ae10';
var STATUS_OK = 200;

/**
 * Queries Flickr for photos that match the given query.
 *
 * @param query -- the search query to send to Flickr
 *
 * Calls @param callback(error, results):
 *  error -- the error that occurred or null if no error
 *  results -- if error is null, contains the search results
 */
exports.search = function(query, callback) {
  // TODO
    var option = {
    	url:FLICKR_URL,
    	qs:{
		  		"api_key":FLICKR_API_KEY,
		  		"q":query,
		  		"method":"flickr.photos.search",
		  		"format ":"json",
		  		"media":"photos",
		  		"sort ":"relevance",
		  		"nojsoncallback ": 1
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
	  			list = [];
	  			for(var i =0;i<res.length;i++)
	  			{
	  				track = {};
	  				track.title = res[i].title;
	  				track.source =  'https://farm' + res[i].farm + '.staticflickr.com/' +
    res[i].server + '/' + res[i].id + '_' + res[i].secret + '_z.jpg'
    				list.push(track);
	  			}
	  			callback(error,list);
	  		}
	  	}
  	);
};
