/*
* 操作DOM的属性和方法：
*   [获取元素或者元素集合]
*   getElementById
*     -> 上下文只能是document（只有document这个实例的原型上才能找到这个方法，其他实例都找不到）
*     -> ID如果出现重复会获取第一个
*     -> IE6-7 中会把表单元素的name当做id使用
*    getElementsByTagName
*      -> 获取当前上下文中，所有子孙标签中的标签名叫做xxx的元素
*      -> IE6-8 不兼容
*    getElementsByName
*      -> 在IE浏览器中只对表单元素的name起作用
*      -> 上下文只能是document
*    querySelector
*    querySelectorAll
*     -> 不兼容 IE6-8
*     -> 没有DOM映射机制
*    document.documentElement
*    document.body
*    document.head
*    ....
*
*   [描述节点和节点之间关系的属性]
*           nodeType  nodeName  nodeValue
*   元素节点    1      大写标签名  null
*   文本节点    3       #text     文本内容
*   注释节点    8       #comment   注释内容
*   文档节点    9       #document   null
*
*   childNodes: 所有子节点
*   children: 所有元素子节点（IE6-8会把注释当做元素节点）
*   parentNode:
*   previousSibling/ previousElementSibling
*   nextSibling/ nextElementSibling
*   firstChild / firstElementChild
*   lastChild / firstElementChild
*
*   [动态操作DOM]
*     createElement
*     createDocumentFragment
*     appendChild
*     insertBefore
*     cloneNode(true/false)
*     removeChild
*     set/get/removeAttribute
*
*
*   [散]
*
*     xxx.style.xxx = xxx 设置行内样式
*     xxx.className = xxx
*     xxx.onclick = function () {}
*
*
*
*
*
*
* */

/*
* JS盒子模型属性
* => 在js中通过相关属性可以获取（设置）元素的样式信息，这些属性就是盒子模型属性（基本上都是有关于样式的）
*
* client
*   top
*   left
*   width
*   height
*
* offset
*   top
*   left
*   width
*   height
*   parent
*
* scroll
*   top
*   left
*   width
*   height
*
* */

let outer = document.getElementById('outer');
// => clientTop/Left/Width/Height
// 1. clientWidth & clientHeight:获取当前元素可视区域的宽高（内容宽高+左右/上下padding）
// 和内容是否溢出无关（和是否设置了overflow：hidden也无关，就是我们自己设定的内容的宽高+padding）就是我们自己设定的内容的宽高+padding
// console.log(outer.clientWidth, outer.clientHeight);
// => 获取当前页面一屏幕（可视区）的宽度和高度
// let cw = document.documentElement.clientWidth || document.body.clientWidth
// let ch = document.documentElement.clientHeight || document.body.clientHeight
// console.log(cw, ch);
// 2. clientTop / clientLeft：获取（上/左）边框的宽度
// console.log(outer.clientTop, outer.clientLeft);

// 3. offsetWidth/offsetHeight：在client的基础上加上border(width加左右border，height加上下border)（和内容是否溢出没有关系）
// console.log(outer.offsetWidth, outer.offsetHeight);

// 4. scrollWidth / scrollHeight: 真实内容的宽高（不一定是自己设定的值，因为可能会存在内容溢出，有内容溢出的情况下，需要把溢出的内容也算上）+ 左/上 padding，而且是一个约等于的值，如果没有内容溢出和clientWidth/clientHeight一样

// console.log(outer.scrollWidth, outer.scrollHeight);
// => 在不同的浏览器中，或者是设置了overflow: hidden;都会对最后的结果产生影响，所以这个值仅仅做参考，属于约等于的值

// => 获取当前页面的真实宽高（包含溢出的部分）
// let sw = document.documentElement.scrollWidth || document.body.scrollWidth;
// let sh = document.documentElement.scrollHeight || document.body.scrollHeight;
// console.log(sw, sh);

// scrollLeft/scrollTop：滚动条卷去的宽度或者高度。


// ==========[通过JS盒子模型属性获取值的特点]=============

// 1. 获取的都是数字不带单位
// 2. 获取都都是整数，不会出现小数（一般都是四舍五入，尤其是获取的偏移量）
// 3. 获取的结构都是符合样式值（好几个元素的样式组合在一起的值），如果只是想获取单一样式值（例如：只想获取padding）我们的盒子模型属性属性就操作不了（这不能说没有用，真实项目中，有时我们就是需要获取组合的值来完成一些操作）




// +++++++++++[获取元素具体的某个样式值]+++++++++++++
// 1. [元素].style.xxx 操作获取
// > 只能获取所有写在元素行内上的样式（不写在行内上，不管你写没写，都获取不到，真实项目中我们很少会把样式写在行内上）
// log(outer.style.width) // '' (因为width是设置在样式表上的)

// 2. 获取当前元素所有经过浏览器计算的样式
// > 经过计算的样式：只要当前元素可以在页面中呈现（或者浏览器渲染它了），那么它的样式都是被计算过的。
// => 不管样式写在哪里




