window.addEventListener('load', init, false);

var postsUL = document.getElementById('posts');

function init() {

	var urls = [];
	urls.push('/getToutiaoPosts');
	urls.push('/getSegmentPosts');
	urls.push('/getGeekPosts');
	urls.push('/getHTML5DreamsPosts');
	urls.push('/getTutorialzinePosts');
	setLoaing();
	getPostByAJAX(urls[0]);

	var segmentButton = document.getElementById('segment');
	segmentButton.addEventListener('click', function(event) {
		event.preventDefault();

		clickHandler(segmentButton, 1);
	}, false);

	var toutiaoButton = document.getElementById('toutiao');
	toutiaoButton.addEventListener('click', function(event) {
		event.preventDefault();

		clickHandler(toutiaoButton, 0);
	}, false);

	var geekButton = document.getElementById('geek');
	geekButton.addEventListener('click', function(event) {
		event.preventDefault();
		clickHandler(geekButton, 2);
	}, false);

	var html5DreamButton = document.getElementById('html5dream');
	html5DreamButton.addEventListener('click', function(event) {
		event.preventDefault();
		clickHandler(html5DreamButton, 3);
	}, false);

	var tutorialzineButton = document.getElementById('tutorialzine');
	tutorialzineButton.addEventListener('click', function(event) {
		event.preventDefault();
		clickHandler(tutorialzineButton, 4);
	}, false);

	function clickHandler(element, count) {

		removeAllActive();
		setLoaing();
		addActive(element);

		if (window.sessionStorage) {
			if (!sessionStorage.getItem(urls[count])) {
				getPostByAJAX(urls[count]);
			} else {
				postsUL.innerHTML = JSON.parse(sessionStorage.getItem(urls[count]));
			}
		} else {
			getPostByAJAX(urls[count]);
		}
	}

	function removeAllActive() {
		segmentButton.parentNode.classList.remove('active');
		toutiaoButton.parentNode.classList.remove('active');
		geekButton.parentNode.classList.remove('active');
		html5DreamButton.parentNode.classList.remove('active');
		tutorialzineButton.parentNode.classList.remove('active');
	}

	function addActive(element) {
		element.parentNode.classList.add('active');
	}

	function setLoaing() {
		postsUL.innerHTML = '<p class="loading">正在拼命加载中...</p>';
	}
}

function createLiHTML(postTitle, postHref) {

	var liHTML = '<div class="post"><a href=' +
		postHref + ' target="_blank">' +
		postTitle + '</a></div>';

	return liHTML;
}

function getPostByAJAX(url) {

	function createXHR() {
		var xhr = null;

		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}

		return xhr;
	}

	var xmlhttp = createXHR();

	if (xmlhttp) {
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
					var posts = JSON.parse(xmlhttp.responseText),
						lis = '';

					posts.forEach(function(value) {
						lis += createLiHTML(value.title, value.href);
					});

					postsUL.innerHTML = lis;

					if (window.sessionStorage) {
						if (!sessionStorage.getItem(url)) {
							sessionStorage.setItem(url, JSON.stringify(lis));
						}
					}
				}
			}
		}

		xmlhttp.open('get', url, true);
		xmlhttp.send(null);
	}
}