# 每日头条

#### 介绍
利用 nodejs 爬取各个博客网站的最新或者最热的博客文章，目前爬取的网站有开发者头条，SegmentFault，极客头条，HTML5 梦工厂， Tutorialzine等网站,演示如下

![image](https://github.com/hwaphon/toutiaoBlog/blob/master/demo.png)

#### 工具

1. [SuperAgent](http://visionmedia.github.io/superagent/) :  `superagent` 是一个轻量的,渐进式的 `ajax api`,可读性好,学习曲线低,内部依赖 `nodejs` 原生的请求 `api`,适用于 `nodejs` 环境下。

2. [cheerio](https://github.com/cheeriojs/cheerio)： 一个类似于 `JQuery` 的后台工具，用于解析 `HTML` 文档。

3. [Heroku](https://www.baidu.com/link?url=hL-4vhy1PNAyW7ffmD5LZiHnRtaodI1pk63RBXJxnY-7VjiRVaOjDKYuSF4aThqj&wd=&eqid=9a5966300002a8b100000004590bd169): 部署 `nodejs` 程序上线的一个平台。 

#### 实现过程介绍

#####  提取文档信息的核心代码

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


首先，利用 `superagent` 获取开发者头条网页的 `html` 文档，然后利用 `cheerio` 对获取到的文档进行解析，即可像 `JQuery` 操作 `HTML` 那样获取到我们需要的信息。

对于 SegmentFault，极客头条等网站文章的获取，基本上也和上面类似，只不过针对存取文章位置的不同而使用不同的提取动作而已。

### 缓存

利用了 `sessionStorage` 对已经获取到的文档进行会话级缓存，核心代码如下

		if (window.sessionStorage) {
			if (!sessionStorage.getItem(urls[count])) {
				getPostByAJAX(urls[count]);
			} else {
				postsUL.innerHTML = JSON.parse(sessionStorage.getItem(urls[count]));
			}
		} else {
			getPostByAJAX(urls[count]);
		}

