/*
* 瀑布流：
*   效果：多列的不规则排列，每一列有很多块儿，每一块的高度不固定，最后按照规则排列，三列之间的高度相差不大。
*   实现思路：首先获取我们我们需要的数据（假设有50条，三列），首先我们从50条数据中拿出3个，依次插入到三列中（因为每一条数据的高度不固定，所以第一次插入后，三列的高度有高有低了），接下来我们再从数据中取出3条，但是本次不是依次插入了（这个时候给大家去页面上讲），而是先按照高度给三列进行排序，哪个最矮就先给哪个插入，接着给第二高的插入，最后给最高的插入，以此类推把数据都插入到页面中去
*
* */

// 1. 获取元素
let flowBox = document.getElementById('flowBox');
let flowList = flowBox.getElementsByTagName('li');
let isRun = false; // 标识当前是否有正在进行的请求
// 2. 获取数据
let imgData = null;
let page = 0;
let queryData = () => {
	page++;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', `json/data.json?page=${page}`, false);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			imgData = JSON.parse(xhr.responseText);
		}
	};
	xhr.send(null);
};
queryData();
// console.log(imgData);//

// 2. 绑定数据
let insertHTML = () => {
	for (let i = 0; i < imgData.length; i += 3) {
		// 这里有一个隐形的问题：每三个为一组，如果数据长度不是3的倍数，那么在最后一组一定会有一个或者两个取不到值（获取一个数组不存在的索引会得到一个undefined）。
		let item1 = imgData[i];
		let item2 = imgData[i + 1];
		let item3 = imgData[i + 2];

		// 接下来我们将这组数据拼接成页面中需要的结构，但是在插入之前，先给三列按照高度排序，最先给矮的插，然后给第二高的插，最后给最高的插入。

		// 给三个列按照高度排序
		let flowListAry = Array.from(document.querySelectorAll('li'));
		flowListAry.sort((a, b) => {
			// => 【连接词】：怎么排序，按照啥排序？每个li的高度是不是，我们给每个li设置高度了吗？没有吧，我们就设置了宽度，然后内容自适应。那么怎么获取高度呢，clientHeight吧，或者包括边框 offsetHeitght(内容+padding+边框)
			return a.offsetHeight - b.offsetHeight;
		});

		if (i === 12) {
			let lis = Array.from(document.querySelectorAll('li'));
			lis.sort((a, b) => a.offsetHeight - b.offsetHeight)
		}

		if (item1) {
			flowListAry[0].innerHTML += `<a href="${item1.link}">
      <div><img data-src="${item1.pic}" alt=""></div>
      <span>${item1.title}</span>
    </a>`
		}

		if (item2) {
			flowListAry[1].innerHTML += `<a href="${item2.link}">
      <div><img data-src="${item2.pic}" alt=""></div>
      <span>${item2.title}</span>
      </a>`
		}

		if (item3) {
			flowListAry[2].innerHTML += `<a href="${item3.link}">
      <div><img data-src="${item3.pic}" alt=""></div>
      <span>${item3.title}</span>
    </a>`
		}
		isRun = false; // 这里已经完成数据渲染，表示本次请求已经彻底完成，所以把isRun置为false

	}
};
insertHTML();

// 4. 图片懒加载

let lazyLoad = () => {
	let imgList = document.querySelectorAll('img');
	for (let i = 0; i < imgList.length; i++) {
		let item = imgList[i];
		let imgOffsetTop = item.offsetTop;
		let winH = document.documentElement.clientHeight;
		let winSrltp = document.documentElement.scrollTop;
		let dataSrc = item.getAttribute('data-src');
		if (imgOffsetTop - winSrltp - winH <= 100) {
			// === 0 说明马上就要出来了，一般我们在它距离出来还有一段距离的时候就去加载。
			let newImg = document.createElement('img');
			newImg.src = dataSrc;
			newImg.onload = function () {
				item.src = dataSrc;
			}
		}
	}
};
lazyLoad();

// 3. 加载更多
window.onscroll = function () {
	if (page >= 10) {
		alert('没有数据了明天再来吧');
		return;
	}
	// 这个时候问题又来了，如何判断页面是否滚动到底部了呢？页面的总高度-滚动条卷去的高度-浏览器可视窗口高度 === 0 时表示页面已经滚动到底部了。
	let pageH = document.documentElement.scrollHeight;
	let winSctp = document.documentElement.scrollTop;
	let winH = document.documentElement.clientHeight;

	if (pageH - winSctp - winH <= 200) {
		// === 0时说明已经到底了，是不是；
		// 还存在一个问题，当滚动条滚动的时候，只要满足距离页面底部不足100px时就会执行if条件里面的代码，我们的本意是请求下一页的数据，但从请求数据到接收到数据并渲染到页面上还需要一段时间，如果用户在这段时间内继续滚动，那么则会多次触发数据请求行为。所以我们设置一个标识isRun=false，这个标识用来标识当前是否有正在进行的请求。每一次请求都把这个isRun置为true，等到拿到数据并且渲染完再置为false。当用户滚动时到距离页面底部不足100px时，我们首先检查这个isRun是否为true，如果为true就什么也不做，如果为false则先讲isRun置为true，然后发送请求。
		if (isRun) return;
		isRun = true;
		queryData();
		insertHTML();
	}
	lazyLoad();

};

