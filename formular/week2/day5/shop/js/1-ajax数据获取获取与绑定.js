/*
* 1. 获取数据和实现数据绑定
*   => 真实项目中，页面中的大部分数据都不是写死的，而是动态绑定的
*   A: 从服务器端获取到数据（基于AJAX/JSONP等技术，通过服务器端提供的数据API接口地址，把数据请求回来）
*   B：把获取的数据进行解析
*   C：把数据绑定在HTML页面中（数据绑定）：es6模板字符串
*
* */

let productData = null;

let xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    productData = JSON.parse(xhr.responseText)
  }
};
xhr.send(null);

// 获取的结果是一个字符串，“JSON”格式的字符串，我们此时需要把获取的字符串转化为对象

/*
* 从服务器端获取的数据格式一般都是JSON格式的（大部分都是JSON格式字符串）
*
* window.JSON
*   1. JSON.parse() 把JSON格式的字符串转换为对象
*   2. JSON.stringify() 把对象转换成JSON格式的字符串
*
*
*
* */

let obj = {"name": "zhufeng"}; // obj是一个JSON格式的对象，这个对象操作起来和普通对象没有任何区别

let str = '{"name": "zhufeng"}'; // sgr是一个JSON格式的字符串

// 数据绑定：依托获取的数据，把页面中需要的数据和结构都搞出来，然后把创建好的数据和结构放到页面中的指定容器中。

/*
* 绑定数据的常用方式
*   I 字符串拼接
*     1. 传统字符串拼接
*     2. ES6 模板字符串
*     3. 模板引擎：原理也是字符串拼接
*   II 动态创建DOM
*     createElement => appendChild
*     弊端：操作繁琐，而且性能开销很大（DOM回流）
*
* */

let list = document.getElementById('list');
let str = ``;
for (let i = 0; i < productData.length; i++) {
  let {
    img,
    title,
    time,
    hot,
    price
  } = productData[i];
  str += `<li data-price="${price}" data-time="${time}" data-hot="${hot}"><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span>
        </a></li>`
}
list.innerHTML = str;







