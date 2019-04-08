let productData = null;
let listBox = document.getElementById('list'),
  headerBox = document.getElementById('header'),
  linkList = headerBox.getElementsByTagName('a'),
  productList = listBox.getElementsByTagName('li');
// 1. get & bind data

let xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    productData = JSON.parse(xhr.responseText)
  }
};
xhr.send(null);
// Bind Data with ES6-template-string
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
listBox.innerHTML = str;

// 点击价格排序
let sortList = function (which) {
  // => 按照价格升序排列
  // 1. 抑郁getElementsByTagName方法获取的额元素集合是一个类数组，不能直接使用sort方法（我们首先把它转化为数组，然后再排序）

  let productAry = [...productList];

  // 2. 基于sort给所有的LI按照价格进行升序排列
  productAry.sort((a, b) => {
    let aInn = a.getAttribute('data-price');
    let bInn = b.getAttribute('data-price');
    return aInn - bInn
  });

  // 3. 按照排好序的数组，我们把li重新增加到页面中
  for (let i = 0; i < productData.length; i++) {
    let curLi = productData[i];
    listBox.appendChild(curLi);
  }
};

linkList[1].onclick = function () {
  sortList();
};









