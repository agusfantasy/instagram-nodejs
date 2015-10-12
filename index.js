var rp = require('request-promise');

var apiUrl = 'https://api.instagram.com/';
var version = 'v1';
   
var Instagram = function(token){
	this.access_token = token;
}

Instagram.prototype.option = function(path, method, params){
	
	var query = '?access_token='+this.access_token; 

	if (params != undefined) {
		query += params;
	}

	var options = {
		method: method,
	    uri: apiUrl+version+path+query,
	    headers: {
	        'User-Agent': 'Request-Promise',
	        'Accept' : 'application/json'
	    },
	    resolveWithFullResponse: true,
	    json: true
	};

	return options;
}

Instagram.prototype.connect = function(path, method){
	return rp(this.option(path, method));
}

/**
* Instagram Media Endpoints
* API Documentation: https://instagram.com/developer/endpoints/media
*/
Instagram.prototype.media = function(id){
	return rp(this.option('/media/'+id, 'GET'));
}
Instagram.prototype.mediaShortcode = function(code){
	return rp(this.option('/media/shortcode/'+code, 'GET'));
}
Instagram.prototype.mediaSearch = function(lat, lng){
	return rp(this.option('/media/search', 'GET', '&lat='+lat+'&lng='+lng));
}
Instagram.prototype.mediaPopular = function(){
	return rp(this.option('/media/popular', 'GET'));
}

/*
* Instagram User Endpoints
* API Documentation: https://instagram.com/developer/endpoints/users
*/
Instagram.prototype.users = function(userId){
	return rp(this.option('/users/'+userId, 'GET'));
}
Instagram.prototype.usersSelfFeed = function(maxId){
	return rp(this.option('/users/self/feed', 'GET', '&max_id='+maxId));
}
Instagram.prototype.usersMediaRecent = function(userId, maxId){
	return rp(this.option('/users/'+userId+'/media/recent', 'GET', '&max_id='+maxId));
}
Instagram.prototype.usersSelfMediaLiked = function(maxId){
	return rp(this.option('/users/self/media/liked', 'GET', '&max_id='+maxId));
}
Instagram.prototype.usersSearch = function(q){
	return rp(this.option('/users/search', 'GET', '&q='+q));
}
Instagram.prototype.usersFollows = function(userId){
	return rp(this.option('/users/'+userId+'/follows', 'GET'));
}
Instagram.prototype.usersFollowedBy = function(userId){
	return rp(this.option('/users/'+userId+'/followed-by', 'GET'));
}
Instagram.prototype.usersSelfRequestedBy = function(){
	return rp(this.option('/users/self/requested-by', 'GET'));
}
Instagram.prototype.usersGetRelationship = function(userId){
	return rp(this.option('/users/'+userId+'/relationship', 'GET'));
}
Instagram.prototype.usersPostRelationship = function(userId){
	return rp(this.option('/users/'+userId+'/relationship', 'POST'));
}

//media comment
Instagram.prototype.mediaGetComment = function(mediaId){
	return rp(this.option('/media/'+mediaId+'/comment', 'GET'));
}
Instagram.prototype.mediaPostComment = function(mediaId, data){
	return rp(this.option('/media/'+mediaId+'/comment', 'POST', data));
}
Instagram.prototype.mediaDelComment = function(mediaId){
	return rp(this.option('/media/'+mediaId+'/comment', 'DELETE'));
}

//media likes
Instagram.prototype.mediaGetLikes = function(mediaId){
	return rp(this.option('/media/'+mediaId+'/likes', 'GET'));
}
Instagram.prototype.mediaPostLikes = function(mediaId){
	return rp(this.option('/media/'+mediaId+'/likes', 'POST'));
}
Instagram.prototype.mediaDelLikes = function(mediaId){
	return rp(this.option('/media/'+mediaId+'/likes', 'DELETE'));
}

//tags
Instagram.prototype.tags = function(tagName){
	return rp(this.option('/tags/'+tagName, 'GET'));
}
Instagram.prototype.tagsMediaRecent = function(tagName, maxId){
	return rp(this.option('/tags/'+tagName+'/media/recent', 'GET', '&max_id='+maxId));
}
Instagram.prototype.tagsSearch = function(q){
	return rp(this.option('/tags/search', 'GET', '&q='+q));
}

//location
Instagram.prototype.location = function(locationId){
	return rp(this.option('/location/'+locationId, 'GET'));
}
Instagram.prototype.locationMediaRecent = function(locationId){
	return rp(this.option('/location/'+locationId+'/media/recent', 'GET'));
}
Instagram.prototype.locationSearch = function(lat, lng){
	return rp(this.option('/location/search', 'GET', '&lat='+lat+'&lng='+lng));
}

exports.init = function(token){
	return new Instagram(token);
}
