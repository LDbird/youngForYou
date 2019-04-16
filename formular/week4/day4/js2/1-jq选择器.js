// jq选择器是用来获取元素对象或者元素集合
/*
* I 基本选择器
*   1. id选择器  #id
*   2. class类名选择 .className
*   3. 标签名选择器 p ul li div
* */
let idEg = $('#tabBox');
let classEg = $('.tabBox');
let tagNameEg = $('ul');


/*
* II 层级选择器：根据html层级关系获取元素
*   2.1 子代选择器 #tabBox div（获取id为tabBox子孙袋所有的div）
*   2.2 子级选择器 #tabBox > div （获取id为tabBox所有子级div）
*   2.3 兄弟选择器 #tabBox + div 获取 id为tabBox【紧邻】的下一个兄弟div
*   2.4 获取所有的弟弟 #tabBox ~
*   * */

// console.log($('#tabBox li'));
// console.log($('#tabBox > div'));
// console.log($('#tabBox + p'));
// console.log($('#tabBox ~ p'));

/*
* III 过滤选择器
*   3.1 :first 获取第一个
*   3.2 :last 获取最后一个
*   3.3 :odd 获取索引为奇数的
*   3.4 :even 获取索引为偶数的
*   3.5 :not() 除了xxx的都获取，:not(first) 除了第一个
*   3.6 :eq(index) 获取索引为index的
*   3.7 :gt(index) 获取比指定索引大的
*   3.8 :lt(index) 获取比指定索引小的
*
* */

// console.log($('.header li:first'));
// console.log($('.header li:last'));
// console.log($('.header li:odd'));
// console.log($('.header li:even'));
// console.log($('.header li:not(odd)'));
// console.log($('.header li:eq(1)'));
// console.log($('.header li:gt(1)'));
// console.log($('.header li:lt(2)'));

/*
* IV 内容过滤器
*   4.1 :contains() 获取含有指定文本内容的元素
*   4.2 :empty 获取没有内容的
*   4.3 :has(selector) 获取含有指定选择器元素的元素
*   4.4 :hidden 将不可见的元素(display:none/visibility: hidden)获取到
* */
// console.log($('#contextFilter p:contains("钱")'));
// console.log($('#contextFilter p:empty'));
// console.log($('#contextFilter p:has("span")'));
// console.log($('#contextFilter p:hidden'));

// V 属性过滤器
// 5.1 [attr=val] 获取有attr属性并且属性attr的值是val的元素
// 5.2 [attr^=val] 获取有attr属性并且属性attr的值是以val开头的元素
// 5.3 [attr$=val] 获取有attr属性并且属性attr的值是以val结尾的元素
// 5.4 [attr*=val] 获取有attr属性并且属性attr的值是含有val的元素
console.log($('#fields > input[name="man"]'));
console.log($('#fields > input[name^="man"]'));
console.log($('#fields > input[name$="man"]'));
console.log($('#fields > input[name*="man"]'));
