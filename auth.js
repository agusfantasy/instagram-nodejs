var https = require('https');
var http = require('https');

var apiUrl = 'api.instagram.com';

var response = '';

var auths = function(clientId, redirectUri) {

	var options = {
		hostname: apiUrl,
		path: '/oauth/authorize/?client_id=' +clientId+ '&redirect_uri=' +redirectUri+ '&response_type=code',
		method: 'GET',
		headers:{
			'Content-Type': 'application/json'
		}
	}

	var req = https.request(options, function(res){
		response = res;
	});

	req.end();

	req.on('error', function(e) {
		response = e;
	});
	return response;
}

exports.auth = function(clientId, redirectUri) {
	return auths(clientId, redirectUri);
}