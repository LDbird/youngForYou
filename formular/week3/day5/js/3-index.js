/*
* 瀑布流：
*   效果：多列的不规则排列，每一列有很多块儿，每一块的高度不固定，最后按照规则排列，三列之间的高度相差不大。
*   实现思路：首先获取我们我们需要的数据（假设有50条，三列），首先我们从50条数据中拿出3个，依次插入到三列中（因为每一条数据的高度不固定，所以第一次插入后，三列的高度有高有低了），接下来我们再从数据中取出3条，但是本次不是依次插入了，而是先按照高度给三列进行排序，哪个最矮就先给哪个插入，接着给第二高的插入，最后给最高的插入，以此类推把数据都插入到页面中去
*
* */

// 1. 获取元素
let flowBox = document.getElementById('flowBox');
let flowList = flowBox.getElementsByTagName('li');

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
for (let i = 0; i < imgData.length; i += 3) {
	let item1 = imgData[i];
	let item2 = imgData[i + 1];
	let item3 = imgData[i + 2];

}