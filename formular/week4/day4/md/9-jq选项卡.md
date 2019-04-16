## 选项卡+链式调用

## 选项卡

html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <link rel="stylesheet" href="css/reset.min.css">
  <link rel="stylesheet" href="css/index.css">
</head>
<body>
<div class="tabBox" id="tabBox">
  <ul class="header clearfix">
    <li class="active">新闻</li>
    <li>电影</li>
    <li>音乐</li>
  </ul>
  <div class="active">时事新闻</div>
  <div>最新电影</div>
  <div>欧美音乐</div>
</div>

<script src="js/jquery.min.js"></script>
<script src="js2/9-jq选项卡.js"></script>
</body>
</html>

```

css
```css
.tabBox {
  margin: 20px auto;
  width: 602px;
}
.tabBox ul {
  box-sizing: border-box;
  border: 1px solid black;
}
.tabBox ul > li {
  box-sizing: border-box;
  float: left;
  width: 200px;
  border-right: 1px solid black;
  font-size: 16px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.tabBox ul li:nth-last-child(1) {
  border-right: none;
}
.tabBox ul > li.active {
  background: yellow;
}
.tabBox div {
  display: none;
  font-size: 20px;
  line-height: 200px;
  border: 1px solid black;
  text-align: center;
}
.tabBox div.active {
  display: block;
}

.animate {
  height: 100px;
  text-align: center;
  background: greenyellow;
}
```

js

```javascript
$(function ($) {
  // 1. 获取元素
  let $tabList = $('.header li'),
    $divList = $('.tabBox div');

  // 2. 绑定点击事件
  $tabList.click(function () {
    let index = $(this).index(); // 获取当前点击的li的索引

    // 为点击的li增加类名active 并且把其兄弟元素的active类名移除
    $(this).addClass('active').siblings().removeClass('active');

    // 通过被点击li的索引，找到对应的div，为其增加active，并且移除其兄弟元素的active类名
    $divList.eq(index).addClass('active').siblings().removeClass('active');
  })
});

```

### DOMContenLoaded
$(function ($) {
  // 等效于DOMContentLoaded事件，表示文档的HTML结构加载完成，然后再执行这里面的代码，同是时把jq当做参数传递进来。
  // 这里面写我们自己的代码
});

### 链式调用、原理


jquery 的链式调用

 $(this).addClass('active').siblings().removeClass('active');

jquery很多方法可以实现链式调用，原理是因为在其方法内部return this，而this是jq的实例，所以可以继续调用jq原型上的方法。但是要注意很多方法最后return的不是this，而是一个具体的值，如width() 方法返回一个数字，就不能继续调用方法。



```javascript

// 链式调用示例：
let obj = {
  init(num) {
    this.num = num;
    return this
  },
  add(x) {
    this.num += x;
    return this;
  },
  multiple(t) {
    this.num *= t;
    return this;
  },
  div(d) {
    this.num /= d;
    return this
  },
  getVal() {
    return this.num
  }
};
console.log(obj.init(3).add(9).multiple(4).div(4));
console.log(obj.init(3).add(9).multiple(4).getVal().div()); // Uncaught TypeError:  obj.init(...).add(...).multiple(...).getVal(...).div is not a function 【因为getVal返回的是一个数字，不是this了，所以后面不能继续调用div方法】
```