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
    listBox.appendChild(curLi); // appendChild：想容器的末尾追加新的元素，但是页面中不是20个，还是原来的10个，只不过顺序发生了改变，为啥？
  }
};

linkList[1].onclick = function () {
  sortList();
};


/*
* DOM映射机制：
*   页面中的的HTML元素，和JS中通过相关方法获取到的元素集合后者元素对象存在映射关系（一个改另外一个会跟着改修改）
*   xxx.style.backgroundColor = 'red'：把xxx元素对象的对应的堆内存空间中的style属性下backgroundColor属性值修改为'red'（本质操作的是JS堆内存）；但是由于DOM映射机制，页面中的标签和xxx元素对象是绑在一起的，我们修改元素对象空间中的值，页面中的标签会按照最新的值进行渲染。
*
*   在元素绑定之前，我们获取容器元素中的元素，得到一个空的元素集合，元素数据绑定后，我们不需要重新获取，DOM映射机制会帮我们把新增加的元素映射到我们之前获取的空集合中，使其变为一个有元素的集合。但是querySelector和querySelectAll获取的集合是静态集合（staticNodeList）不存在DOM映射机制，如果是基于这种办法，在数据绑定结束后需要重新获取。
*
*   appendChild 在追加元素对象的时候，如果这个元素在之前的容器中已经存在了，此时不是克隆一份新的追加到容器末尾，而是把原来的元素移动到末尾的位置。（这里给大家讲一下浅复制，是复制的堆内存地址）
*
* */








