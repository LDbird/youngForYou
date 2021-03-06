// => 连接词 结合我们这周包括上周给大家讲的ajax、排序、盒子模型属性、懒加载我们做一个综合案例，这个案例是什么，事瀑布流。瀑布流是花瓣网做的好的

// => 连接词 进到花瓣网后，发现首页还没有瀑布流是不是，接下来我们搜点东西看结果，搜朴智妍 tara的领舞，一搜，
// 1. 你看这个页面是分几列构成的吧，而且每一列下面的一项的图片的高度都是不固定的
// 2. 瀑布流也叫做不规则排列，然后再说你看他这个网站上是不是还有回到顶部，还有收藏、采集等等功能啊，我们后期都会给大家讲。今天我们关注的呢是瀑布流的一个重要的功能，注意看哈，我们从这里往下滚动滚轮，将要滚到底部的时候，它是不是又加载了很多，滚动条是不是又回去一段，这就是瀑布流的重要一个功能，加载更多。你会发发现等我今天讲完，你们可以回去接着完善这个功能，甚至后期我们做项目的时候你可以选择做一个花瓣网。

// => 连接词 毕业以后可以做一个博客，可以做成这个样子的是不是，当然你得写一个自己的网站

// => 连接词 我们今天做一个瀑布流，一个容器中有几列，三列吧，每一列又分成很多块儿，每一块的高度固定吗，不定吧，但是，你得保证三列相差的不能太大，你不能说让所有高的在左边，低的在右边，矮的那个都已经到头了，高的那个还有好几屏呢，这肯定不行。

// => 【连接词】：为了保证这种效果，我们该怎么做呢？来啊，接下来我们来记一下瀑布流的原理

/*
* 瀑布流
*   效果：多列的不规则排列，每一列分为很多块，每一块项高度不固定，最后我们按照规则排列，三列之间高度不能相差太多。
*
*   实现思路：
*     首先获取我们需要的数据（假设有50条，共三列），把50条数据中的前三条依次插入到三列中（这三条数据不一定一样高，所以第一次插入数据后，这三列就已经有高有低了），接下来再拿出三条数据，但是本次不是挨个插入了，而是先按照高矮个进行排序，哪个最矮，就先给哪个插入数据，以此类推，把50条数据插入到三列中。
*     1. 首先获取我们需要的数据（假设有50条，共三列） // => 【连接词】：回到页面中，这些数据都是写死的吗？不是吧肯定都是动态获取的啊。所以首先获取我们需要展示的数据。把50条数据中的前三条依次插入到三列中（这三条数据内容不一定一样高吧，第一次插入数据后，所以这三列已经有的高有的低了吧），// => 【连接词】：为了保证最终结果这三列内容高度相差不大，我们再拿数据的时候是不是应该先向高度最低的列中插入了吧，接着向内容第二高的插，最后才向内容最高的那个插吧。 接下来再拿出三条数据，但是本次不是一次插入，而是需要先把当前三列按照高矮进行排序，哪个最矮，就先给那个插入内容，然后依次类推，把50条数据插入到三列中即可。// => 【连接词】：【回文页面，再讲解思路，在讲解了的时候强调每次拿出三个来，这样最后不能保证这三列都是相同的，但是可以保证最后相差不大】
*
* // => 【连接词】：回去看html内容，讲解html结构，一个ul里面有三个li，这三个li就是页面中三列，而每个li里面又有好多内容吧，每个a标签就是一个内容吧，如果我需要两项，就多两个a标签吧，每个a标签下有一个div，div里面有一个img，下面还有span，接着看css样式，如何分三列，三个li浮动，li下面的每个a标签有一个10px上边距。那么怎么保证图片比例按比例缩放呢，给img包一个块级元素，然后设置img的width 100%，它的高度会自动计算，如果css写的不好的同学要回去好好练。
*
* // => 【连接词】：接下来我们实现我们的js，视频上讲的是用jquery写的，但是我们还没讲jquery，所以我们还用原生js来做，正好让大家感受一下，工具无所谓，思路第一位
*
* // => 【连接词】：接下来把页面中原有大的html中a标签都删掉，留一个还注释掉，留着一会儿绑定数据的时候要用
*
* // => 【连接词】：再次回文思路
* // => 【连接词】：接下来第一步是不是获取数据，你会发现我们第一次获取的是第一次要展示的数据吧，第二次获取的是不是第二次要展示的数据啊。每次获取的东西是不是不一样啊，真实的项目中我们会向接口传第一参数
*
*
*
*
* */

