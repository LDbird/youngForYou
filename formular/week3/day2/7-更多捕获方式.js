// let str = 'zhufeng2018zhufeng2019yangfan2020';
// let reg = /\d+/g;
// console.log(reg.test(str)); // true
// console.log(reg.lastIndex); // 11 基于test进行匹配的时候，如果设置了g，test也相当于捕获，修改了lastIndex的值
// console.log(reg.exec(str)); // 2019

// >> 连接词：换言之，不管是test还是exec都是从索引为0的位置开始找，如果找到返回true，如果找不到返回false，但是如果找到了，它会从上次找到的位置接着往后找。而exec呢，它不过是从开头找，如果找到了，就捕获出来吧，然后接着往后面找。第一次找到2018，后面再捕获从2018后面开始找后面的

// let str = 'zhufeng2018';
// let reg = /\d+/g;
// if (reg.test(str)) {
//   console.log(reg.exec(str)); // null 因为在test的时候就已经找到2018了，再捕获会从2018后面开始，而2018后面啥也没有了，所以捕获不到了，所以为了解决它，把g去掉就行了，因为不写g正则有懒惰性，它还是索引为0开头的找
// }

// let str = 'zhufeng2018';
// let reg = /\d+/g;
// console.log(reg.exec(str)); // => ['2018'] 因为这次捕获把reg的lastIndex修改成了11
// console.log(reg.exec('zhufeng2018peixun2019')); // ['2019'] 虽然处理的是不同的字符串，但是正则是同一个，上一次正则处理的时候修改了，它的lastIndex，也会对下一次匹配新的字符串产生影响

// >> 连接词：我们说test也能实现正则捕获，这事不是空穴来风的，你看它怎么实现

// let str = 'zhufeng2018peixun2019';
// let reg = /(\d+)/g;
// console.log(reg.test(str)); // true
// console.log(RegExp.$1); // '2018'
// console.log(reg.test(str)); // true
// console.log(RegExp.$1); // '2019'
// console.log(reg.test(str)); // false
// console.log(RegExp.$1); // 2019
// console.log(reg.test(str)); //true
// console.log(RegExp.$1); // '2018'

// >> 连接词：dir(RegExp) 发现$1 - $9 ，我们说这个东西是不是挂载在RegExp这个构造函数上，是不是全局只有一个RegExp，那么这些RegExp.$1 是不是也只有一个
// RegExp.$1 存储着上一次匹配（TEST/EXEC) 到的内容获，获取的是第一个小分组匹配的内容，大正则匹配的内容无法获取到。而且它是一个全局的值，浏览器中$1只有一个，其他的正则操作也会覆盖这个值，所以这种方式没啥用

/*
* replace实现正则捕获（replace本身是用来替换的）
*   replace多数情况是结合正则属性，虽然不用正则也可以，但是不用正则有的替换就无法完成。
* 
* */

// => 需求：把所有zhufeng替换成 zhufengpeixun
// let str = 'zhufeng2018zhufeng2019';
// str = str.replace('zhufeng', 'zhufengpeixun')
// console.log(str);
// str = str.replace('zhufeng', 'zhufengpeixun')
// console.log(str); // 'zhufengppeixunpeixun2018zhufeng2019';

// >> 连接词：这个时候你发现它只要找就是从索引为0的位置开始查找，所以真实项目中，不基于正则，多次执行replace并不能把所有的东西替换掉，来看下正则

// str = str.replace(/zhufeng/g, 'zhufengpeixun');
// console.log(str); // zhufengpeixun2018zhufengpeixun2019


// +++++++++++++++replace替换原理

let str = 'zhufeng{val:2018}zhufeng{val:2019}';
let reg = /\{val:(\d+)\}/g;
// str = str.replace(reg, '@'); // => 用reg正则和str字符串进行匹配，匹配几次就替换几次，每一次都是把当前“大正则”匹配的结果用replace第二个参数传递的字符串替换掉了。
// console.log(str); // zhufeng@zhufeng@

// str = str.replace(reg, '$1'); // 注意，这里写$1 不是用 把reg匹配到的内容用$1这个字符串替换，此处的$1代表的是第一个分组匹配到的内容，等价于RegExp.$1

// console.log(str); //zhufeng2018zhufeng2019

/*
* 最常用的方式：如下
*   1. reg和str匹配多少次，函数就会触发执行多少次，而且传递了一些参数信息
*   2. 每一次中arg中存储的信息，和执行exec捕获的信息相似（内置原理：每一次正则匹配到结果，把函数执行，然后基于exec把本次匹配的信息捕获到，然后把捕获的信息作为实参传递给这个函数）
* // >> 连接词：回环第2步
* 3. （结合在回调中return AA）每一次函数中返回的是啥，就把当前大正则匹配的内容替换成啥
* // >> 连接词：整体回环，reg匹配多少次，就会执行多少次，匹配到一次，正则捕获一次，把捕获结果传递给这个函数，最后用函数的返回值去替换正则匹配到的内容
* */
str = str.replace(reg, (...args) => {
  // console.log(arg);
  return args[1]
});
console.log(str);// zhufengAAzhufengAA










