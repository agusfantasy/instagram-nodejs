
Instagram-nodejs
======
Nodejs client for the Instagram REST and Search APIs.
Please read documentation from officical instagram http://instagram.com/developers/

Installation
-----
npm install git@github.com:agusfantasy/instagram-nodejs.git

Authentication
-----

Instagram API uses the OAuth2 protocol for authentication, but not all functionality requires authentication.
See the docs for more information: http://instagram.com/developer/authentication/

### Authenticating a user

The provided sample app shows a simple OAuth flow for authenticating a user and getting an access token for them.

``` javascript
var auth = require('./auth.js');

auth.connect('YOUR_CLIENT_ID', 'REDIRECT_URI');
```

### Using an access token

Once you have an access token (whether via the script or from the user flow), you can  pass that token into the InstagramAPI constructor:

You can use single function to call endpoint:
``` javascript
var ins = instagram.init('YOUR_ACCESS_TOKEN');

ins.connect('ENDPOINT_PATH', 'HTTP_VERB', 'PARAM');
```

OR one by one method. Please see description below

Data Retrieval:
-----

See the endpoints docs for more on these methods: http://instagr.am/developer/endpoints/
    
``` javascript
var ins = instagram.init('YOUR_ACCESS_TOKEN');

//Media
ins.media(media_id)
ins.mediaShortcode();
ins.mediaSearch(q);
ins.mediaPopular();

//User
ins.user(user_id)
ins.usersSelfFeed();
ins.userLikedMedia();
ins.usersMediaRecent(user_id);
ins.userSearch(q);
ins.usersFollows(user_id);
ins.usersFollowedBy(user_id);
ins.usersSelfRequestedBy();
ins.usersGetRelationship(user_id);
ins.usersPostRelationship(user_id);

//Media Comment
ins.mediaGetComment(media_id);
ins.mediaPostComment(media_id, param);
ins.mediaDelComment(media_id);

//Media Likes
ins.mediaGetLikes(media_id);
ins.mediaPostLikes(media_id, data);
ins.mediaDelLikes(media_id);

//Tags
ins.tags(tag_name);
ins.tagsMediaRecent(tag_name);
ins.tagsSearch(q);

//Location
ins.location(location_id);
ins.locationMediaRecent(location_id);
ins.locationSearch(lat, lng);
```
