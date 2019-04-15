// => jq选择器：基于各种选择器创建一个jq实例（对象）
// 1. selector 选择器类型（一般都是字符串，但是支持函数或者元素对象）
// 2. context 基于选择器获取元素时候指定的上下文（默认document）
// jq对象：一个类数组对象，这个类数组集合中包含了获取到的元素

let $tabBox = $('.tabBox');
console.log($tabBox);
console.log($tabBox.eq(0) instanceof jQuery);

/* jq对象（类数组）=> jquery实例
* 0: div.tabBox
* context: document
* length: 1
* prevObject: m.fn.init [document, context: document]
* selector: ".tabBox"
* __proto__: Object(0)

* */

/*
* 获取页面中的元素对象：
*   1. 基于原生js提供的内置的属性和方法获取 => "原生js对象"
*     可以调取使用内置的js属性和方法
*     className
*     onclick
*     ...
*   2. 基于jq选择器获取 => 'jq对象'
*     可以调取jq原型上提供的属性和方法
*     add
*     find
*     ...
*
*   原生元素对象和jq对象互转
*   [jq对象-> 原生对象]
*     jq对象是一个类数组集合，集合中每个索引对应的都是原生js对象，我们基于索引获取即可
*     let tabBox = $tabBox[0];
*     tabBox = $tabBox.get(0); // => get是jq原型链上提供的方法，提供jq实例基于索引获取到指定的js对象
*   [把原生DOM对象 -> jq对象]
*     let tabBox = document.querySelector('.tabBox');
*     $(tabBox) 直接使用$()方法把js对象包裹起来，就会把原生dom对象转换为jq对象（因为$() 方法就是创建jq的一个实例）
*
* */

/*
* 分析选择器源码：我们发现selector传递的值支持三种类型
* 1. String：基于选择器获取元素
* 2. 元素对象：把原生js元素对象转换为jq对象
* 3. 函数：把传递的函数执行，把jq当做实参传递给函数
*
*
*
* */

$(function () {
  // 函数肯定肯定会执行，但是会在当前页面中的html结构都加载完成后再执行，等效于 DOMContentLoaded事件
  // => 写自己的代码
});