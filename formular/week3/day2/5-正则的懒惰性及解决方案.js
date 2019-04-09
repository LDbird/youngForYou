/*
* 正则捕获：把一个字符串和正则匹配的部分获取到
*   [正则]
*     1. exec
*     2. test
*   [字符串]
*     replace
*     split
*     match
*
*
* */

/*
* 基于exec可以实现正则捕获
* 1. 如果当前正则和字符串不匹配，捕获的结果是nul
* 2. 如果匹配，捕获的结果是一个数组
*   0: 大正则捕获的内容
*   index: 正则捕获的起始索引
*   input: 原始操作的字符串
* 3. 执行一次exec只能捕获到和第一个正则匹配的内容，其余匹配的内容还没有捕获到，而且我傻傻执行多次，然而并没啥乱用。原因是“正则捕获有懒惰性”：只能捕获到第一个匹配的内容，剩余的默认不捕获。reg.lastIndex ：正则捕获的时候，下一次在字符串中开始查找的索引。
* 4. lastIndex 不变导致正则的懒惰性，即使手动也不能解决；
* 5.
*
* */

let str = 'zhufeng2018peixun2019';

// let reg = /\d+/;
// // console.log(reg.test(str)); // str
// console.log(reg.exec(str)); // ['2018', input: 7, input:...]
// console.log(reg.lastIndex); // 0
// // lastIndex : 正则捕获的时候，下一次再字符串中开始查找的索引
// reg.lastIndex = 11;
// console.log(reg.exec(str)); // ['2018', input: 7, input:...]
// console.log(reg.lastIndex); // 0

// => 解决正则捕获的懒惰性，我们需要加全局修饰符 g（这是唯一解决方案）
// let reg = /\d+/g;
/*console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // ['2018', index: 7, input:...]
console.log(reg.lastIndex); // 11
console.log(reg.exec(str)); // ['2019', index: 17, input:...]
console.log(reg.lastIndex); // 21
console.log(reg.exec(str)); // null
console.log(reg.lastIndex); // 0
console.log(reg.exec(str)); // [2018]
console.log(reg.lastIndex); // 11
// ...*/

// >> 连接词：你发现手动改lastIndex有用吗，没有吧，怎么办，给正则加一个修饰符g，是不是就行了


// >> 连接词：现在虽然懒惰性解决，我要是想把这个字符串里的数字都捕获到，是不得手动执行好几次呢，这要是知道有几次还想，这要是服务端给你的数据，你根本不知道里面有多少数字，这不就完犊子了？咋办？我们是不是想有个招儿，有一个方法执行一次，就可以把这所有的都得到啊。

RegExp.prototype.myExec = function (str) {
  // -> this:reg 当前操作的正则
  // -> str: 我们要操作的字符串
  // -> 执行exec开始捕获，具体捕获多少次不定，但是一直到捕获不到内容（返回结果是null），期间把捕获到的内容存储到数组中
  // -> 如果正则中有g，我们才循环，如果没有g则直接把第一次捕获的结果返回就可以了。那么现在有个问题，如何判断正则有没有加g呢？dir(reg) 发现里面有一个global属性，如果加g了该属性就是true，不加就是false
  let ary = [];
  let r = this.exec(str);
  if (!this.global) return r;
  while (r) {
    ary.push(r[0]);
    r = this.exec(str);
  }
  return ary
};
let strs = 'zhufeng2018zhufeng2019yangfan2020';
let reg = /\d+/;
// console.log(reg.myExec(strs));
// => 讲完就回环一次myExec

// >> 连接词： 这么常用的功能，写起来这么麻烦，是不是很不爽。其实，js string自带了一个方法match
console.log(strs.match(reg));
// >> 连接词：接着用不带g的正则match一次，看下结果是不是和不带g的时候exec捕获的内容一样的。

// => String.prototype.match 实现了我们自己编写的exec处理的事情，不加g返回第一个匹配的即可，加了g，把所有匹配的内容都捕获到，最后统一春存储到一个数组中返回即可。
// >> 连接词：但是哈，myExec也要掌握，我们珠峰培养的不仅仅是使用js几个api，还培养的大家的真正的编程思维，授之以鱼，不如授之以渔。而大家要做的就是知其然，也要知其所以然。