let flowRender = (function () {
	// 1. 获取需要的数据
	// 真实项目中，我们第一页加载完成后，当用户下拉到底部的，开始获取第二页的数据，服务端会给我们提供一个api获取数据的地址，并要求客户端把获取的第几页的参数传递给服务器，服务器会按照这个参数把对应的页数的内容返回。（分页技术）
	// => 【连接词】：回文 上述内容，第一次的时候我们传递一个1过去，服务器把第一页的数据给你，接着用户开始滚动滚轮，当到底的时候我们该去请求第二页了吧，依次类推
	let page = 0; // => 【连接词】：我们这里先写0，一会儿你就知道为啥了
	let isRun = false;

	let imgData = null;
	let queryData = () => {
		page++; // => 【连接词】：第一次请求数据就是第一次这行这个方法吧，page++ 就是1了吧，就是请求第一页的数据，第二次page++就成2了吧，。。。然后我请求数据的时候把page传递给服务器就行了吧

		let xhr = new XMLHttpRequest();
		xhr.open('GET', `json/data.json?page=${page}`, false); // => 【连接词】：告诉大家今天没有后端，在真实项目中我们把page这个参数传递给后端，后端就会响应你。
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let imgData = JSON.parse(xhr.responseText);
				// 到这里说明我们拿到数据了
				// => 【连接词】：打印数据
				console.log(imgData)
			}
		};
		xhr.send(null);
	}
	queryData(); // 想获取数据，这里要执行一次

	// 传递一个对象，返回一个绑定好数据的html字符串
	let queryHTML = ({id, link, pic, title} = {}) => {
		return `balah`
	};


	// 2. 数据绑定
	// => 【连接词】：数据绑定怎么做呢？是不每次取三条，第一次插入三个li里面啊，然后我们再取三条，然后给li按照高度排序吧，然后再取三个，依次插入到li中吧。【回到页面中 分析html结构，然后得出我们需要获取这三个li吧】

	let flowBox = document.getElementById('flowBox');
	let flowList = flowBox.getElementsByTagName('li');
	let bindHTML = () => {
		for (let i = 0; i < imgData.length; i += 3) {
			// 分别获取每三个为一组，一组中的三个内容（存在一个隐形风险，当前数据总长度不是3的倍数，那么最后一次循环的时候，三个中的一个或者2个不存在）

			// => 【连接词】：这里不是i++ 了我们每次拿三个，是不是，第一次循环的时候i =0 ，然后我们取三个 第一-三个，他们的 索引是 0 1 2，下一次再循环的时候，得去 456 这三个了吧，第四个索引为3，是不是得从3开始了，所以这里i + 多少 3吧，所以你想几个一组你就I+=几就行了
			// => 【连接词】：item都是每一个对象吧，当i=0的时候，我们是不是要取索引为0 1 2 的这三项把，item就是imgData[0]吧，那么imgData[i+1] 就是imgData[1] .. 所以另外两项就是当前i+1和i+2吧
			// => 接着写下面的代码
			let item = imgData[i];
			let item2 = imgData[i + 1];
			let item3 = imgData[i + 2];
			// => 【连接词】：但是这么干有问题，什么问题就是超长了，如果我们这一页的数据只有十条，那么索引的最大值是多少9，但是你看的第一次循环的时候i是0，item123没问题，接着i+=3变成3，itme345没问题，再i+=3，成6，item678没问题，再i+=3 i变成9,9小于length10吧，还会进行循环，但是item9游，但是item10 和item11有吗？没有吧，索引这个有一个风险，回到for循环下面记录一下隐形风险，
			// => 【连接词】：记录完后讲一下，索引不存在的时候是undefined，item123有了，接下来咋办，把每一个item拼接一个a标签出来，然后追加到li里面吧，但是按顺序插吗，不是吧，我们需要按照每个li的高度，看下那个最矮，先向矮的那个插
			// 我们接下来要把获取的item依次插入到li中，。但是不是按li在页面中排列顺序插入，我们需要先按照每一个li的现有高度排序（小-> 大），最后按照这个排好的顺序依次插入即可

			// => 【连接词】：怎么给li排序？是不是给li的集合排序啊，我们说集合是一个类数组不能直接用sort吧，我们先把类数组转换成数组吧，然后再按照高度排序。
			let flowListAry = Array.from(flowList);
			flowListAry.sort((a, b) => {
				// => 【连接词】：怎么排序，按照啥排序？每个li的高度是不是，我们给每个li设置高度了吗？没有吧，我们就设置了宽度，然后内容自适应。那么怎么获取高度呢，clientHeight吧，或者包括边框 offsetHeitght(内容+padding+边框)
				return a.offsetHeight - b.offsetHeight
			});

			// 现在是不是已经构造好了啊，现在是不是应该把item里面的数据拼接成html然后追加到li里面啊，
			if (item) {
				flowListAry[0].innerHTML += queryData(item1) // => 【连接词】：这里先拼字符串，然后再提取方法
			}
			if (item2) {
				flowListAry[1].innerHTML += queryData(item2) // => 【连接词】：这里先拼字符串，然后再提取方法
			}
			if (item2) {
				flowListAry[2].innerHTML += queryData(item3) // => 【连接词】：这里先拼字符串，然后再提取方法
			}

			// => 【连接词】：回文整个过程，然后优化代码
		}
		isRun = false;
	};
	bindHTML();

	// 3. 当滚动到页面底部的时候，加载下一页的更多数据
	window.onscroll = function () {
		// => 【连接词】：那什么时候才加载下一页的数据呢？页面滚动到底部的时候吧。什么时候就知道页面滚动到底部了呢？就是页面真是的高度 - 滚动条卷去的高度 - 浏览器窗口的高度 = 0 的时候说明就是到底了吧。那么我要获取那些数据呢？页面真实的高度、滚动条卷取的高度、浏览器窗口的高度
		let winH = document.documentElement.clientHeight || document.body.clientHeight;
		let pageH = document.documentElement.offsetHeight || document.body.offsetHeight;
		let scrollT = document.documentElement.scrollTo || document.body.scrollTop;
		if (pageH - scrollT - winH <= 200) {
			if (isRun) return;
			isRun = true;
			// 等于0的时候说明真的是到底部了，但是由于网络的原因，再次请求数据需要时间，所以真实项目中一般都是将要到底，距离底部还有一段距离的时候就去请求一次真实数据，所以小于等于200的时候就说明已经快要到底部了。
			// 隐形问题：任务操作滚动，这个在同一个操作内会被触发n次，同一个时间段获取数据就会进行多次，此时我们需要做一个重复限定，
			// => 【连接词】：设置isRun变量，什么时候在满足条件的时候变为true，在bindHMTL后置为false，在变为true之前还要加一个判断，判断是不是又正在跑着的。如果isRun为true，那么就不在往下进行了。return
			// => 【连接词】：回环isRun这个东西
			queryData();
			bindHTML();
		}

		// => 【连接词】：这个时候说，有个问题，先把queryData() 和bindTHML() 方法注释掉，log (ok) 等页面到底部的时候触发了很多次。这是为什么？什么事onscroll？是不是当滚动条滚动的时候，我们这里限制的条件是距离底部小于等于100px的时候执行if里面的语句把，是不是当小于等于100以后会触发很多次啊，然后如果这里执行queryData是不是会连续请求后面的好几页数据啊。我们想让他这样吗？我们是不是想让他滚动到底部这一回就是去加载下一页呢，所以说我们要做的事情就是做一个标识，标识什么呢，只要距离底部不足100px了，我们就去请求，这个请求是不是需要时间的啊，在请求的这段时间里，如果滚动滚动条，我们就限制它不再请求下一页，什么时候解除限制呢？拿到数据了，并且已经绑定到页面上了，这个时候就解除限制

	};

	// 4. 懒加载
})();