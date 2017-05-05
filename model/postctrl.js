var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var eventproxy = require('eventproxy');

var toutiaoUrl = 'https://toutiao.io/';
var segmentfaultUrl = 'https://segmentfault.com/';
var geekUrl = 'http://geek.csdn.net/hot';
var html5dreamUrl = 'http://www.html5dw.com/dev';
var tutorialzineUrl = 'http://tutorialzine.com/posts/';

var PostControl = function() {

	var ep = new eventproxy();

	this.getToutiaoPosts = function(res) {
			superagent.get(toutiaoUrl)
				.end(function(error, sres) {
					var $ = cheerio.load(sres.text);
					var articles = [];
					$('.post .content a').each(function(index, element) {
						var $element = $(element);

						var title = $element.text();
						var href = url.resolve(toutiaoUrl, $element.attr('href'));

						articles.push({
							title: title,
							href: href
						});
					});

					res.send(articles);
				});
		},

		this.getSegmentPosts = function(res) {

			superagent.get(segmentfaultUrl + 'news')
				.end(function(error, sres) {
					var $ = cheerio.load(sres.text);

					var articles = [];

					$('.news__item .news__item-title a').each(function(index, element) {
						var $element = $(element);

						articles.push({
							title: $element.text(),
							href: url.resolve(segmentfaultUrl, $element.attr('href'))
						});
					});

					res.send(articles);
				});
		},

		this.getGeekPosts = function(res) {
			superagent.get(geekUrl)
				.end(function(error, sres) {
					var $ = cheerio.load(sres.text);

					var articles = [];

					$('.geek_list dd > span.tracking-ad a').each(function(index, element) {
						var $element = $(element);

						articles.push({
							title: $element.text(),
							href: $element.attr('href')
						});
					});

					res.send(articles);
				});
		},

		this.getHTML5DreamsPosts = function(res) {
			superagent.get(html5dreamUrl)
				.end(function(error, sres) {
					var $ = cheerio.load(sres.text);

					var articles = [];

					$('#modul_entry div.card.horizontal a').each(function(index, element) {
						var $element = $(element);

						articles.push({
							title: $element.find('div.bd h4').text(),
							href: $element.attr('href')
						});
					});

					res.send(articles);
				});
		},

		this.getTutorialzinePosts = function(res) {
			superagent.get(tutorialzineUrl)
				.end(function(error, sres) {
					var $ = cheerio.load(sres.text);

					var articles = [];

					$('article.post-item > h3 > a').each(function(index, element) {
						var $element = $(element);

						articles.push({
							title: $element.attr('title').toString().replace('Continue reading ', ''),
							href: $element.attr('href')
						});
					});

					res.send(articles);
				});
		}
};

module.exports = PostControl;