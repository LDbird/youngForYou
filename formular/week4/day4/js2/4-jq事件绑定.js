// jquery 中的事件绑定和移除
/*
* jquery中提供了两种绑定事件的方法
* 1. 将原生的事件名去掉on，例如onclick，变成jq的click方法
* 2. on() 方法，语法为 jq对象.on(事件名[不带on], 事件函数)，当事件触发时执行事件函数
* */

$('li.active').click(function () {
  // 给类名为active的li元素绑定点击事件，当事件触发时执行这个匿名函数
  console.log('LI.ACTIVE');
});

$('div.active').on('click', function () {
  console.log('一个点击事件');
});
$('div.active').on('click', function () {
  console.log('另一个点击事件');
});

// trigger()方法 事件触发，jq还提供了了一个方法，用代码触发某个事件
$('li.active').trigger('click'); // 触发li.active 的onclick事件

// 移除事件：off(事件名)
$('li.active').off('click');
