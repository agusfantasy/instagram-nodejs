var https = require('https');

var apiUrl = 'api.instagram.com';
var version = 'v1';

var instagram = function(token){
	this.access_token = token;
}

var responseBody = "";

instagram.prototype.connect = function(path, method, param){

	var params = (param != undefined) ? param : '';
	
	var options = {
		hostname: apiUrl,
		path: '/'+version+path+'?access_token='+this.access_token+ params,
		method: method,
		headers:{
			'Content-Type': 'application/json'
		}
	}

	var req = https.request(options, function(res){
		
		var body = ""; 
		res.on('data', function(chunk) {
	    	body += chunk;
	  	});
	  	res.on('end', function() {
	    	responseBody = body;
  		});	
  		
	});

	req.end();

	req.on('error', function(e) {
		responseBody = e;
	});

	return responseBody;
}

/**
* Instagram Media Endpoints
* API Documentation: https://instagram.com/developer/endpoints/media
*/
instagram.prototype.media = function(id){
	return this.connect('/media/'+id, 'GET');
}

instagram.prototype.mediaShortcode = function(code){
	return this.connect('/media/shortcode/'+code, 'GET');
}

instagram.prototype.mediaSearch = function(lat, lng){
	return this.connect('/media/search', 'GET', '&lat=' +lat+ '&lng=' +lng);
}

instagram.prototype.mediaPopular = function(){
	return this.connect('/media/popular', 'GET');
}

/*
* Instagram User Endpoints
* API Documentation: https://instagram.com/developer/endpoints/users
*/
instagram.prototype.users = function(userId){
	return this.connect('/media/'+userId, 'GET');
}

instagram.prototype.usersSelfFeed = function(max_id){
	return this.connect('/users/self/feed', 'GET');
}

instagram.prototype.usersMediaRecent = function(userId){
	return this.connect('/users/'+userId+'/media/recent', 'GET');
}

instagram.prototype.usersSelfMediaLiked = function(){
	return this.connect('/users/self/media/liked', 'GET');
}

instagram.prototype.usersSearch = function(q){
	return this.connect('/users/search', 'GET', '&q=' +q);
}

instagram.prototype.usersFollows = function(userId){
	return this.connect('/users/'+userId+'/follows', 'GET');
}
 
instagram.prototype.usersFollowedBy = function(userId){
	return this.connect('/users/'+userId+'/followed-by', 'GET');
}

instagram.prototype.usersSelfRequestedBy = function(){
	return this.connect('/users/self/requested-by', 'GET');
}

instagram.prototype.usersGetRelationship = function(userId){
	return this.connect('/users/'+userId+'/relationship', 'GET');
}

instagram.prototype.usersPostRelationship = function(userId){
	return this.connect('/users/'+userId+'/relationship', 'POST');
}

//media comment
instagram.prototype.mediaGetComment = function(mediaId){
	return this.connect('/media/'+mediaId+'/comment', 'GET');
}
instagram.prototype.mediaPostComment = function(mediaId, data){
	return this.connect('/media/'+mediaId+'/comment', 'POST', data);
}
instagram.prototype.mediaDelComment = function(mediaId){
	return this.connect('/media/'+mediaId+'/comment', 'DELETE');
}

//media likes
instagram.prototype.mediaGetLikes = function(mediaId){
	return this.connect('/media/'+mediaId+'/likes', 'GET');
}
instagram.prototype.mediaPostLikes = function(mediaId){
	return this.connect('/media/'+mediaId+'/likes', 'POST');
}
instagram.prototype.mediaDelLikes = function(mediaId){
	return this.connect('/media/'+mediaId+'/likes', 'DELETE');
}


//tags
instagram.prototype.tags = function(tagName){
	return this.connect('/tags/'+tagName, 'GET');
}
instagram.prototype.tagsMediaRecent = function(tagName){
	return this.connect('/tags/'+tagName+'/media/recent', 'GET');
}
instagram.prototype.tagsSearch = function(q){
	return this.connect('/tags/search', 'GET', '&q=' +q);
}

//location
instagram.prototype.location = function(locationId){
	return this.connect('/location/'+locationId, 'GET');
}
instagram.prototype.locationMediaRecent = function(locationId){
	return this.connect('/location/'+locationId+'/media/recent', 'GET');
}
instagram.prototype.locationSearch = function(lat, lng){
	return this.connect('/location/search', 'GET', '&lat='+lat+'&lng='+lng);
}

exports.init = function(token){
	return new instagram(token);
}
