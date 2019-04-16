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

$(function ($) {
  // 等效于DOMContentLoaded事件，表示文档的HTML结构加载完成，然后再执行这里面的代码，同是时把jq当做参数传递进来。
  // 这里面写我们自己的代码
});

/*
* jquery 的链式调用
*  $(this).addClass('active').siblings().removeClass('active');
*
*  jquery很多方法可以实现链式调用，原理是因为在其方法内部return this，而this是jq的实例，所以可以继续调用jq原型上的方法。但是要注意很多方法最后return的不是this，而是一个具体的值，如width() 方法返回一个数字，就不能继续调用方法了
*
*
* */

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