var express = require('express');
var postcontrol = require('./model/postctrl.js');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var postControl = new postcontrol();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 5000);

app.get('/', function( req, res ) {
	// postControl.getPosts(res);
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/getToutiaoPosts', function( req, res ) {
	postControl.getToutiaoPosts(res);
});

app.get('/getSegmentPosts', function( req, res) {
	postControl.getSegmentPosts(res);
});

app.get('/getGeekPosts', function( req, res) {
	postControl.getGeekPosts(res);
});

app.get('/getHTML5DreamsPosts', function( req, res ) {
	postControl.getHTML5DreamsPosts(res);
});

app.get('/getTutorialzinePosts', function( req, res) {
	postControl.getTutorialzinePosts(res);
});