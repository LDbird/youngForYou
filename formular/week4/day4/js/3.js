/*
* jquery选择器的selector方法可以是字符串，字符串这种格式也有两种情况：
*   1. 选择器
*   2. HTML字符串拼接的结构，把拼接好的HTML字符串转换为Jq对象，然后可以基于appendTo等方法追加到页面中
*
*
*
* */

$('<div id="aa">123233</div>').appendTo(document.body);

/*
* each: jquery 中的each方法时用来进行遍历的，和数组的forEach方法类似
*   [可遍历内容]
*     1. 数组
*     2. 对象
*     3. 类数组集合（jq对象）
*
*   [三种each]
*     1. 给jquery的私有属性 $.each()
*     2. 给实例设置的公有属性 $(selector).each
*     3. 内置的each
*
* */
$.each([12, 23, 34], (index, item) => {
  // => 这个小函数叫做回调函数，回调函数的参数和数组的forEach方法相反
  console.log(index, item);
});

$.each({name: '珠峰', age: '11', 1: 100}, (key, value) => {
  // => 原理其实就是for in 循环
  console.log(key, value);
});

/*
$('.tabBox li').each(function (index, item) {
  // 非箭头函数，this === item 当前遍历的这一项（原生js元素对象）
  // $(this) 把当前遍历的这一项转换为jq对象；
  $(this).click(function () {
    // 给每一个遍历的li都绑定一个点击事件
    // this 这个函数中的this是当前点击的li（原生js元素对象）
    $(this).css({
      color: 'red'
    })
  })
});
*/

/*
$('.tabBox li').click(function (index, item) {
  // 获取的jq集合中有三个，jq会判断，如果是一个元素对象就处理这个元素对象，如果是一个集合例如我们此处相当于给三个li，会默认把集合进行each遍历，把每一项都绑定了click事件，在这个回调函数中this仍然指向点击的元素（原生对象），如果想调用jq上的方法，需要用$(this)才行
  $(this).css({
    background: 'red'
  })
})*/

/*$('.tabBox li').css({
  // 如果jq获取的是一个元素集合，那么它会遍历这个集合，并且对集合中的每一项执行css() 方法，把集合中的每一项的字体颜色都设置成红色
  color: 'red'
})*/

/*
$.ajax({
  url: 'json/product.json',
  method: 'GET',
  dataType: 'json',
  async: false,
  success: function (result) {
    // result 是服务端响应的数据，并且jq已经帮我们把json字符串转成对象了

    console.log(result);
  },
  error: function (err) {
    console.log(err);
  }
});
*/


// => 常用的筛选方法
// filter(selector) 同级查找
// console.log($('.tabBox li').filter(':last'));
// console.log($('.tabBox li').filter(':first'));
// console.log($('.tabBox li').filter(':even'));
// console.log($('.tabBox li').filter(':odd'));
// console.log($('.tabBox li').filter('.active'));
// console.log($('.tabBox li').filter(':eq(0)'));

// children 子级筛选(只能在儿子代筛选)
// console.log($('.tabBox').children('.header'));
// console.log($('.tabBox').children('li.active'));
//!!! 注意jq获取不到元素时任然返回类数组而不是null，如果有好判断是否获取到元素，可以判断 jq对象的length属性是否为0，如果为0表示没有获取到元素，如果不为0说明获取到了

// find 后代筛选

console.log($('.tabBox').find('li.active'));



































