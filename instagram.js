var https = require('https');

var apiUrl = 'api.instagram.com';
var version = 'v1';

var instagram = function(token){
	this.access_token = token;
}

var responseBody;

instagram.prototype.connect = function(patho, method){

	var options = {
		hostname: apiUrl,
		path: '/'+version+patho+'?access_token='+this.access_token,
		//port: 443,
		method: method,
		headers:{
			'Content-Type': 'application/json'
		}
	}

	var req = https.request(options, function(res){

		if(res.statusCode === 200) {
			var body;
			res.on('data', function(chunk) {
	    		body += chunk;

	  		});
	  		res.on('end', function() {
	    		responseBody = body;
  			});	
		} else{
			responseBody = res;
		}
  		
	});

	req.end();

	req.on('error', function(e) {
		responseBody = e;
	});
	return responseBody;
}

/*
* Instagram Media Endpoints
* API Documentation: https://instagram.com/developer/endpoints/media
*/
instagram.prototype.media = function(id){
	return this.connect('/media/'+id, 'GET');
}

instagram.prototype.mediaShortcode = function(code){
	return this.connect('/media/shortcode/'+code, 'GET');
}


instagram.prototype.mediaSearch = function(param){
	return this.connect('/media/popular', 'GET', param);
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

instagram.prototype.usersSelfFeed = function(){
	return this.connect('users/self/feed', 'GET');
}

instagram.prototype.usersMediaRecent = function(userId){
	return this.connect('/users/'+userId+'/media/recent', 'GET');
}

instagram.prototype.usersSelfMediaLiked = function(){
	return this.connect('users/self/media/liked', 'GET');
}

instagram.prototype.usersSearch = function(param){
	return this.connect('users/search', 'GET');
}

 
exports.init = function(token, param){
	return new instagram(token);
}
