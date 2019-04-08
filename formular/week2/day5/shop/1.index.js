let productList = []
let listBox = {}
let sortList = function () {
  // 1. 基于getElementsByTagName 获取的集合是一个类数组，需要先转换成数组才能调用sort方法
  let productAry = [...productList];

  // 2. 基于sort把所有li的按照价格升序排序
  productAry.sort((a, b) => {
    // A是当前li b是下一个li，我们应该获取出每个li的价格，然后用价格相减实现排序。（首先数据绑定的时候，我们可以把后面要用到的数据，“时间、价格、销量”等信息保存在li的行内属性上（后期通过getAttribute获取），后期我们需要时，直接从每个li上获取）

    let aP = a.getAttribute('data-price');
    let bP = b.getAttribute('data-price');
    return aP - bP;
  })
  console.log(productAry);
  // 3. 按照排好序的数组，我们重新把li重新添加到页面中；
  for (let i = 0; i < productAry.length; i++) {
    let item = productAry[i];
    listBox.appendChild(item); // appendChild 向容器的末尾追加元素。但是页面中不是20个li，还是原来的10个li，只不过顺序发生了改变，这是为啥？
  }
}

/*
* DOM映射：页面中的HTML元素和通过JS相关方法获取的元素集合或者元素对象存在映射关系（一个改另一个会跟着改）
*
* xxx.style.backgroundColor = 'red'：将xxx元素对象对应的内存空间里的style属性下的backgroundColor属性修改为red。（本质操作的是js的堆内存），【这里要先把后面的解释一下】但是由于DOM映射机制，页面中的标签和元素的堆内存空间是绑定在一起的，只要我们修改元素对象堆内存空间里的值，浏览器会按照最新的值进行渲染。
*
* // >> 连接词：还有一种也是DOM映射 list下面的li之前没有，log 出来 什么时候就有了，绑定完数据是不是就有了呢？log一次，我们重新获取了吗？没有吧，这也是DOM映射，我们之前获取了一个空集合，等完成数据绑定后，这个集合有东西了。DOM映射会帮我们把这些新增的增加到这个集合中。querySelectorAll就不行
*
* 数据绑定前，我们获取容器中的元素，得到一个空集合。当数据绑定后，不需要我们重新获取，DOM映射机制会把新增加的元素映射到我们之前获取的空集合中，使其成为一个有元素的数组。但是qAll是不行的，因为其获取的是一个静态集合，不存在DOM映射，如果基于这种办法获取的，在数据绑定后需要重新获取。
*
* // >> 连接词：这里先说一遍从li集合到插入到list中，大家记着哈，appendChild向容器中追加元素的时候，如果这个元素已经存在于容器里面了，因为DOM映射机制，它不会重新克隆一份追加到容器末尾，而是把原来的元素对象移动到容器末尾。
*
* */

// 点击某一个a标签，要让其他的a标签的flag回复称-1，这样下一次我们点击某个a标签的时候，它的flag还是从-1开始，如此就可以保证是按照升序排列的